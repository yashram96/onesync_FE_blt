<template>
  <div class="space-y-6">
    <div v-if="warnings.length > 0" class="space-y-4">
      <div 
        v-for="warning in warnings" 
        :key="warning.type"
        class="p-4 rounded-lg"
        :class="[
          warning.severity === 'error' 
            ? 'bg-red-50 text-red-700' 
            : 'bg-yellow-50 text-yellow-700'
        ]"
      >
        {{ warning.message }}
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="font-semibold">Plan Change Summary</h3>
      
      <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <p class="text-sm text-gray-500">Current Plan</p>
          <p class="font-medium">{{ currentPlan.name }}</p>
          <p class="text-sm text-gray-600">
            {{ formatPlanPrice(currentPlan) }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500">New Plan</p>
          <p class="font-medium">{{ newPlan.name }}</p>
          <p class="text-sm text-gray-600">
            {{ formatPlanPrice(newPlan) }}
          </p>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-sm font-medium">Changes in Features:</h4>
        <ul class="space-y-2">
          <li 
            v-for="change in featureChanges" 
            :key="change.feature"
            class="flex items-start text-sm"
          >
            <component 
              :is="change.type === 'add' ? PlusIcon : MinusIcon"
              class="w-4 h-4 mr-2 mt-0.5"
              :class="change.type === 'add' ? 'text-green-500' : 'text-red-500'"
            />
            <span>{{ change.feature }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="pt-6 border-t flex justify-end space-x-4">
      <Button 
        variant="outline"
        @click="$emit('cancel')"
      >
        Cancel
      </Button>
      <Button 
        variant="primary"
        :disabled="hasBlockingWarnings"
        @click="$emit('confirm')"
      >
        {{ confirmButtonText }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'
import type { BillingPlan, PlanChangeWarning } from '~/types/billing'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{
  currentPlan: BillingPlan
  newPlan: BillingPlan
  warnings: PlanChangeWarning[]
}>()

defineEmits<{
  cancel: []
  confirm: []
}>()

const hasBlockingWarnings = computed(() => 
  props.warnings.some(w => w.severity === 'error')
)

const confirmButtonText = computed(() => {
  if (hasBlockingWarnings.value) return 'Resolve Issues to Continue'
  return `Confirm ${props.newPlan.price > props.currentPlan.price ? 'Upgrade' : 'Downgrade'}`
})

const formatPlanPrice = (plan: BillingPlan) => {
  if (typeof plan.price === 'number') {
    return `$${plan.price}${plan.period ? `/${plan.period}` : ''}`
  }
  return plan.price
}

const featureChanges = computed(() => {
  const changes: Array<{ type: 'add' | 'remove', feature: string }> = []
  
  // Find new features
  props.newPlan.features.forEach(newFeature => {
    if (!props.currentPlan.features.find(f => f.name === newFeature.name)) {
      changes.push({ type: 'add', feature: newFeature.name })
    }
  })

  // Find removed features
  props.currentPlan.features.forEach(currentFeature => {
    if (!props.newPlan.features.find(f => f.name === currentFeature.name)) {
      changes.push({ type: 'remove', feature: currentFeature.name })
    }
  })

  return changes
})
</script>