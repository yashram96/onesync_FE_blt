<template>
  <ClientOnly>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <template v-if="isFeatureEnabled('showAuthLinks')">
        <NuxtLink to="/auth/login">
          <Button variant="primary">
            Sign In
          </Button>
        </NuxtLink>
        <NuxtLink to="/auth/signup">
          <Button variant="outline">
            Create Account
          </Button>
        </NuxtLink>
      </template>
      <template v-else>
        <Button 
          variant="primary"
          @click="showWaitlistModal = true"
        >
          Join the Waitlist
        </Button>
        <Button 
          variant="outline"
          @click="scrollTo('#features')"
        >
          Learn More
        </Button>
      </template>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import { useFeatureFlags } from '~/utils/featureFlags'

const { isFeatureEnabled } = useFeatureFlags()
const showWaitlistModal = inject('showWaitlistModal') as Ref<boolean>

const scrollTo = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>