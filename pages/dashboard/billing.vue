<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Billing and Subscription</h1>
        <p class="text-gray-600 mt-1">
          Manage your subscription, payment methods, and billing details
        </p>
      </div>
      <Button 
        v-if="currentPlan.name !== 'Enterprise'"
        variant="primary"
        @click="showUpgradeModal = true"
      >
        Upgrade Plan
      </Button>
    </div>

    <!-- Current Plan Details -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold">Current Plan</h2>
          <p class="text-gray-600">Your subscription details and usage</p>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-primary">{{ currentPlan.price }}</p>
          <p class="text-sm text-gray-500">
            {{ currentPlan.period ? `per ${currentPlan.period}` : '' }}
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <p class="text-sm font-medium text-gray-600">Plan Name</p>
            <p class="text-lg font-semibold">{{ currentPlan.name }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Billing Period</p>
            <p class="text-lg">{{ currentPlan.period || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Next Billing Date</p>
            <p class="text-lg">{{ nextBillingDate || 'N/A' }}</p>
          </div>
        </div>

        <div>
          <p class="text-sm font-medium text-gray-600 mb-2">Storage Usage</p>
          <div class="bg-gray-100 rounded-full h-4 mb-2">
            <div 
              class="bg-primary rounded-full h-full transition-all duration-300"
              :style="{ width: `${(storageUsed / storageLimit) * 100}%` }"
            />
          </div>
          <p class="text-sm text-gray-600">
            {{ formatBytes(storageUsed) }} of {{ formatBytes(storageLimit) }} used
          </p>
        </div>
      </div>
    </div>

    <!-- Usage Summary -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-6">Usage Summary</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <BillingMetricCard
          title="Storage Usage"
          :value="formatBytes(storageUsed)"
          :total="formatBytes(storageLimit)"
          :percentage="(storageUsed / storageLimit) * 100"
        />
        <BillingMetricCard
          title="Platform Costs"
          :value="`$${platformCosts}`"
          :total="`$${platformCostsLimit}`"
          :percentage="(platformCosts / platformCostsLimit) * 100"
        />
        <BillingMetricCard
          title="Team Members"
          :value="teamMembersCount"
          :total="teamMembersLimit"
          :percentage="(teamMembersCount / teamMembersLimit) * 100"
        />
      </div>
    </div>

    <!-- Payment Methods -->
    <PaymentMethodsSection 
      :payment-methods="paymentMethods"
      @add="showAddPaymentModal = true"
      @remove="removePaymentMethod"
      @set-default="setDefaultPaymentMethod"
    />

    <!-- Billing History -->
    <BillingHistorySection :transactions="billingHistory" />

    <!-- Modals -->
    <UpgradePlanModal 
      v-model="showUpgradeModal"
      :current-plan="currentPlan"
      @upgrade="handleUpgrade"
    />

    <AddPaymentMethodModal
      v-model="showAddPaymentModal"
      @add="handleAddPaymentMethod"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatBytes } from '~/utils/format'
import { pricingPlans } from '~/constants/pricing'
import type { Plan } from 'Fpricing'

definePageMeta({
  layout: 'dashboard'
})

// Mock data - replace with actual API calls
const currentPlan = ref<Plan>(pricingPlans[0])
const nextBillingDate = ref('May 1, 2024')
const storageUsed = ref(250 * 1024 * 1024) // 250MB
const storageLimit = ref(500 * 1024 * 1024) // 500MB
const platformCosts = ref(45)
const platformCostsLimit = ref(100)
const teamMembersCount = ref(3)
const teamMembersLimit = ref(5)

const paymentMethods = ref([
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'visa',
    expiryMonth: '12',
    expiryYear: '2025',
    isDefault: true
  }
])

const billingHistory = ref([
  {
    id: '1',
    date: '2024-04-01',
    description: 'Professional Plan Renewal',
    amount: 19.99,
    status: 'paid',
    invoice: 'INV-2024-001'
  }
])

// Modal states
const showUpgradeModal = ref(false)
const showAddPaymentModal = ref(false)

// Methods
const handleUpgrade = (newPlan: Plan) => {
  // Implement plan upgrade logic
  currentPlan.value = newPlan
  showUpgradeModal.value = false
}

const handleAddPaymentMethod = (paymentDetails: any) => {
  // Implement payment method addition logic
  paymentMethods.value.push({
    id: Math.random().toString(),
    ...paymentDetails,
    isDefault: paymentMethods.value.length === 0
  })
  showAddPaymentModal.value = false
}

const removePaymentMethod = (paymentMethodId: string) => {
  // Implement payment method removal logic
  paymentMethods.value = paymentMethods.value.filter(pm => pm.id !== paymentMethodId)
}

const setDefaultPaymentMethod = (paymentMethodId: string) => {
  // Implement set default payment method logic
  paymentMethods.value = paymentMethods.value.map(pm => ({
    ...pm,
    isDefault: pm.id === paymentMethodId
  }))
}
</script>