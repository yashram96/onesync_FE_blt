<template>
  <button 
    :class="[
      'px-4 py-2 rounded-full transition-colors font-semibold flex',
      variant === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : 
      variant === 'outline' ? 'text-primary border-2 border-primary hover:bg-primary/5' : ''
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'outline'
}>()
</script>