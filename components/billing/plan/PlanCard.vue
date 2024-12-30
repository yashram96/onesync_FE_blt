<template>
  <div 
    class="border rounded-lg p-6 hover:border-primary cursor-pointer transition-colors"
    :class="[
      isSelected ? 'border-primary bg-primary/5' : 'border-gray-200',
      isCurrentPlan ? 'relative overflow-hidden' : ''
    ]"
    @click="$emit('select', plan)"
  >
    <!-- Current Plan Badge -->
    <div 
      v-if="isCurrentPlan"
      class="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full"
    >
      Current Plan
    </div>

    <!-- Popular Badge -->
    <div 
      v-if="plan.isPopular && !isCurrentPlan"
      class="text-primary text-sm font-semibold mb-2"
    >
      Most Popular
    </div>

    <!-- Plan Header -->
    <div class="mb-4">
      <h3 class="text-xl font-bold">{{ plan.name }}</h3>
      <div class="mt-2">
        <span class="text-2xl font-bold">
          {{ typeof plan.price === 'number' ? `$${plan.price}` : plan.price }}
        </span>
        <span v-if="plan.period" class="text-gray-500">
          /{{ plan.period }}
        </span>
      </div>
    </div>

    <!-- Storage Limit -->
    <div class="mb-4 pb-4 border-b border-gray-200">
      <p class="text-gray-600">
        <span class="font-semibold">Storage:</span>
        {{ formatStorageLimit(plan.storageLimit) }}
      </p>
    </div>

    <!-- Features List -->
    <ul class="space-y-3">
      <li 
        v-for="feature in plan.features" 
        :key="feature.name"
        class="flex items-start"
      >
        <CheckIcon class="w-5 h-5 text-primary shrink-0 mr-2" />
        <span class="text-gray-600">{{ feature.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'
import type { BillingPlan } from '~/types/billing'

const props = defineProps<{
  plan: BillingPlan
  isSelected?: boolean
  isCurrentPlan?: boolean
}>()

defineEmits<{
  select: [plan: BillingPlan]
}>()

const formatStorageLimit = (limit: BillingPlan['storageLimit']) => {
  if (limit.value === 0) return 'Custom'
  return `${limit.value}${limit.unit}`
}
</script>