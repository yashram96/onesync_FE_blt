<template>
  <Modal v-model="isOpen">
    <div class="max-w-lg mx-auto">
      <h2 class="text-2xl font-bold text-primary mb-4">Add Payment Method</h2>
      <p class="text-gray-600 mb-6">
        Enter your card details to add a new payment method
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            v-model="formData.cardNumber"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              v-model="formData.expiry"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              v-model="formData.cvc"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="123"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-6 pt-6 border-t">
          <Button 
            type="button"
            variant="outline"
            @click="$emit('update:modelValue', false)"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="primary"
            :disabled="isSubmitting"
          >
            Add Payment Method
          </Button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'

const isOpen = defineModel<boolean>()
const isSubmitting = ref(false)

const formData = ref({
  cardNumber: '',
  expiry: '',
  cvc: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  add: [paymentDetails: any]
}>()

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Process payment method addition
    const [expiryMonth, expiryYear] = formData.value.expiry.split('/')
    
    emit('add', {
      type: 'card',
      last4: formData.value.cardNumber.slice(-4),
      brand: 'visa', // This would be determined by the payment processor
      expiryMonth,
      expiryYear: `20${expiryYear}`
    })
    
    isOpen.value = false
    formData.value = {
      cardNumber: '',
      expiry: '',
      cvc: ''
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>