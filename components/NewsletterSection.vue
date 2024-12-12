<template>
  <section class="bg-primary py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          Stay Updated
        </h2>
        <p class="text-white/80 mb-8">
          Join our newsletter to get the latest updates and early access.
        </p>
        <form @submit.prevent="subscribeToNewsletter" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            v-model="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button 
            type="submit"
            class="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')

const subscribeToNewsletter = () => {
  // Handle newsletter subscription
  console.log('Subscribed:', email.value)
  email.value = ''
}
</script>