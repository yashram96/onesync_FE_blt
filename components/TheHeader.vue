<template>
  <header class="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-primary">
        <OneSyncLogo class="h-8 w-auto" />
        <span class="sr-only">OneSync</span>
      </NuxtLink>
      
      <NavMenu />
      <MobileMenu />

      <!-- Desktop CTA Button -->
      <div class="hidden md:block">
        <Button 
          variant="primary"
          @click="showWaitlistModal = true"
        >
          Join Waitlist
        </Button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import OneSyncLogo from '~/components/icons/OneSyncLogo.vue'
import Button from '~/components/ui/Button.vue'
import NavMenu from '~/components/navigation/NavMenu.vue'
import MobileMenu from '~/components/navigation/MobileMenu.vue'

const showWaitlistModal = inject('showWaitlistModal') as Ref<boolean>
</script>