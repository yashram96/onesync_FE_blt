<template>
  <div class="min-h-screen bg-white">
    <ClientOnly>
      <TheHeader />
      <WaitlistModal v-model="showWaitlistModal" />
    </ClientOnly>
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <NewsletterSection />
    </main>
    <TheFooter />
    <ClientOnly>
      <button 
        @click="scrollToTop" 
        v-show="showScrollTop"
        class="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <ArrowUpIcon class="w-6 h-6" />
      </button>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpIcon } from '@heroicons/vue/24/outline'

const showScrollTop = ref(false)
const showWaitlistModal = ref(false)

// Make waitlist modal globally accessible
provide('showWaitlistModal', showWaitlistModal)

onMounted(() => {
  window.addEventListener('scroll', () => {
    showScrollTop.value = window.scrollY > 500
  })
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>