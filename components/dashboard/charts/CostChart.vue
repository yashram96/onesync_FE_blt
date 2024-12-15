<template>
  <div class="h-64">
    <!-- Implement chart visualization here -->
    <div class="flex items-end justify-between h-full">
      <div 
        v-for="item in data" 
        :key="item.date" 
        class="flex flex-col items-center"
      >
        <div class="w-12 bg-primary/20 rounded-t-lg relative">
          <div 
            class="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-300"
            :style="{ height: `${(item.value / maxValue) * 100}%` }"
          />
        </div>
        <p class="text-xs mt-2">{{ formatMonth(item.date) }}</p>
        <p class="text-xs text-gray-500">${{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Array<{
    date: string
    value: number
  }>
}>()

const maxValue = computed(() => 
  Math.max(...props.data.map(item => item.value))
)

const formatMonth = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short' })
}
</script>