<template>
  <section>
    <h2 class="text-2xl font-semibold mb-4">Overview</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Storage Usage -->
      <MetricCard
        title="Storage Usage"
        :chart-data="storageData"
        chart-type="pie"
        :total="formatBytes(totalStorage)"
      />

      <!-- Budget Tracker -->
      <MetricCard
        title="Budget Usage"
        :progress="budgetProgress"
        :value="`$${currentBudget} / $${totalBudget}`"
        chart-type="progress"
      />

      <!-- Active Share Links -->
      <MetricCard
        title="Active Share Links"
        :value="activeLinks"
        :secondary-text="'of ' + maxLinks + ' available'"
        chart-type="number"
        action-text="Manage Links"
        @action-click="handleManageLinks"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import MetricCard from '~/components/dashboard/metrics/MetricCard.vue'
import { formatBytes } from '~/utils/format'

// Mock data - replace with real data in production
const storageData = [
  { name: 'AWS S3', value: 250, color: '#FF9900' },
  { name: 'Google Cloud', value: 150, color: '#4285F4' },
  { name: 'Azure Blob', value: 100, color: '#00A4EF' },
  { name: 'OneSync', value: 50, color: '#390050' }
]

const totalStorage = computed(() => 
  storageData.reduce((acc, curr) => acc + curr.value, 0)
)

const currentBudget = 85
const totalBudget = 100
const budgetProgress = computed(() => (currentBudget / totalBudget) * 100)

const activeLinks = 3
const maxLinks = 10

const handleManageLinks = () => {
  console.log('Navigate to manage links')
}
</script>