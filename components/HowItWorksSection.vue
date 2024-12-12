<template>
  <section id="how-it-works" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center text-primary mb-16">
        How It Works
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(step, index) in steps" :key="index" 
          class="relative text-center">
          <div class="bg-white rounded-lg p-8 shadow-lg">
            <div class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
          <div v-if="index < steps.length - 1" class="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
            <ArrowLongRightIcon class="w-12 h-12 text-primary" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLongRightIcon } from '@heroicons/vue/24/outline'

const steps = [
  {
    title: 'Connect Your Cloud Accounts',
    description: 'Easily connect your existing cloud storage accounts in minutes.'
  },
  {
    title: 'Organize Your Files',
    description: 'Access and manage all your files from a single dashboard.'
  },
  {
    title: 'Collaborate Securely',
    description: 'Share and work together with your team seamlessly.'
  }
]
</script>