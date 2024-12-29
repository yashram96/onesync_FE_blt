import { ref, computed } from 'vue'

interface CloudAccount {
  id: string
  provider: string
  name: string
  status: 'active' | 'inactive'
  dateAdded: string
  settings?: {
    defaultFolder?: string
    autoSync?: boolean
    syncInterval?: number
  }
}

export function useCloudAccounts() {
  // Mock initial data for demonstration
  const accounts = ref<CloudAccount[]>([
    {
      id: '1',
      provider: 'aws',
      name: 'Production S3',
      status: 'active',
      dateAdded: '2024-04-01',
      settings: {
        defaultFolder: '/production',
        autoSync: true,
        syncInterval: 15
      }
    },
    {
      id: '2',
      provider: 'google',
      name: 'Marketing Assets',
      status: 'active',
      dateAdded: '2024-04-02',
      settings: {
        defaultFolder: '/marketing',
        autoSync: false,
        syncInterval: 30
      }
    }
  ])

  const addCloudAccount = async (provider: string, credentials: any) => {
    // Simulate API validation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Validate credentials based on provider
    if (!validateCredentials(provider, credentials)) {
      throw new Error('Invalid credentials')
    }

    const newAccount: CloudAccount = {
      id: Math.random().toString(36).substr(2, 9),
      provider,
      name: credentials.name || `${provider} Account`,
      status: 'active',
      dateAdded: new Date().toISOString(),
      settings: {
        defaultFolder: credentials.defaultFolder || '',
        autoSync: false,
        syncInterval: 15
      }
    }
    
    accounts.value.push(newAccount)
    return newAccount
  }

  const validateCredentials = (provider: string, credentials: any): boolean => {
    // Add provider-specific validation logic
    switch (provider) {
      case 'aws':
        return Boolean(credentials.accessKeyId && credentials.secretAccessKey)
      case 'google':
        return Boolean(credentials.keyFile)
      case 'azure':
        return Boolean(credentials.accountName && 
          (credentials.authType === 'accessKey' ? credentials.accessKey : credentials.sasToken))
      default:
        return false
    }
  }

  const updateCloudAccount = async (accountId: string, updates: any) => {
    const account = accounts.value.find(a => a.id === accountId)
    if (account) {
      Object.assign(account, updates)
    }
  }

  const removeCloudAccount = async (accountId: string) => {
    const index = accounts.value.findIndex(a => a.id === accountId)
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  return {
    accounts,
    addCloudAccount,
    updateCloudAccount,
    removeCloudAccount
  }
}