<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Active Share Links</h2>
        <p class="text-sm text-gray-500">
          {{ activeLinks.length }}/2 links active
        </p>
      </div>
    </div>

    <div class="divide-y">
      <div 
        v-for="link in activeLinks" 
        :key="link.id"
        class="p-4"
      >
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center">
              <DocumentIcon class="w-5 h-5 text-gray-400 mr-2" />
              <span class="font-medium">{{ link.fileName }}</span>
            </div>
            <div class="text-sm text-gray-500 mt-1">
              Created {{ formatDate(link.createdAt) }}
              <span v-if="link.expirationDate">
                • Expires {{ formatDate(link.expirationDate) }}
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              @click="copyLink(link.url)"
            >
              <DocumentDuplicateIcon class="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              @click="deactivateLink(link.id)"
            >
              <XMarkIcon class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div v-if="activeLinks.length === 0" class="p-4 text-center text-gray-500">
        No active share links
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentIcon, DocumentDuplicateIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'
import { formatDate } from '~/utils/format'
import { useShareLinks } from '~/composables/useShareLinks'

const { getActiveLinks, deactivateLink } = useShareLinks()

const activeLinks = computed(() => getActiveLinks.value)

const copyLink = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    // Show success toast
  } catch (error) {
    console.error('Failed to copy link:', error)
  }
}
</script>