<template>
  <div class="bg-white rounded-lg shadow">
    <!-- File List Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Files</h2>
        <div class="flex items-center space-x-4">
          <input
            type="search"
            v-model="searchQuery"
            placeholder="Search files..."
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Button variant="outline" @click="handleUpload">
            <CloudArrowUpIcon class="w-5 h-5 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </div>

    <!-- File List Content -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modified</th>
            <th class="px-6 py-3 text-right">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="file in filteredFiles" :key="file.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <DocumentIcon class="w-5 h-5 text-gray-400 mr-2" />
                <span class="font-medium">{{ file.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
              {{ formatBytes(file.size) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
              {{ formatDate(file.modifiedAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <div class="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" @click="$emit('share', file)">
                  <ShareIcon class="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" @click="$emit('delete', file)">
                  <TrashIcon class="w-4 h-4" />
                </Button>
              </div>
            </td>
          </tr>
          <tr v-if="files.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">
              No files found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      @change="onFileSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DocumentIcon, ShareIcon, TrashIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline'
import type { FileMetadata } from '~/types/files'
import { formatBytes, formatDate } from '~/utils/format'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{
  files: FileMetadata[]
}>()

const emit = defineEmits<{
  share: [file: FileMetadata]
  delete: [file: FileMetadata]
  upload: [file: File]
}>()

const fileInput = ref<HTMLInputElement>()
const searchQuery = ref('')

const filteredFiles = computed(() => {
  if (!searchQuery.value) return props.files
  const query = searchQuery.value.toLowerCase()
  return props.files.filter(file => 
    file.name.toLowerCase().includes(query)
  )
})

const handleUpload = () => {
  fileInput.value?.click()
}

const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    emit('upload', input.files[0])
    input.value = '' // Reset input
  }
}
</script>