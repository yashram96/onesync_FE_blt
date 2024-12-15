<template>
  <section class="bg-white rounded-lg shadow">
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Files</h2>
        <div class="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search files..."
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Button variant="outline">
            <FunnelIcon class="w-5 h-5 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <!-- File Tabs -->
      <div class="flex space-x-4 border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="px-4 py-2 -mb-px"
          :class="[
            activeTab === tab.id
              ? 'border-b-2 border-primary text-primary font-semibold'
              : 'text-gray-500 hover:text-gray-700'
          ]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- File Table -->
    <FileTable :files="filteredFiles" />
  </section>
</template>

<script setup lang="ts">
import { FunnelIcon } from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'
import FileTable from '~/components/dashboard/files/FileTable.vue'

const activeTab = ref('all')

const tabs = [
  { id: 'all', name: 'All Files' },
  { id: 'onesync', name: 'OneSync Files' },
  { id: 'aws', name: 'AWS S3' },
  { id: 'google', name: 'Google Cloud' },
  { id: 'azure', name: 'Azure Blob' }
]

// Mock data - replace with real data
const files = ref([
  {
    name: 'project-report.pdf',
    size: 2500000,
    provider: 'OneSync',
    uploadDate: '2024-04-01',
    type: 'pdf'
  },
  // Add more mock files...
])

const filteredFiles = computed(() => {
  if (activeTab.value === 'all') return files.value
  return files.value.filter(file => 
    file.provider.toLowerCase() === activeTab.value
  )
})
</script>