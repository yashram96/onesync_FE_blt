<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <OneSyncLogo class="mx-auto h-12 w-auto text-primary" />
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Create your account</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
              placeholder="Full name"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Account
          </button>
        </div>
      </form>

      <p class="mt-2 text-center text-sm text-gray-600">
        Already have an account?
        <NuxtLink to="/auth/login" class="font-medium text-primary hover:text-primary/80">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OneSyncLogo from '~/components/icons/OneSyncLogo.vue'

definePageMeta({
  middleware: ['guest']
})

const name = ref('')
const email = ref('')
const password = ref('')

const handleSignup = async () => {
  try {
    // Implement signup logic here
    console.log('Signup attempt:', { 
      name: name.value,
      email: email.value, 
      password: password.value 
    })
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Signup failed:', error)
  }
}
</script>