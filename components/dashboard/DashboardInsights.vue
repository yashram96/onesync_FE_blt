<template>
  <section class="grid md:grid-cols-2 gap-6">
    <!-- Storage Distribution -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Storage Distribution</h3>
      <StorageChart :data="storageData" />
    </div>

    <!-- Cost Tracking -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Platform Costs</h3>
      <CostChart :data="costData" />
    </div>
  </section>
</template>

<script setup lang="ts">
import StorageChart from '~/components/dashboard/charts/StorageChart.vue'
import CostChart from '~/components/dashboard/charts/CostChart.vue'

// Mock data - replace with real data
const storageData = [
  { name: 'AWS S3', value: 250 },
  { name: 'Google Cloud', value: 150 },
  { name: 'Azure Blob', value: 100 },
  { name: 'OneSync', value: 50 }
]

const costData = [
  { date: '2024-01', value: 45 },
  { date: '2024-02', value: 62 },
  { date: '2024-03', value: 58 },
  { date: '2024-04', value: 85 }
]
</script>