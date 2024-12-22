<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <p class="text-gray-600">Logging out...</p>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()

onMounted(async () => {
  await logout()
  navigateTo('/')
})
</script>