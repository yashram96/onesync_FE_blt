<template>
  <Modal v-model="isOpen" size="lg">
    <div class="max-w-4xl mx-auto">
      <!-- Step 1: Plan Selection -->
      <div v-if="step === 'select'">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-primary">Choose Your Plan</h2>
          <p class="text-gray-600 mt-2">
            Select the plan that best fits your needs
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <PlanCard
            v-for="plan in availablePlans"
            :key="plan.id"
            :plan="plan"
            :is-selected="selectedPlan?.id === plan.id"
            :is-current-plan="plan.id === currentPlan.id"
            @select="selectPlan"
          />
        </div>

        <div class="flex justify-end space-x-4 mt-8 pt-6 border-t">
          <Button 
            variant="outline"
            @click="closeModal"
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            :disabled="!canProceed"
            @click="step = 'confirm'"
          >
            Continue
          </Button>
        </div>
      </div>

      <!-- Step 2: Confirmation -->
      <div v-else>
        <div class="mb-8">
          <button 
            class="text-gray-600 hover:text-primary mb-4"
            @click="step = 'select'"
          >
            <ArrowLeftIcon class="w-5 h-5 inline-block mr-1" />
            Back to Plans
          </button>
          <h2 class="text-2xl font-bold text-primary">
            Confirm Your Plan Change
          </h2>
        </div>

        <PlanChangeConfirmation
          v-if="selectedPlan"
          :current-plan="currentPlan"
          :new-plan="selectedPlan"
          :warnings="planChangeWarnings"
          @cancel="closeModal"
          @confirm="confirmPlanChange"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import type { BillingPlan } from '~/types/billing'
import { useBillingPlans } from '~/composables/useBillingPlans'
import Modal from '~/components/ui/Modal.vue'
import Button from '~/components/ui/Button.vue'
import PlanCard from './PlanCard.vue'
import PlanChangeConfirmation from './PlanChangeConfirmation.vue'

const props = defineProps<{
  modelValue: boolean
  currentPlan: BillingPlan
  usage: {
    storage: number
    shareLinks: number
    teamMembers: number
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'upgrade': [plan: BillingPlan]
}>()

const isOpen = defineModel<boolean>()
const step = ref<'select' | 'confirm'>('select')
const selectedPlan = ref<BillingPlan | null>(null)

const { plans, validatePlanChange } = useBillingPlans()

const availablePlans = computed(() => 
  plans.value.filter(plan => plan.id !== props.currentPlan.id)
)

const canProceed = computed(() => 
  selectedPlan.value && selectedPlan.value.id !== props.currentPlan.id
)

const planChangeWarnings = computed(() => {
  if (!selectedPlan.value) return []
  return validatePlanChange(props.currentPlan, selectedPlan.value, props.usage)
})

const selectPlan = (plan: BillingPlan) => {
  selectedPlan.value = plan
}

const closeModal = () => {
  isOpen.value = false
  step.value = 'select'
  selectedPlan.value = null
}

const confirmPlanChange = () => {
  if (selectedPlan.value) {
    emit('upgrade', selectedPlan.value)
    closeModal()
  }
}
</script>