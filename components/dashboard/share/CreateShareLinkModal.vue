<template>
  <Modal v-model="isOpen">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-primary">Create Shareable Link</h2>
        <p class="text-gray-600 mt-2">
          Select a file to generate a secure, shareable link. Share links are always active, and you can create up to 2 active links at any time.
        </p>
      </div>

      <!-- Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in steps" :key="step" class="flex items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              :class="[
                currentStep === index 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ index + 1 }}
            </div>
            <div 
              v-if="index < steps.length - 1" 
              class="w-24 h-0.5 mx-2"
              :class="[
                currentStep > index ? 'bg-primary' : 'bg-gray-200'
              ]"
            />
          </div>
        </div>
        <div class="text-center mt-2">
          <p class="text-sm font-medium text-gray-600">{{ steps[currentStep] }}</p>
        </div>
      </div>

      <!-- Content -->
      <div v-if="currentStep === 0">
        <FileSelectionStep 
          :files="files"
          :selected-file="selectedFile"
          :active-links-count="activeLinkCount"
          @select="selectFile"
        />
      </div>

      <div v-else-if="currentStep === 1">
        <LinkSettingsStep 
          :selected-file="selectedFile"
          v-model="linkSettings"
        />
      </div>

      <div v-else>
        <LinkDisplayStep 
          :link="generatedLink"
          :settings="linkSettings"
          @done="closeModal"
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-between mt-6 pt-6 border-t">
        <Button 
          v-if="currentStep > 0" 
          variant="outline" 
          @click="currentStep--"
        >
          Back
        </Button>
        <div class="ml-auto">
          <Button 
            v-if="currentStep < 2"
            variant="primary"
            :disabled="!canProceed"
            @click="handleNext"
          >
            {{ currentStep === 0 ? 'Continue' : 'Create Link' }}
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'
import FileSelectionStep from './steps/FileSelectionStep.vue'
import LinkSettingsStep from './steps/LinkSettingsStep.vue'
import LinkDisplayStep from './steps/LinkDisplayStep.vue'
import { useShareLinks } from '~/composables/useShareLinks'

const isOpen = defineModel<boolean>()
const { createShareLink, activeLinkCount } = useShareLinks()

const steps = ['Select File', 'Configure Link', 'Share Link']
const currentStep = ref(0)
const selectedFile = ref<any>(null)
const linkSettings = ref({
  expirationDate: '',
  hasPassword: false,
  password: '',
  allowDownload: false
})
const generatedLink = ref('')

// Mock files data - replace with actual data from your storage system
const files = ref([
  {
    id: '1',
    name: 'project-report.pdf',
    size: 2500000,
    uploadDate: '2024-04-01',
    provider: 'OneSync'
  },
  // Add more mock files...
])

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return selectedFile.value !== null
  }
  if (currentStep.value === 1) {
    return true // Add validation if needed
  }
  return false
})

const selectFile = (file: any) => {
  selectedFile.value = file
}

const handleNext = async () => {
  if (currentStep.value === 1) {
    try {
      const link = await createShareLink(selectedFile.value, linkSettings.value)
      generatedLink.value = link
    } catch (error) {
      console.error('Failed to create share link:', error)
      return
    }
  }
  currentStep.value++
}

const closeModal = () => {
  isOpen.value = false
  // Reset state
  currentStep.value = 0
  selectedFile.value = null
  linkSettings.value = {
    expirationDate: '',
    hasPassword: false,
    password: '',
    allowDownload: false
  }
}
</script>