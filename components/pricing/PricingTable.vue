<template>
  <div class="grid lg:grid-cols-4 gap-8">
    <PricingCard
      v-for="plan in plans"
      :key="plan.name"
      :plan="plan"
      @select-plan="handlePlanSelection"
    />
  </div>
</template>

<script setup lang="ts">
import { type Plan } from '~/types/pricing'
import { pricingPlans } from '~/constants/pricing'
import PricingCard from './PricingCard.vue'

const plans = ref(pricingPlans)

const handlePlanSelection = (planName: string) => {
  if (planName === 'Enterprise') {
    // Handle enterprise contact form
    console.log('Contact sales for enterprise plan')
    return
  }
  
  // Handle other plan selections
  console.log('Selected plan:', planName)
}
</script>