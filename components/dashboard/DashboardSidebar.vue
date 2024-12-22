<template>
  <aside class="w-64 bg-white border-r border-gray-200 min-h-screen pt-16">
    <div class="p-4">
      <div class="space-y-4">
        <!-- Quick Actions -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Actions</h3>
          <div class="space-y-2">
            <Button 
              v-for="action in quickActions" 
              :key="action.name"
              :variant="action.primary ? 'primary' : 'outline'"
              class="w-full justify-start"
              @click="handleAction(action.id)"
            >
              <component :is="action.icon" class="w-5 h-5 mr-2" />
              {{ action.name }}
            </Button>
          </div>
        </div>

        <!-- Activity Log -->
        <ActivityLog />
      </div>
    </div>

    <!-- Cloud Account Modal -->
    <AddCloudAccountModal v-model="showAddCloudAccountModal" />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CloudArrowUpIcon, LinkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'
import ActivityLog from '~/components/dashboard/ActivityLog.vue'
import AddCloudAccountModal from '~/components/dashboard/cloud/AddCloudAccountModal.vue'

const showAddCloudAccountModal = ref(false)

const quickActions = [
  {
    id: 'add-cloud-account',
    name: 'Add Cloud Account',
    icon: PlusCircleIcon,
    primary: true
  },
  {
    id: 'create-share-link',
    name: 'Create Share Link',
    icon: LinkIcon
  },
  {
    id: 'upload-file',
    name: 'Upload File',
    icon: CloudArrowUpIcon
  }
]

const handleAction = (actionId: string) => {
  switch (actionId) {
    case 'add-cloud-account':
      showAddCloudAccountModal.value = true
      break
    case 'create-share-link':
      // Handle share link creation
      console.log('Create share link')
      break
    case 'upload-file':
      // Handle file upload
      console.log('Upload file')
      break
  }
}
</script>