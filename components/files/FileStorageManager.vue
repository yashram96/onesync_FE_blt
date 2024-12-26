<template>
  <div class="space-y-6">
    <!-- Storage Overview -->
    <StorageOverview 
      :providers="providers"
      :active-provider="activeProvider"
      @select-provider="setActiveProvider"
    />

    <!-- File List -->
    <FileList 
      :files="files"
      @share="handleShare"
      @delete="handleDelete"
      @upload="handleUpload"
    />

    <!-- Delete Confirmation Modal -->
    <Modal v-model="showDeleteModal">
      <div v-if="selectedFile">
        <h3 class="text-lg font-semibold mb-4">Delete File</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ selectedFile.name }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            @click="showDeleteModal = false"
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            @click="confirmDelete"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>

    <!-- Share Modal -->
    <Modal v-model="showShareModal">
      <div v-if="selectedFile">
        <h3 class="text-lg font-semibold mb-4">Share "{{ selectedFile.name }}"</h3>
        <div class="space-y-4">
          <!-- Share Links List -->
          <div v-if="selectedFile.shareLinks?.length" class="space-y-4">
            <div v-for="link in activeShareLinks" :key="link.id" 
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="truncate mr-4">
                {{ link.url }}
              </div>
              <div class="flex items-center space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  @click="copyLink(link.url)"
                >
                  <DocumentDuplicateIcon class="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  @click="deactivateLink(link.id)"
                >
                  <XMarkIcon class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <!-- Create New Link Button -->
          <div v-if="canCreateNewLink" class="mt-4">
            <Button 
              variant="primary" 
              class="w-full justify-center"
              @click="createNewShareLink"
              :disabled="isCreatingLink"
            >
              {{ isCreatingLink ? 'Creating...' : 'Create New Share Link' }}
            </Button>
          </div>

          <!-- Error Message -->
          <p v-if="shareError" class="text-red-500 text-sm mt-2">
            {{ shareError }}
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DocumentDuplicateIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { FileMetadata } from '~/types/files'
import { useFileManager } from '~/composables/useFileManager'
import StorageOverview from './StorageOverview.vue'
import FileList from './FileList.vue'
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'

const {
  files,
  providers,
  activeProvider,
  setActiveProvider,
  uploadFile,
  deleteFile,
  createShareLink,
  deactivateShareLink
} = useFileManager()

// State
const selectedFile = ref<FileMetadata | null>(null)
const showDeleteModal = ref(false)
const showShareModal = ref(false)
const isCreatingLink = ref(false)
const shareError = ref('')

// Computed
const activeShareLinks = computed(() => 
  selectedFile.value?.shareLinks?.filter(link => link.isActive) || []
)

const canCreateNewLink = computed(() => 
  activeShareLinks.value.length < 2
)

// Methods
const handleUpload = async (file: File) => {
  try {
    await uploadFile(file)
  } catch (error: any) {
    alert(error.message)
  }
}

const handleShare = (file: FileMetadata) => {
  selectedFile.value = file
  showShareModal.value = true
}

const handleDelete = (file: FileMetadata) => {
  selectedFile.value = file
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!selectedFile.value) return
  
  try {
    await deleteFile(selectedFile.value.id)
    showDeleteModal.value = false
  } catch (error: any) {
    alert(error.message)
  }
}

const createNewShareLink = async () => {
  if (!selectedFile.value) return
  
  isCreatingLink.value = true
  shareError.value = ''
  
  try {
    await createShareLink(selectedFile.value.id)
  } catch (error: any) {
    shareError.value = error.message
  } finally {
    isCreatingLink.value = false
  }
}

const deactivateLink = async (linkId: string) => {
  if (!selectedFile.value) return
  await deactivateShareLink(selectedFile.value.id, linkId)
}

const copyLink = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    // Could add a toast notification here
  } catch (error) {
    console.error('Failed to copy link:', error)
  }
}
</script>