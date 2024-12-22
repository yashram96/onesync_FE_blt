<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="accountName" class="block text-sm font-medium text-gray-700 mb-2">
        Storage Account Name
      </label>
      <input
        id="accountName"
        v-model="formData.accountName"
        type="text"
        required
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Authentication Method
      </label>
      <div class="space-y-4">
        <label class="flex items-center">
          <input
            type="radio"
            v-model="formData.authType"
            value="accessKey"
            class="text-primary focus:ring-primary"
          />
          <span class="ml-2">Access Key</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            v-model="formData.authType"
            value="sasToken"
            class="text-primary focus:ring-primary"
          />
          <span class="ml-2">SAS Token</span>
        </label>
      </div>
    </div>

    <div v-if="formData.authType === 'accessKey'">
      <label for="accessKey" class="block text-sm font-medium text-gray-700 mb-2">
        Access Key
      </label>
      <input
        id="accessKey"
        v-model="formData.accessKey"
        type="password"
        required
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>

    <div v-else>
      <label for="sasToken" class="block text-sm font-medium text-gray-700 mb-2">
        SAS Token
      </label>
      <input
        id="sasToken"
        v-model="formData.sasToken"
        type="password"
        required
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>

    <div>
      <label for="container" class="block text-sm font-medium text-gray-700 mb-2">
        Default Container Name (Optional)
      </label>
      <input
        id="container"
        v-model="formData.container"
        type="text"
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        placeholder="my-container"
      />
    </div>

    <p class="text-sm text-gray-500">
      <a 
        href="https://docs.microsoft.com/azure/storage/common/storage-account-keys-manage"
        target="_blank"
        class="text-primary hover:underline"
      >
        Learn how to find your Azure credentials
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
  accountName: '',
  authType: 'accessKey',
  accessKey: '',
  sasToken: '',
  container: ''
})

const handleSubmit = () => {
  const credentials = {
    accountName: formData.value.accountName,
    container: formData.value.container,
    ...(formData.value.authType === 'accessKey' 
      ? { accessKey: formData.value.accessKey }
      : { sasToken: formData.value.sasToken }
    )
  }
  emit('submit', credentials)
}

const emit = defineEmits<{
  submit: [credentials: any]
  cancel: []
}>()
</script>