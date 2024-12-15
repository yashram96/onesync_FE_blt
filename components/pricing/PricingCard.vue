<template>
  <div 
    class="bg-white rounded-xl shadow-lg p-8 border"
    :class="[plan.popular ? 'border-primary' : 'border-gray-100']"
  >
    <!-- Popular Badge -->
    <div v-if="plan.popular" class="text-primary text-sm font-semibold mb-4">
      Most Popular
    </div>

    <!-- Plan Header -->
    <h3 class="text-2xl font-bold mb-2">{{ plan.name }}</h3>
    <div class="mb-6">
      <span class="text-3xl font-bold">{{ plan.price }}</span>
      <span v-if="plan.period" class="text-gray-500">/{{ plan.period }}</span>
    </div>

    <!-- Features List -->
    <ul class="space-y-4 mb-8">
      <li v-for="feature in plan.features" :key="feature" class="flex items-start">
        <CheckIcon class="w-5 h-5 text-primary shrink-0 mr-2" />
        <span class="text-gray-600">{{ feature }}</span>
      </li>
    </ul>

    <!-- CTA Button -->
    <Button 
      :variant="plan.popular ? 'primary' : 'outline'"
      class="w-full justify-center"
      @click="$emit('select-plan', plan.name)"
    >
      {{ plan.cta }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'
import { type Plan } from '~/types/pricing'
import Button from '~/components/ui/Button.vue'

defineProps<{
  plan: Plan
}>()

defineEmits<{
  'select-plan': [planName: string]
}>()
</script>