<template>
  <section id="pricing" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Simple, Transparent Pricing</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include core features like centralized dashboards, encryption, and budgeting tools.
        </p>
      </div>

      <!-- Pay As You Go Info -->
      <PayAsYouGoInfo class="mb-16" />

      <!-- Pricing Table -->
      <div class="overflow-x-auto">
        <PricingTable />
      </div>

      <!-- Additional Info -->
      <div class="mt-12 text-center text-gray-600">
        <p class="text-sm">
          Platform features, such as centralized dashboards, encryption, budgeting tools, and reminders, are included in all plans.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PayAsYouGoInfo from './PayAsYouGoInfo.vue'
import PricingTable from './PricingTable.vue'
</script>