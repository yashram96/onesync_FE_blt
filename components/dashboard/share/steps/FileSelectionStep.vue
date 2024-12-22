<template>
  <div>
    <div v-if="activeLinkCount >= 2" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <p class="text-yellow-700">
        You've reached the maximum of 2 active share links. Please deactivate an existing link to create a new one.
      </p>
    </div>

    <div class="border border-gray-200 rounded-lg divide-y">
      <div 
        v-for="file in onesyncFiles" 
        :key="file.id"
        class="p-4 flex items-center hover:bg-gray-50"
      >
        <input
          type="radio"
          :name="file.id"
          :value="file"
          :checked="selectedFile?.id === file.id"
          :disabled="activeLinkCount >= 2"
          @change="$emit('select', file)"
          class="text-primary focus:ring-primary"
        />
        <div class="ml-4 flex-1">
          <div class="flex items-center">
            <DocumentIcon class="w-5 h-5 text-gray-400 mr-2" />
            <span class="font-medium">{{ file.name }}</span>
          </div>
          <div class="text-sm text-gray-500 mt-1">
            {{ formatBytes(file.size) }} • Uploaded {{ formatDate(file.uploadDate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DocumentIcon } from '@heroicons/vue/24/outline'
import { formatBytes, formatDate } from '~/utils/format'

const props = defineProps<{
  files: any[]
  selectedFile: any
  activeLinkCount: number
}>()

defineEmits<{
  select: [file: any]
}>()

// Filter only OneSync files
const onesyncFiles = computed(() => 
  props.files.filter(file => file.provider === 'OneSync')
)
</script>