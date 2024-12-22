<template>
  <aside 
    class="fixed md:static inset-0 bg-white border-r border-gray-200 w-64 min-h-screen pt-16 transform transition-transform duration-300 ease-in-out z-20"
    :class="[isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']"
  >
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

    <!-- Mobile Overlay -->
     <!-- # TO DO  -->
    <!-- <div 
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-10 md:hidden"
      @click="$emit('update:modelValue', false)"
    /> -->
     <div 
      v-if="isOpen"
      class="fixed inset-0 bg-grey/50 z-10 md:hidden"
    />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CloudArrowUpIcon, LinkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'
import ActivityLog from '~/components/dashboard/ActivityLog.vue'
import AddCloudAccountModal from '~/components/dashboard/cloud/AddCloudAccountModal.vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed(() => props.modelValue)
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