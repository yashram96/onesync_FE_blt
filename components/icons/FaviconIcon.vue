<template>
  <svg viewBox="0 0 100 100" :width="size" :height="size" :class="class">
    <path d="M20 8C23.5 8 26.5 10 28 13C29.5 9.5 32.5 7 36 7C40 7 43 10 43 14C43 14.5 43 15 42.8 15.5C44.2 14.5 46 14 48 14C52.5 14 56 17.5 56 22C56 26.5 52.5 30 48 30H20C14.5 30 10 25.5 10 20C10 14.5 14.5 10 20 8Z" 
      fill="currentColor"/>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size?: number | string
  class?: string
}>()
</script>