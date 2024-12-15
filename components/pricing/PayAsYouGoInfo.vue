<template>
  <div class="bg-white rounded-xl p-8 shadow-lg border border-primary/10">
    <div class="max-w-3xl mx-auto text-center">
      <h3 class="text-2xl font-semibold text-primary mb-4">Pay-As-You-Go Explained</h3>
      <p class="text-gray-600 mb-6">
        Our Pay-As-You-Go plan is perfect for users who want flexibility. You only pay for what you use, 
        with storage linked directly to your cloud accounts - not on OneSync.
      </p>
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="(feature, index) in features" :key="index" class="p-4">
          <component :is="feature.icon" class="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 class="font-semibold mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-gray-500">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreditCardIcon, CloudArrowUpIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    icon: CreditCardIcon,
    title: 'Pay Only What You Use',
    description: 'No fixed costs - pay based on your actual usage'
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Your Storage, Your Way',
    description: 'Use your existing cloud storage providers'
  },
  {
    icon: ChartBarIcon,
    title: 'Usage Analytics',
    description: 'Track and optimize your storage costs'
  }
]
</script>