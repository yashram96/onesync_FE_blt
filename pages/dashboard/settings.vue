<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Settings</h1>
    
    <!-- Settings Navigation -->
    <div class="flex space-x-1 mb-6 border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-4 py-2 text-sm font-medium -mb-px"
        :class="[
          activeTab === tab.id
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-500 hover:text-gray-700'
        ]"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Settings Content -->
    <div class="max-w-4xl">
      <AccountSettings v-if="activeTab === 'account'" />
      <SecuritySettings v-else-if="activeTab === 'security'" />
      <NotificationSettings v-else-if="activeTab === 'notifications'" />
      <CloudSettings 
        v-else-if="activeTab === 'cloud'" 
        @add-account="showAddCloudAccountModal = true"
      />
    </div>

    <!-- Cloud Account Modal -->
    <AddCloudAccountModal 
      v-model="showAddCloudAccountModal"
      @account-added="handleAccountAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccountSettings from '~/components/settings/AccountSettings.vue'
import SecuritySettings from '~/components/settings/SecuritySettings.vue'
import NotificationSettings from '~/components/settings/NotificationSettings.vue'
import CloudSettings from '~/components/settings/CloudSettings.vue'
import AddCloudAccountModal from '~/components/dashboard/cloud/AddCloudAccountModal.vue'

definePageMeta({
  layout: 'dashboard'
})

const activeTab = ref('account')
const showAddCloudAccountModal = ref(false)

const tabs = [
  { id: 'account', name: 'Account' },
  { id: 'security', name: 'Security' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'cloud', name: 'Cloud Accounts' }
]

const handleAccountAdded = () => {
  showAddCloudAccountModal.value = false
  // Optionally refresh cloud accounts list
}
</script>