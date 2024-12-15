<template>
  <div class="h-64">
    <!-- Implement chart visualization here -->
    <div class="flex items-center justify-center h-full">
      <div v-for="item in data" :key="item.name" class="text-center mx-2">
        <div class="w-4 h-32 bg-primary/20 rounded-t-lg relative">
          <div 
            class="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-300"
            :style="{ height: `${(item.value / maxValue) * 100}%` }"
          />
        </div>
        <p class="text-sm mt-2">{{ item.name }}</p>
        <p class="text-xs text-gray-500">{{ formatBytes(item.value) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatBytes } from '~/utils/format'

const props = defineProps<{
  data: Array<{
    name: string
    value: number
  }>
}>()

const maxValue = computed(() => 
  Math.max(...props.data.map(item => item.value))
)
</script>