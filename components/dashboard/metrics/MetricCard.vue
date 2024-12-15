<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-start mb-4">
      <h3 class="font-semibold text-gray-700">{{ title }}</h3>
      <slot name="action" />
    </div>

    <!-- Pie Chart -->
    <template v-if="chartType === 'pie' && chartData">
      <div class="relative h-48">
        <!-- Add chart implementation here -->
        <div class="absolute inset-0 flex items-center justify-center">
          <p class="text-2xl font-bold">{{ total }}</p>
        </div>
      </div>
    </template>

    <!-- Progress Bar -->
    <template v-else-if="chartType === 'progress'">
      <div class="mb-2">
        <div class="h-2 bg-gray-200 rounded-full">
          <div 
            class="h-full bg-primary rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
      <p class="text-2xl font-bold">{{ value }}</p>
    </template>

    <!-- Number Display -->
    <template v-else-if="chartType === 'number'">
      <div class="text-center">
        <p class="text-3xl font-bold mb-1">{{ value }}</p>
        <p class="text-sm text-gray-500">{{ secondaryText }}</p>
      </div>
      <Button 
        v-if="actionText"
        variant="outline"
        class="w-full mt-4"
        @click="$emit('action-click')"
      >
        {{ actionText }}
      </Button>
    </template>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue'

defineProps<{
  title: string
  chartType: 'pie' | 'progress' | 'number'
  chartData?: Array<{ name: string; value: number; color: string }>
  total?: string
  progress?: number
  value?: string | number
  secondaryText?: string
  actionText?: string
}>()

defineEmits<{
  'action-click': []
}>()
</script>