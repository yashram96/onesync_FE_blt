<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div class="text-center">
        <OneSyncLogo class="mx-auto h-12 w-auto text-primary" />
        <h2 class="mt-6 text-2xl font-bold text-gray-900">Shared File</h2>
      </div>

      <div v-if="isLoading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading shared file...</p>
      </div>

      <div v-else-if="error" class="text-center">
        <ExclamationTriangleIcon class="mx-auto h-12 w-12 text-red-500" />
        <p class="mt-4 text-red-600">{{ error }}</p>
        <Button 
          variant="outline" 
          class="mt-4"
          @click="navigateTo('/')"
        >
          Return Home
        </Button>
      </div>

      <!-- Password Protection -->
      <div v-else-if="requiresPassword && !isAuthenticated" class="space-y-6">
        <div class="text-center">
          <LockClosedIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-4 text-lg font-medium">Password Protected File</h3>
          <p class="mt-2 text-sm text-gray-600">Enter the password to access this file</p>
        </div>
        
        <form @submit.prevent="verifyPassword" class="space-y-4">
          <div>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter password"
            />
          </div>
          <Button 
            type="submit"
            variant="primary"
            class="w-full justify-center"
            :disabled="isVerifying"
          >
            {{ isVerifying ? 'Verifying...' : 'Access File' }}
          </Button>
          <p v-if="passwordError" class="text-sm text-red-600 text-center">
            {{ passwordError }}
          </p>
        </form>
      </div>

      <div v-else-if="sharedFile" class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <DocumentIcon class="h-8 w-8 text-gray-400" />
            <div class="ml-4">
              <h3 class="text-lg font-medium">{{ sharedFile.name }}</h3>
              <p class="text-sm text-gray-500">{{ formatBytes(sharedFile.size) }}</p>
            </div>
          </div>
        </div>

        <div class="border-t border-b border-gray-200 py-4">
          <p class="text-sm text-gray-600">
            Shared by {{ sharedFile.owner }} on {{ formatDate(sharedFile.sharedAt) }}
          </p>
          <p v-if="sharedFile.expiresAt" class="text-sm text-gray-600 mt-1">
            Expires on {{ formatDate(sharedFile.expiresAt) }}
          </p>
        </div>

        <div class="flex justify-end space-x-4">
          <Button 
            v-if="sharedFile.allowDownload"
            variant="primary"
            @click="downloadFile"
          >
            Download
          </Button>
          <Button 
            variant="outline"
            @click="viewFile"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  DocumentIcon, 
  ExclamationTriangleIcon,
  LockClosedIcon 
} from '@heroicons/vue/24/outline'
import OneSyncLogo from '~/components/icons/OneSyncLogo.vue'
import Button from '~/components/ui/Button.vue'
import { formatBytes, formatDate } from '~/utils/format'

const route = useRoute()
const fileId = route.params.fileId as string
const shareId = route.params.shareId as string

const isLoading = ref(true)
const error = ref<string | null>(null)
const sharedFile = ref<any>(null)

// Password protection state
const requiresPassword = ref(false)
const isAuthenticated = ref(false)
const password = ref('')
const passwordError = ref('')
const isVerifying = ref(false)

onMounted(async () => {
  try {
    // Simulate API call to fetch shared file details
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data - replace with actual API call
    sharedFile.value = {
      id: fileId,
      shareId: shareId,
      name: 'example-document.pdf',
      size: 1024 * 1024 * 2.5, // 2.5MB
      owner: 'John Doe',
      sharedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      allowDownload: true,
      requiresPassword: true // Mock password protection
    }

    // Check if file requires password
    requiresPassword.value = sharedFile.value.requiresPassword
    isAuthenticated.value = !requiresPassword.value

  } catch (err) {
    error.value = 'This share link is invalid or has expired.'
  } finally {
    isLoading.value = false
  }
})

const verifyPassword = async () => {
  isVerifying.value = true
  passwordError.value = ''

  try {
    // Simulate password verification API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock verification - replace with actual API call
    if (password.value === 'correct-password') {
      isAuthenticated.value = true
    } else {
      passwordError.value = 'Incorrect password. Please try again.'
    }
  } catch (err) {
    passwordError.value = 'Failed to verify password. Please try again.'
  } finally {
    isVerifying.value = false
  }
}

const downloadFile = () => {
  // Implement file download logic
  console.log('Downloading file:', fileId, shareId)
}

const viewFile = () => {
  // Implement file viewing logic
  console.log('Viewing file:', fileId, shareId)
}
</script>