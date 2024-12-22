<template>
  <Modal v-model="isOpen">
    <div class="max-w-2xl mx-auto">
      <!-- Initial Provider Selection -->
      <div v-if="currentStep === 'provider'">
        <h2 class="text-2xl font-bold text-primary mb-4">Link Cloud Account</h2>
        <p class="text-gray-600 mb-8">
          Select a cloud provider to link your account and access your storage securely.
        </p>
        
        <div class="grid gap-4">
          <button
            v-for="provider in providers"
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

      <!-- Provider-specific Form -->
      <div v-else-if="currentStep === 'credentials'">
        <div class="flex items-center mb-6">
          <button 
            @click="currentStep = 'provider'"
            class="mr-4 text-gray-600 hover:text-primary"
          >
            <ArrowLeftIcon class="w-5 h-5" />
          </button>
          <h2 class="text-2xl font-bold text-primary">
            Link {{ selectedProvider?.name }}
          </h2>
        </div>

        <component 
          :is="selectedProvider?.formComponent"
          @submit="handleCredentialsSubmit"
          @cancel="currentStep = 'provider'"
        />
      </div>

      <!-- Connection Status -->
      <div v-else-if="currentStep === 'connecting'" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4" />
        <p class="text-gray-600">
          Connecting to {{ selectedProvider?.name }}...
        </p>
      </div>

      <!-- Success State -->
      <div v-else-if="currentStep === 'success'" class="text-center py-8">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon class="w-8 h-8 text-green-600" />
        </div>
        <h3 class="text-xl font-semibold mb-2">
          Successfully Connected!
        </h3>
        <p class="text-gray-600 mb-6">
          Your {{ selectedProvider?.name }} account has been linked successfully.
        </p>
        <Button 
          variant="primary" 
          @click="closeModal"
          class="w-full justify-center"
        >
          Done
        </Button>
      </div>

      <!-- Error State -->
      <div v-else-if="currentStep === 'error'" class="text-center py-8">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ExclamationTriangleIcon class="w-8 h-8 text-red-600" />
        </div>
        <h3 class="text-xl font-semibold mb-2">Connection Failed</h3>
        <p class="text-gray-600 mb-6">{{ errorMessage }}</p>
        <div class="space-y-4">
          <Button 
            variant="primary" 
            @click="currentStep = 'credentials'"
            class="w-full justify-center"
          >
            Try Again
          </Button>
          <Button 
            variant="outline" 
            @click="currentStep = 'provider'"
            class="w-full justify-center"
          >
            Choose Different Provider
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  ArrowLeftIcon, 
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'
import { useCloudAccounts } from '~/composables/useCloudAccounts'
import type { CloudProvider } from '~/types/cloud'

// Components will be imported dynamically
const GoogleCloudForm = defineAsyncComponent(() => 
  import('./forms/GoogleCloudForm.vue')
)
const AwsS3Form = defineAsyncComponent(() => 
  import('./forms/AwsS3Form.vue')
)
const AzureStorageForm = defineAsyncComponent(() => 
  import('./forms/AzureStorageForm.vue')
)

const providers: CloudProvider[] = [
  {
    id: 'google',
    name: 'Google Cloud Storage',
    description: 'Connect your Google Cloud Storage buckets',
    icon: defineAsyncComponent(() => import('~/components/icons/cloud/GoogleCloudIcon.vue')),
    formComponent: GoogleCloudForm
  },
  {
    id: 'aws',
    name: 'AWS S3',
    description: 'Link your Amazon S3 buckets',
    icon: defineAsyncComponent(() => import('~/components/icons/cloud/AwsIcon.vue')),
    formComponent: AwsS3Form
  },
  {
    id: 'azure',
    name: 'Azure Blob Storage',
    description: 'Connect your Azure Storage containers',
    icon: defineAsyncComponent(() => import('~/components/icons/cloud/AzureIcon.vue')),
    formComponent: AzureStorageForm
  }
]

const isOpen = defineModel<boolean>()
const currentStep = ref<'provider' | 'credentials' | 'connecting' | 'success' | 'error'>('provider')
const selectedProvider = ref<CloudProvider | null>(null)
const errorMessage = ref('')

const { linkCloudAccount } = useCloudAccounts()

const selectProvider = (provider: CloudProvider) => {
  selectedProvider.value = provider
  currentStep.value = 'credentials'
}

const handleCredentialsSubmit = async (credentials: any) => {
  if (!selectedProvider.value) return
  
  currentStep.value = 'connecting'
  
  try {
    await linkCloudAccount(selectedProvider.value.id, credentials)
    currentStep.value = 'success'
  } catch (error: any) {
    errorMessage.value = error.message
    currentStep.value = 'error'
  }
}

const closeModal = () => {
  isOpen.value = false
  // Reset state for next time
  currentStep.value = 'provider'
  selectedProvider.value = null
  errorMessage.value = ''
}
</script>