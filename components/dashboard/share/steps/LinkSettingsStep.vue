<template>
  <div class="space-y-6">
    <!-- File Summary -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <div class="flex items-center">
        <DocumentIcon class="w-5 h-5 text-gray-400 mr-2" />
        <span class="font-medium">{{ selectedFile.name }}</span>
      </div>
      <div class="text-sm text-gray-500 mt-1">
        {{ formatBytes(selectedFile.size) }}
      </div>
    </div>

    <!-- Settings Form -->
    <div class="space-y-4">
      <!-- Expiration -->
      <div>
        <label class="flex items-center mb-2">
          <input
            type="checkbox"
            v-model="settings.hasExpiration"
            class="text-primary focus:ring-primary rounded"
          />
          <span class="ml-2 text-sm font-medium">Set expiration date</span>
        </label>
        <input
          v-if="settings.hasExpiration"
          type="datetime-local"
          v-model="settings.expirationDate"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      <!-- Password Protection -->
      <div>
        <label class="flex items-center mb-2">
          <input
            type="checkbox"
            v-model="settings.hasPassword"
            class="text-primary focus:ring-primary rounded"
          />
          <span class="ml-2 text-sm font-medium">Password protect this link</span>
        </label>
        <input
          v-if="settings.hasPassword"
          type="password"
          v-model="settings.password"
          placeholder="Enter password"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      <!-- Permissions -->
      <div>
        <h4 class="text-sm font-medium mb-2">Link Permissions</h4>
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="settings.allowDownload"
            class="text-primary focus:ring-primary rounded"
          />
          <span class="ml-2 text-sm">Allow file download</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentIcon } from '@heroicons/vue/24/outline'
import { formatBytes } from '~/utils/format'

const props = defineProps<{
  selectedFile: any
  modelValue: any
}>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const settings = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>