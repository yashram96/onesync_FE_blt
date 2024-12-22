<template>
  <div class="min-h-screen bg-gray-50">
    <ClientOnly>
      <DashboardHeader @toggle-sidebar="toggleSidebar" />
      <div class="flex">
        <DashboardSidebar v-model="isSidebarOpen" />
        <main class="flex-1 p-4 sm:p-6 mt-16">
          <slot />
        </main>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '~/components/dashboard/DashboardHeader.vue'
import DashboardSidebar from '~/components/dashboard/DashboardSidebar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>