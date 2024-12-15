<template>
  <div class="relative" v-click-outside="closeMenu">
    <button 
      @click="toggleMenu"
      class="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
    >
      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <UserIcon class="w-5 h-5 text-primary" />
      </div>
      <span class="hidden md:inline">John Doe</span>
      <ChevronDownIcon class="w-4 h-4" :class="{ 'rotate-180': isOpen }" />
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
      >
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.label"
          :to="item.to"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)

const menuItems = [
  { label: 'Profile', to: '/dashboard/profile' },
  { label: 'Settings', to: '/dashboard/settings' },
  { label: 'Billing', to: '/dashboard/billing' },
  { label: 'Sign Out', to: '/auth/logout' }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

// Custom directive for clicking outside
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>