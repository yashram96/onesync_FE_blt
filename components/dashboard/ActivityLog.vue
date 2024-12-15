<template>
  <div>
    <h3 class="text-xs font-semibold text-gray-500 uppercase mb-3">Recent Activity</h3>
    <div class="space-y-4">
      <div v-for="(activity, index) in activities" :key="index" class="flex items-start space-x-3">
        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <component :is="activity.icon" class="w-4 h-4 text-primary" />
        </div>
        <div>
          <p class="text-sm">{{ activity.message }}</p>
          <p class="text-xs text-gray-500">{{ activity.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloudArrowUpIcon, LinkIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const activities = [
  {
    icon: CloudArrowUpIcon,
    message: 'New file uploaded to AWS S3',
    time: '5 minutes ago'
  },
  {
    icon: LinkIcon,
    message: 'Share link created for project.pdf',
    time: '1 hour ago'
  },
  {
    icon: UserGroupIcon,
    message: 'Team access granted to marketing folder',
    time: '2 hours ago'
  }
]
</script>