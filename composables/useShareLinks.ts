import { ref } from 'vue'

interface ShareLink {
  id: string
  fileId: string
  fileName: string
  url: string
  expirationDate?: string
  hasPassword: boolean
  allowDownload: boolean
  status: 'active' | 'expired'
  createdAt: string
}

export function useShareLinks() {
  const links = ref<ShareLink[]>([])
  const activeLinkCount = computed(() => 
    links.value.filter(link => link.status === 'active').length
  )

  const createShareLink = async (file: any, settings: any): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const link: ShareLink = {
      id: Math.random().toString(36).substr(2, 9),
      fileId: file.id,
      fileName: file.name,
      url: `https://onesync.com/share/${Math.random().toString(36).substr(2, 9)}`,
      expirationDate: settings.hasExpiration ? settings.expirationDate : undefined,
      hasPassword: settings.hasPassword,
      allowDownload: settings.allowDownload,
      status: 'active',
      createdAt: new Date().toISOString()
    }

    links.value.push(link)
    return link.url
  }

  const deactivateLink = async (linkId: string) => {
    const link = links.value.find(l => l.id === linkId)
    if (link) {
      link.status = 'expired'
    }
  }

  const getActiveLinks = computed(() => 
    links.value.filter(link => link.status === 'active')
  )

  return {
    links,
    activeLinkCount,
    createShareLink,
    deactivateLink,
    getActiveLinks
  }
}