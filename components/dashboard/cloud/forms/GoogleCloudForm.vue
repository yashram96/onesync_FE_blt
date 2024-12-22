<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Service Account Key
      </label>
      <div class="relative">
        <input
          ref="fileInput"
          type="file"
          accept="application/json"
          class="hidden"
          @change="handleFileUpload"
        />
        <div 
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
          @click="fileInput?.click()"
        >
          <CloudArrowUpIcon class="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p class="text-sm text-gray-600">
            Click to upload your service account key JSON file
          </p>
        </div>
      </div>
      <p class="mt-2 text-sm text-gray-500">
        <a 
          href="https://cloud.google.com/iam/docs/creating-managing-service-account-keys" 
          target="_blank"
          class="text-primary hover:underline"
        >
          Learn how to create a service account key
        </a>
      </p>
    </div>

    <div>
      <label for="bucket" class="block text-sm font-medium text-gray-700 mb-2">
        Default Bucket Name (Optional)
      </label>
      <input
        id="bucket"
        v-model="formData.bucket"
        type="text"
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        placeholder="my-gcs-bucket"
      />
    </div>

    <div class="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline"
        @click="$emit('cancel')"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        variant="primary"
        :disabled="!formData.keyFile"
      >
        Link Account
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CloudArrowUpIcon } from '@heroicons/vue/24/outline'
import Button from '~/components/ui/Button.vue'

const fileInput = ref<HTMLInputElement>()
const formData = ref({
  keyFile: null as any,
  bucket: ''
})

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        formData.value.keyFile = JSON.parse(e.target?.result as string)
      } catch (error) {
        // Handle invalid JSON
        console.error('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }
}

const handleSubmit = () => {
  emit('submit', formData.value)
}

const emit = defineEmits<{
  submit: [credentials: any]
  cancel: []
}>()
</script>