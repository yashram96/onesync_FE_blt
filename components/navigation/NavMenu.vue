<template>
  <div class="hidden md:flex space-x-8">
    <NuxtLink 
      v-for="item in menuItems" 
      :key="item.text" 
      :to="item.link" 
      class="text-gray-600 hover:text-primary transition-colors"
    >
      {{ item.text }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { menuItems } from '~/constants/navigation'
</script>