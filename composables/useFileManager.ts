import { ref, computed } from 'vue'
import type { FileMetadata, ShareLink, StorageProvider } from '~/types/files'

export function useFileManager() {
  const files = ref<FileMetadata[]>([])
  const activeProvider = ref<StorageProvider['id']>('onesync')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const providers = ref<StorageProvider[]>([
    {
      id: 'onesync',
      name: 'OneSync Storage',
      quota: {
        total: 500 * 1024 * 1024, // 500MB for free tier
        used: 0,
        available: 500 * 1024 * 1024
      },
      isConnected: true
    },
    {
      id: 'google',
      name: 'Google Drive',
      isConnected: false
    },
    {
      id: 'aws',
      name: 'AWS S3',
      isConnected: false
    },
    {
      id: 'azure',
      name: 'Azure Blob Storage',
      isConnected: false
    }
  ])

  const currentProvider = computed(() => 
    providers.value.find(p => p.id === activeProvider.value)
  )

  const filteredFiles = computed(() =>
    files.value.filter(file => file.source === activeProvider.value)
  )

  const uploadFile = async (file: File): Promise<void> => {
    if (!currentProvider.value) return

    // Check file size for OneSync storage
    if (currentProvider.value.id === 'onesync') {
      const maxSize = 500 * 1024 * 1024 // 500MB
      if (file.size > maxSize) {
        throw new Error('File size exceeds the 500MB limit for free users')
      }

      const quota = currentProvider.value.quota
      if (quota && quota.used + file.size > quota.total) {
        throw new Error('Not enough storage space')
      }
    }

    // Simulate file upload
    const newFile: FileMetadata = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      modifiedAt: new Date().toISOString(),
      source: currentProvider.value.id,
      shareLinks: []
    }

    files.value.push(newFile)

    // Update quota for OneSync storage
    if (currentProvider.value.id === 'onesync' && currentProvider.value.quota) {
      currentProvider.value.quota.used += file.size
      currentProvider.value.quota.available -= file.size
    }
  }

  const deleteFile = async (fileId: string): Promise<void> => {
    const fileIndex = files.value.findIndex(f => f.id === fileId)
    if (fileIndex === -1) return

    const file = files.value[fileIndex]
    files.value.splice(fileIndex, 1)

    // Update quota for OneSync storage
    if (file.source === 'onesync') {
      const oneSyncProvider = providers.value.find(p => p.id === 'onesync')
      if (oneSyncProvider?.quota) {
        oneSyncProvider.quota.used -= file.size
        oneSyncProvider.quota.available += file.size
      }
    }
  }

  const createShareLink = async (fileId: string): Promise<ShareLink> => {
    const file = files.value.find(f => f.id === fileId)
    if (!file) throw new Error('File not found')

    // Check active links limit for free users
    const activeLinks = file.shareLinks?.filter(link => link.isActive) || []
    if (activeLinks.length >= 2) {
      throw new Error('Free users can only have 2 active share links')
    }

    const newLink: ShareLink = {
      id: Math.random().toString(36).substring(7),
      fileId,
      url: `https://onesync.com/share/${fileId}/${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    if (!file.shareLinks) {
      file.shareLinks = []
    }
    file.shareLinks.push(newLink)

    return newLink
  }

  const deactivateShareLink = async (fileId: string, linkId: string): Promise<void> => {
    const file = files.value.find(f => f.id === fileId)
    if (!file || !file.shareLinks) return

    const link = file.shareLinks.find(l => l.id === linkId)
    if (link) {
      link.isActive = false
    }
  }

  const setActiveProvider = (providerId: StorageProvider['id']) => {
    activeProvider.value = providerId
  }

  return {
    files: filteredFiles,
    providers,
    currentProvider,
    activeProvider,
    isLoading,
    error,
    uploadFile,
    deleteFile,
    createShareLink,
    deactivateShareLink,
    setActiveProvider
  }
}