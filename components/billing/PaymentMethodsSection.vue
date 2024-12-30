<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold">Payment Methods</h2>
        <p class="text-gray-600">Manage your saved payment methods</p>
      </div>
      <Button variant="primary" @click="$emit('add')">
        Add Payment Method
      </Button>
    </div>

    <div class="space-y-4">
      <div 
        v-for="method in paymentMethods" 
        :key="method.id"
        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
      >
        <div class="flex items-center">
          <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center mr-4">
            <component 
              :is="getCardIcon(method.brand)"
              class="w-6 h-6"
            />
          </div>
          <div>
            <p class="font-medium">
              {{ method.brand.charAt(0).toUpperCase() + method.brand.slice(1) }} 
              ending in {{ method.last4 }}
            </p>
            <p class="text-sm text-gray-500">
              Expires {{ method.expiryMonth }}/{{ method.expiryYear }}
              <span v-if="method.isDefault" class="text-primary ml-2">
                Default
              </span>
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <Button 
            v-if="!method.isDefault"
            variant="outline" 
            size="sm"
            @click="$emit('set-default', method.id)"
          >
            Set Default
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            @click="$emit('remove', method.id)"
          >
            Remove
          </Button>
        </div>
      </div>

      <div v-if="paymentMethods.length === 0" class="text-center py-8 text-gray-500">
        No payment methods added
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreditCardIcon } from '@heroicons/vue/24/outline'

defineProps<{
  paymentMethods: Array<{
    id: string
    type: string
    last4: string
    brand: string
    expiryMonth: string
    expiryYear: string
    isDefault: boolean
  }>
}>()

defineEmits<{
  add: []
  remove: [id: string]
  'set-default': [id: string]
}>()

const getCardIcon = (brand: string) => {
  // Implement card brand icon logic here
  return CreditCardIcon
}
</script>