<template>
  <section id="features" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center text-primary mb-16">
        Powerful Features for Modern Teams
      </h2>
      <div class="grid md:grid-cols-3 gap-12">
        <div v-for="feature in features" :key="feature.title" 
          class="text-center p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
          <component :is="feature.icon" class="w-16 h-16 mx-auto mb-6 text-primary" />
          <h3 class="text-2xl font-semibold mb-4">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CloudArrowUpIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    title: 'Multi-Cloud Access Made Simple',
    description: 'Manage files from all major providers in one place.',
    icon: CloudArrowUpIcon
  },
  {
    title: 'End-to-End Security',
    description: 'Your data, encrypted and safe—always.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Collaboration Redefined',
    description: 'Share and work on files with teams effortlessly.',
    icon: UserGroupIcon
  }
]
</script>