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
import { DocumentIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import OneSyncLogo from '~/components/icons/OneSyncLogo.vue'
import Button from '~/components/ui/Button.vue'
import { formatBytes, formatDate } from '~/utils/format'

const route = useRoute()
const shareId = route.params.id as string

const isLoading = ref(true)
const error = ref<string | null>(null)
const sharedFile = ref<any>(null)

onMounted(async () => {
  try {
    // Simulate API call to fetch shared file details
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data - replace with actual API call
    sharedFile.value = {
      id: shareId,
      name: 'example-document.pdf',
      size: 1024 * 1024 * 2.5, // 2.5MB
      owner: 'John Doe',
      sharedAt: new Date().toISOString(),
      allowDownload: true
    }
  } catch (err) {
    error.value = 'This share link is invalid or has expired.'
  } finally {
    isLoading.value = false
  }
})

const downloadFile = () => {
  // Implement file download logic
  console.log('Downloading file:', sharedFile.value.id)
}

const viewFile = () => {
  // Implement file viewing logic
  console.log('Viewing file:', sharedFile.value.id)
}
</script>