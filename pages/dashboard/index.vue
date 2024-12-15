<template>
  <div class="space-y-6">
    <!-- Overview Section -->
    <DashboardOverview />
    
    <!-- File Manager Section -->
    <DashboardFileManager />
    
    <!-- Insights Section -->
    <DashboardInsights />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>