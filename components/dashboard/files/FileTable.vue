<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th 
            v-for="header in headers" 
            :key="header.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header.label }}
          </th>
          <th class="px-6 py-3 text-right">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="file in files" :key="file.name">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <DocumentIcon class="w-5 h-5 text-gray-400 mr-2" />
              {{ file.name }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ formatBytes(file.size) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ file.provider }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ formatDate(file.uploadDate) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right">
            <Button variant="outline" size="sm">
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { DocumentIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'
import { formatBytes, formatDate } from '~/utils/format'

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'size', label: 'Size' },
  { key: 'provider', label: 'Provider' },
  { key: 'uploadDate', label: 'Upload Date' }
]

defineProps<{
  files: Array<{
    name: string
    size: number
    provider: string
    uploadDate: string
    type: string
  }>
}>()
</script>