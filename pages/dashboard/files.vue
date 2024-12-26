<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">File Manager</h1>
    <FileStorageManager />
  </div>
</template>

<script setup lang="ts">
import FileStorageManager from '~/components/files/FileStorageManager.vue'

definePageMeta({
  layout: 'dashboard'
})
</script>