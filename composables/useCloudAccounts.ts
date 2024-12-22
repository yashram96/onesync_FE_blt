import { ref } from 'vue'

interface CloudAccount {
  id: string
  provider: string
  name: string
  status: 'active' | 'inactive'
  dateAdded: string
}

export function useCloudAccounts() {
  const accounts = ref<CloudAccount[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const linkCloudAccount = async (provider: string, credentials: any) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Validate credentials based on provider
      const isValid = await validateCredentials(provider, credentials)
      
      if (!isValid) {
        throw new Error('Invalid credentials. Please check and try again.')
      }

      // Add the account to the list
      accounts.value.push({
        id: Math.random().toString(36).substr(2, 9),
        provider,
        name: getAccountName(provider, credentials),
        status: 'active',
        dateAdded: new Date().toISOString()
      })

    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const validateCredentials = async (provider: string, credentials: any) => {
    // Simulate credential validation
    // In production, this would make actual API calls to the cloud providers
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, always return true
    // In production, implement actual validation logic
    return true
  }

  const getAccountName = (provider: string, credentials: any): string => {
    switch (provider) {
      case 'google':
        return credentials.keyFile?.project_id || 'Google Cloud Storage'
      case 'aws':
        return credentials.bucket || 'AWS S3'
      case 'azure':
        return credentials.accountName || 'Azure Storage'
      default:
        return 'Cloud Storage Account'
    }
  }

  return {
    accounts,
    isLoading,
    error,
    linkCloudAccount
  }
}