export interface FileMetadata {
  id: string
  name: string
  size: number
  type: string
  modifiedAt: string
  source: 'onesync' | 'google' | 'aws' | 'azure'
  path?: string
  shareLinks?: ShareLink[]
}

export interface ShareLink {
  id: string
  fileId: string
  url: string
  createdAt: string
  expiresAt?: string
  isActive: boolean
}

export interface StorageQuota {
  total: number
  used: number
  available: number
}

export interface StorageProvider {
  id: 'onesync' | 'google' | 'aws' | 'azure'
  name: string
  quota?: StorageQuota
  isConnected: boolean
}