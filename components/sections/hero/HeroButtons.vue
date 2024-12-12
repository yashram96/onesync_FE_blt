<template>
  <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue'

const showWaitlistModal = inject('showWaitlistModal') as Ref<boolean>

const scrollTo = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>