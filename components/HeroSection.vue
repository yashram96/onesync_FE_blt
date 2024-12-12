<template>
  <section class="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-white">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-primary mb-6">
          Unify Your Cloud Storage Experience
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Access, manage, and collaborate on AWS S3, Google Cloud Storage, and Azure Blob Storage—all in one seamless interface.
        </p>
        <HeroButtons />
        <div class="mt-16">
          <CloudIllustration class="max-w-3xl mx-auto" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CloudIllustration from '~/components/icons/CloudIllustration.vue'
import HeroButtons from '~/components/sections/hero/HeroButtons.vue'
</script>