<template>
  <div class="p-4 border border-gray-200 rounded-lg">
    <h3 class="text-sm font-medium text-gray-600 mb-2">{{ title }}</h3>
    <div class="flex items-end justify-between mb-2">
      <p class="text-2xl font-bold">{{ value }}</p>
      <p class="text-sm text-gray-500">of {{ total }}</p>
    </div>
    <div class="bg-gray-100 rounded-full h-2 mb-1">
      <div 
        class="bg-primary rounded-full h-full transition-all duration-300"
        :style="{ width: `${percentage}%` }"
      />
    </div>
    <p class="text-sm text-gray-500">{{ percentage.toFixed(1) }}% used</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  total: string | number
  percentage: number
}>()
</script>