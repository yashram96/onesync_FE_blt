<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Cloud Settings</h3>
    
    <!-- Connected Accounts List -->
    <div v-for="provider in cloudProviders" :key="provider.id" class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <component :is="provider.icon" class="w-6 h-6 text-gray-600 mr-2" />
          <h4 class="text-sm font-medium text-gray-700">{{ provider.name }}</h4>
        </div>
        <Button variant="primary" @click="addAccount(provider)">
          Add Account
        </Button>
      </div>

      <!-- Connected Accounts -->
      <div class="space-y-4">
        <CloudAccountCard
          v-for="account in getAccountsByProvider(provider.id)"
          :key="account.id"
          :account="account"
          @update="updateAccount"
          @remove="removeAccount"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/ui/Button.vue'
import CloudAccountCard from './cloud/CloudAccountCard.vue'
import { useCloudAccounts } from '~/composables/useCloudAccounts'
import { cloudProviders } from '~/constants/cloud'

const { accounts, addCloudAccount, updateCloudAccount, removeCloudAccount } = useCloudAccounts()

const getAccountsByProvider = (providerId: string) => {
  return accounts.value.filter(account => account.provider === providerId)
}

const addAccount = (provider: any) => {
  // This will trigger the cloud account modal from the parent
  emit('add-account', provider)
}

const updateAccount = (accountId: string, updates: any) => {
  updateCloudAccount(accountId, updates)
}

const removeAccount = (accountId: string) => {
  if (confirm('Are you sure you want to remove this account? This will not delete any files.')) {
    removeCloudAccount(accountId)
  }
}

const emit = defineEmits<{
  'add-account': [provider: any]
}>()
</script>