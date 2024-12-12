<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center text-primary mb-16">
        Trusted by Teams Worldwide
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.author" 
          class="bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold">
              {{ testimonial.author[0] }}
            </div>
            <div class="ml-4">
              <h3 class="font-semibold">{{ testimonial.author }}</h3>
              <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-gray-600 italic">"{{ testimonial.quote }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    quote: "OneSync has transformed how we manage our cloud storage. It's intuitive and powerful.",
    author: "Sarah Chen",
    role: "CTO, TechStart"
  },
  {
    quote: "The multi-cloud integration is seamless. This is exactly what we needed.",
    author: "Michael Rodriguez",
    role: "DevOps Lead, CloudScale"
  },
  {
    quote: "Security and ease of use in one package. OneSync delivers on its promises.",
    author: "Emma Thompson",
    role: "Security Engineer, SecureFlow"
  }
]
</script>