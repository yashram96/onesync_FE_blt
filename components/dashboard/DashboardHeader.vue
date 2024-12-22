<template>
  <header class="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
    <div class="h-16 px-4 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <button 
          class="mr-4 text-gray-600 hover:text-primary md:hidden"
          @click="toggleSidebar"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
        <NuxtLink to="/dashboard" class="flex items-center">
          <OneSyncLogo class="h-8 w-auto text-primary" />
          <span class="sr-only">OneSync</span>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.to"
          class="text-gray-600 hover:text-primary transition-colors"
          :class="{ 'text-primary font-semibold': isActive(item.to) }"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Profile Menu -->
      <ClientOnly>
        <DashboardProfileMenu />
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

const route = useRoute()

import OneSyncLogo from '~/components/icons/OneSyncLogo.vue'

const emit = defineEmits<{
  'toggle-sidebar': []
}>()

const navItems = [
  { name: 'Home', to: '/dashboard' },
  { name: 'Files', to: '/dashboard/files' },
  { name: 'Teams', to: '/dashboard/teams' },
  { name: 'Settings', to: '/dashboard/settings' },
  { name: 'Help', to: '/dashboard/help' }
]

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(`${path}/`)
}
const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>