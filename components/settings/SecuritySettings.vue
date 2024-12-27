<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Security Settings</h3>
    
    <!-- Two-Factor Authentication -->
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-start justify-between">
        <div>
          <h4 class="text-sm font-medium text-gray-700">Two-Factor Authentication</h4>
          <p class="text-sm text-gray-500 mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
        <Button 
          :variant="twoFactorEnabled ? 'outline' : 'primary'"
          @click="toggleTwoFactor"
        >
          {{ twoFactorEnabled ? 'Disable' : 'Enable' }}
        </Button>
      </div>
    </div>

    <!-- Session Management -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h4 class="text-sm font-medium text-gray-700 mb-4">Active Sessions</h4>
      
      <div class="space-y-4">
        <div v-for="session in activeSessions" :key="session.id" 
          class="flex items-center justify-between py-3 border-b last:border-0"
        >
          <div>
            <div class="flex items-center">
              <component :is="session.deviceIcon" class="w-5 h-5 text-gray-400 mr-2" />
              <span class="font-medium">{{ session.deviceName }}</span>
            </div>
            <div class="text-sm text-gray-500 mt-1">
              <p>{{ session.location }}</p>
              <p>Last active: {{ session.lastActive }}</p>
            </div>
          </div>
          <Button 
            v-if="!session.current"
            variant="outline"
            @click="terminateSession(session.id)"
          >
            Terminate
          </Button>
          <span v-else class="text-sm text-primary font-medium">
            Current Session
          </span>
        </div>
      </div>
    </div>

    <!-- File Encryption -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h4 class="text-sm font-medium text-gray-700 mb-4">File Encryption</h4>
      
      <div class="space-y-4">
        <div>
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="encryptionSettings.enforceEncryption"
              class="rounded text-primary focus:ring-primary"
              @change="updateEncryptionSettings"
            />
            <span class="ml-2">Enforce encryption for all uploaded files</span>
          </label>
          <p class="text-sm text-gray-500 mt-1 ml-6">
            All files will be encrypted before being stored
          </p>
        </div>

        <div>
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="encryptionSettings.encryptSharedFiles"
              class="rounded text-primary focus:ring-primary"
              @change="updateEncryptionSettings"
            />
            <span class="ml-2">Encrypt shared file links</span>
          </label>
          <p class="text-sm text-gray-500 mt-1 ml-6">
            Add password protection to shared file links by default
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  ComputerDesktopIcon, 
  DevicePhoneMobileIcon, 
  DeviceTabletIcon 
} from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'

const twoFactorEnabled = ref(false)
const activeSessions = ref([
  {
    id: '1',
    deviceName: 'MacBook Pro',
    deviceIcon: ComputerDesktopIcon,
    location: 'San Francisco, US',
    lastActive: '2 minutes ago',
    current: true
  },
  {
    id: '2',
    deviceName: 'iPhone 13',
    deviceIcon: DevicePhoneMobileIcon,
    location: 'San Francisco, US',
    lastActive: '1 hour ago',
    current: false
  },
  {
    id: '3',
    deviceName: 'iPad Pro',
    deviceIcon: DeviceTabletIcon,
    location: 'San Francisco, US',
    lastActive: '2 days ago',
    current: false
  }
])

const encryptionSettings = ref({
  enforceEncryption: true,
  encryptSharedFiles: true
})

const toggleTwoFactor = () => {
  // Implement 2FA toggle logic
  twoFactorEnabled.value = !twoFactorEnabled.value
}

const terminateSession = (sessionId: string) => {
  // Implement session termination logic
  activeSessions.value = activeSessions.value.filter(s => s.id !== sessionId)
}

const updateEncryptionSettings = () => {
  // Implement encryption settings update logic
  console.log('Updating encryption settings:', encryptionSettings.value)
}
</script>