<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4">Storage Overview</h2>
    
    <!-- Provider Tabs -->
    <div class="flex space-x-4 border-b border-gray-200 mb-6">
      <button
        v-for="provider in providers"
        :key="provider.id"
        class="px-4 py-2 -mb-px"
        :class="[
          activeProvider === provider.id
            ? 'border-b-2 border-primary text-primary font-semibold'
            : 'text-gray-500 hover:text-gray-700'
        ]"
        @click="$emit('select-provider', provider.id)"
      >
        {{ provider.name }}
      </button>
    </div>

    <!-- Storage Usage -->
    <div v-if="currentProvider?.quota" class="space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Storage Used</span>
        <span class="font-medium">
          {{ formatBytes(currentProvider.quota.used) }} of {{ formatBytes(currentProvider.quota.total) }}
        </span>
      </div>
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-primary transition-all duration-300"
          :style="{ width: `${(currentProvider.quota.used / currentProvider.quota.total) * 100}%` }"
        />
      </div>
      <div v-if="isStorageNearLimit" class="flex items-center justify-between mt-4">
        <p class="text-sm text-yellow-600">
          You're approaching your storage limit
        </p>
        <Button variant="primary" size="sm">
          Upgrade Plan
        </Button>
      </div>
    </div>

    <!-- Provider Connection Status -->
    <div v-else class="text-center py-4">
      <p v-if="currentProvider?.isConnected" class="text-sm text-gray-600">
        Connected to {{ currentProvider.name }}
      </p>
      <p v-else class="text-sm text-gray-600">
        Connect your {{ currentProvider?.name }} account to start syncing files
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StorageProvider } from '~/types/files'
import { formatBytes } from '~/utils/format'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{
  providers: StorageProvider[]
  activeProvider: StorageProvider['id']
}>()

defineEmits<{
  'select-provider': [provider: StorageProvider['id']]
}>()

const currentProvider = computed(() => 
  props.providers.find(p => p.id === props.activeProvider)
)

const isStorageNearLimit = computed(() => {
  if (!currentProvider.value?.quota) return false
  const { used, total } = currentProvider.value.quota
  return (used / total) > 0.8 // 80% usage threshold
})
</script>