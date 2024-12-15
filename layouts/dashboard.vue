<template>
  <div class="min-h-screen bg-gray-50">
    <ClientOnly>
      <DashboardHeader />
      <div class="flex">
        <DashboardSidebar />
        <main class="flex-1 p-6 mt-16">
          <slot />
        </main>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '~/components/dashboard/DashboardHeader.vue'
 import DashboardSidebar from '~/components/dashboard/DashboardSidebar.vue'
</script>