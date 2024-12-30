<template>
  <Modal v-model="isOpen">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-primary mb-4">Upgrade Your Plan</h2>
      <p class="text-gray-600 mb-6">
        Choose a plan that best fits your needs
      </p>

      <div class="space-y-4">
        <div 
          v-for="plan in availablePlans" 
          :key="plan.name"
          class="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
          :class="{ 'border-primary bg-primary/5': selectedPlan?.name === plan.name }"
          @click="selectedPlan = plan"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold">{{ plan.name }}</h3>
            <p class="text-lg font-bold">
              {{ plan.price }}
              <span v-if="plan.period" class="text-sm text-gray-500">
                /{{ plan.period }}
              </span>
            </p>
          </div>
          <ul class="space-y-2">
            <li 
              v-for="feature in plan.features" 
              :key="feature"
              class="flex items-start"
            >
              <CheckIcon class="w-5 h-5 text-primary shrink-0 mr-2" />
              <span class="text-gray-600">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex justify-end space-x-4 mt-6 pt-6 border-t">
        <Button 
          variant="outline"
          @click="$emit('update:modelValue', false)"
        >
          Cancel
        </Button>
        <Button 
          variant="primary"
          :disabled="!selectedPlan || selectedPlan.name === currentPlan.name"
          @click="handleUpgrade"
        >
          Upgrade to {{ selectedPlan?.name }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import type { Plan } from '~/types/pricing'
import { pricingPlans } from '~/constants/pricing'
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{
  modelValue: boolean
  currentPlan: Plan
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  upgrade: [plan: Plan]
}>()

const isOpen = defineModel<boolean>()
const selectedPlan = ref<Plan | null>(null)

const availablePlans = computed(() => 
  pricingPlans.filter(plan => 
    plan.name !== props.currentPlan.name && 
    plan.name !== 'Free'
  )
)

const handleUpgrade = () => {
  if (selectedPlan.value) {
    emit('upgrade', selectedPlan.value)
    isOpen.value = false
    selectedPlan.value = null
  }
}
</script>