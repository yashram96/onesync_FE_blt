<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Notification Settings</h3>
    
    <div class="bg-white p-6 rounded-lg shadow">
      <h4 class="text-sm font-medium text-gray-700 mb-4">Email Notifications</h4>
      
      <div class="space-y-4">
        <div v-for="(setting, key) in emailSettings" :key="key" class="flex items-center justify-between">
          <div>
            <p class="font-medium">{{ setting.title }}</p>
            <p class="text-sm text-gray-500">{{ setting.description }}</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="setting.enabled"
              class="sr-only peer"
              @change="updateNotificationSettings"
            >
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <h4 class="text-sm font-medium text-gray-700 mb-4">Storage Alerts</h4>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Storage Usage Warning Threshold
          </label>
          <select 
            v-model="storageAlerts.usageThreshold"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            @change="updateStorageAlerts"
          >
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="90">90%</option>
          </select>
          <p class="mt-1 text-sm text-gray-500">
            Get notified when your storage usage exceeds this threshold
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cost Alert Threshold ($)
          </label>
          <input
            v-model="storageAlerts.costThreshold"
            type="number"
            min="0"
            step="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            @change="updateStorageAlerts"
          />
          <p class="mt-1 text-sm text-gray-500">
            Get notified when your monthly storage costs exceed this amount
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emailSettings = ref({
  fileShares: {
    title: 'File Shares',
    description: 'When someone shares a file with you',
    enabled: true
  },
  teamInvites: {
    title: 'Team Invites',
    description: 'When you\'re invited to join a team',
    enabled: true
  },
  storageAlerts: {
    title: 'Storage Alerts',
    description: 'When you\'re approaching storage limits',
    enabled: true
  },
  securityAlerts: {
    title: 'Security Alerts',
    description: 'Important security-related notifications',
    enabled: true
  },
  updates: {
    title: 'Product Updates',
    description: 'News about features and improvements',
    enabled: false
  }
})

const storageAlerts = ref({
  usageThreshold: '80',
  costThreshold: 50
})

const updateNotificationSettings = () => {
  // Implement notification settings update logic
  console.log('Updating notification settings:', emailSettings.value)
}

const updateStorageAlerts = () => {
  // Implement storage alerts update logic
  console.log('Updating storage alerts:', storageAlerts.value)
}
</script>