<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="accessKeyId" class="block text-sm font-medium text-gray-700 mb-2">
        Access Key ID
      </label>
      <input
        id="accessKeyId"
        v-model="formData.accessKeyId"
        type="text"
        required
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>

    <div>
      <label for="secretAccessKey" class="block text-sm font-medium text-gray-700 mb-2">
        Secret Access Key
      </label>
      <input
        id="secretAccessKey"
        v-model="formData.secretAccessKey"
        type="password"
        required
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
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
        placeholder="my-s3-bucket"
      />
    </div>

    <p class="text-sm text-gray-500">
      <a 
        href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html" 
        target="_blank"
        class="text-primary hover:underline"
      >
        Learn how to find your AWS credentials
      </a>
    </p>

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
      >
        Link Account
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/ui/Button.vue'

const formData = ref({
  accessKeyId: '',
  secretAccessKey: '',
  bucket: ''
})

const handleSubmit = () => {
  emit('submit', formData.value)
}

const emit = defineEmits<{
  submit: [credentials: any]
  cancel: []
}>()
</script>