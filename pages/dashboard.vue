<template>
  <!-- <NuxtLayout name="dashboard"> -->
    <NuxtPage />
  <!-- </NuxtLayout> -->
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
</script>