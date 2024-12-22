<template>
  <div class="text-center">
    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <LinkIcon class="w-8 h-8 text-primary" />
    </div>
    
    <h3 class="text-xl font-semibold mb-2">Share Link Created!</h3>
    <p class="text-gray-600 mb-6">Your secure share link is ready to be shared</p>

    <!-- Link Display -->
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <div class="flex items-center justify-between">
        <span class="text-gray-600 truncate">{{ link }}</span>
        <Button 
          variant="outline" 
          size="sm"
          @click="copyLink"
        >
          <DocumentDuplicateIcon class="w-5 h-5" />
        </Button>
      </div>
    </div>

    <!-- QR Code -->
    <div class="mb-6">
      <img 
        :src="qrCodeUrl" 
        alt="QR Code" 
        class="mx-auto w-32 h-32"
      />
    </div>

    <!-- Link Settings Summary -->
    <div class="text-sm text-gray-600 space-y-2 mb-6">
      <p v-if="settings.hasExpiration">
        Expires: {{ formatDate(settings.expirationDate) }}
      </p>
      <p v-if="settings.hasPassword">
        Password protected
      </p>
      <p>
        {{ settings.allowDownload ? 'Downloads allowed' : 'View only' }}
      </p>
    </div>

    <Button 
      variant="primary" 
      class="w-full justify-center"
      @click="$emit('done')"
    >
      Done
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LinkIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'
import { formatDate } from '~/utils/format'

const props = defineProps<{
  link: string
  settings: any
}>()

// In a real implementation, generate QR code using a library
const qrCodeUrl = computed(() => 
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(props.link)}`
)

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.link)
    // Show success toast
  } catch (error) {
    console.error('Failed to copy link:', error)
  }
}

defineEmits<{
  done: []
}>()
</script>