<template>
  <Modal v-model="isOpen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-primary mb-4">Join the Waitlist</h2>
      <p class="text-gray-600 mb-6">
        Be among the first to experience OneSync when we launch.
      </p>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <Button type="submit" variant="primary" class="w-full justify-center">
          Join Waitlist
        </Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'

const isOpen = defineModel<boolean>()
const email = ref('')

const handleSubmit = () => {
  // Handle form submission here
  console.log('Submitted email:', email.value)
  email.value = ''
  isOpen.value = false
}
</script>