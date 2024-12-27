<template>
  <div class="border rounded-lg p-4">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h5 class="font-medium">{{ account.name }}</h5>
        <p class="text-sm text-gray-500">Added {{ formatDate(account.dateAdded) }}</p>
      </div>
      <div class="flex items-center space-x-2">
        <Button variant="outline" size="sm" @click="toggleSettings">
          Settings
        </Button>
        <Button variant="outline" size="sm" @click="$emit('remove', account.id)">
          Remove
        </Button>
      </div>
    </div>

    <!-- Account Settings -->
    <div v-if="showSettings" class="mt-4 space-y-4 border-t pt-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Display Name
        </label>
        <input
          v-model="settings.name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Default Folder
        </label>
        <input
          v-model="settings.defaultFolder"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="settings.autoSync"
            class="rounded text-primary focus:ring-primary"
          />
          <span class="ml-2 text-sm">Enable auto-sync</span>
        </label>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Sync Interval
        </label>
        <select
          v-model="settings.syncInterval"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :disabled="!settings.autoSync"
        >
          <option value="5">Every 5 minutes</option>
          <option value="15">Every 15 minutes</option>
          <option value="30">Every 30 minutes</option>
          <option value="60">Every hour</option>
        </select>
      </div>

      <div class="flex justify-end">
        <Button variant="primary" @click="saveSettings">
          Save Changes
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Button from '~/components/ui/Button.vue'
import { formatDate } from '~/utils/format'

const props = defineProps<{
  account: {
    id: string
    name: string
    provider: string
    dateAdded: string
    settings?: {
      defaultFolder?: string
      autoSync?: boolean
      syncInterval?: number
    }
  }
}>()

const emit = defineEmits<{
  update: [accountId: string, updates: any]
  remove: [accountId: string]
}>()

const showSettings = ref(false)
const settings = reactive({
  name: props.account.name,
  defaultFolder: props.account.settings?.defaultFolder || '',
  autoSync: props.account.settings?.autoSync || false,
  syncInterval: props.account.settings?.syncInterval || 15
})

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const saveSettings = () => {
  emit('update', props.account.id, {
    name: settings.name,
    settings: {
      defaultFolder: settings.defaultFolder,
      autoSync: settings.autoSync,
      syncInterval: settings.syncInterval
    }
  })
  showSettings.value = false
}
</script>