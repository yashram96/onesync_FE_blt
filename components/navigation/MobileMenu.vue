<template>
  <div>
    <!-- Mobile Menu Button -->
    <button 
      @click="toggleMenu"
      class="md:hidden p-2 text-gray-600 hover:text-primary"
      aria-label="Toggle menu"
    >
      <component :is="isOpen ? XMarkIcon : Bars3Icon" class="w-6 h-6" />
    </button>

    <!-- Mobile Menu Panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isOpen"
        class="md:hidden fixed inset-0 top-[73px] bg-white z-40"
      >
        <div class="p-4 space-y-4">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.text" 
            :to="item.link"
            @click="closeMenu"
            class="block py-2 text-gray-600 hover:text-primary transition-colors text-lg"
          >
            {{ item.text }}
          </NuxtLink>
          <div class="pt-4">
            <Button 
              variant="primary" 
              class="w-full justify-center" 
              @click="openWaitlist"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { menuItems } from '~/constants/navigation'
import Button from '~/components/ui/Button.vue'

const isOpen = ref(false)
const showWaitlistModal = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const openWaitlist = () => {
  closeMenu()
  showWaitlistModal.value = true
}

// Close menu on route change
watch(() => window.location.hash, () => {
  isOpen.value = false
})
</script>