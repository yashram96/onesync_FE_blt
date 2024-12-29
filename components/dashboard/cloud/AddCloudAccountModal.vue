<template>
  <Modal v-model="isOpen">
    <div class="max-w-2xl mx-auto">
      <template v-if="selectedProvider">
        <!-- Provider Form -->
        <div>
          <div class="flex items-center mb-6">
            <button 
              @click="selectedProvider = null"
              class="mr-4 text-gray-600 hover:text-primary"
              v-if="!initialProvider"
            >
              <ArrowLeftIcon class="w-5 h-5" />
            </button>
            <h2 class="text-2xl font-bold text-primary">
              Link {{ selectedProvider.name }}
            </h2>
          </div>

          <component 
            :is="getFormComponent(selectedProvider.id)"
            @submit="handleCredentialsSubmit"
            @cancel="closeModal"
          />
        </div>
        
      </template>

      <template v-else>
        <!-- Initial Provider Selection -->
        <div>
          <h2 class="text-2xl font-bold text-primary mb-4">Link Cloud Account</h2>
          <p class="text-gray-600 mb-8">
            Select a cloud provider to link your account and access your storage securely.
          </p>
          
          <div class="grid gap-4">
            <button
              v-for="provider in cloudProviders"
              :key="provider.id"
              @click="selectProvider(provider)"
              class="flex items-center p-4 border-2 rounded-lg hover:border-primary transition-colors"
              :class="[
                selectedProvider?.id === provider.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200'
              ]"
            >
              <component 
                :is="provider.icon" 
                class="w-8 h-8 text-gray-700 mr-4" 
              />
              <div class="text-left">
                <h3 class="font-semibold">{{ provider.name }}</h3>
                <p class="text-sm text-gray-600">{{ provider.description }}</p>
              </div>
            </button>
          </div>
        </div>
      </template>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import Modal from '~/components/ui/Modal.vue'
import { cloudProviders } from '~/constants/cloud'
import { useCloudAccounts } from '~/composables/useCloudAccounts'

// Import form components
import AwsS3Form from './forms/AwsS3Form.vue'
import GoogleCloudForm from './forms/GoogleCloudForm.vue'
import AzureStorageForm from './forms/AzureStorageForm.vue'

const props = defineProps<{
  modelValue: boolean
  initialProvider?: any
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'account-added': []
}>()

const isOpen = defineModel<boolean>()
const selectedProvider = ref<any>(null)
const { addCloudAccount } = useCloudAccounts()

// Watch for initial provider prop
watch(() => props.initialProvider, (newProvider) => {
  if (newProvider) {
    selectedProvider.value = newProvider
  }
}, { immediate: true })

const getFormComponent = (providerId: string) => {
  switch (providerId) {
    case 'aws':
      return AwsS3Form
    case 'google':
      return GoogleCloudForm
    case 'azure':
      return AzureStorageForm
    default:
      return null
  }
}

const selectProvider = (provider: any) => {
  selectedProvider.value = provider
}

const handleCredentialsSubmit = async (credentials: any) => {
  if (!selectedProvider.value) return
  
  try {
    await addCloudAccount(selectedProvider.value.id, credentials)
    emit('account-added')
    closeModal()
  } catch (error) {
    console.error('Failed to link account:', error)
    throw error
  }
}

const closeModal = () => {
  isOpen.value = false
  if (!props.initialProvider) {
    selectedProvider.value = null
  }
}

// Reset state when modal closes
watch(isOpen, (newValue) => {
  if (!newValue && !props.initialProvider) {
    selectedProvider.value = null
  }
})
</script>