import { ref, computed } from 'vue'
import type { BillingPlan } from '~/types/billing'

export function useBilling() {
  const currentPlan = ref<BillingPlan | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const changePlan = async (newPlan: BillingPlan) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      currentPlan.value = newPlan
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const formatPlanPrice = (plan: BillingPlan): string => {
    if (typeof plan.price === 'number') {
      return `$${plan.price}${plan.period ? `/${plan.period}` : ''}`
    }
    return plan.price.toString()
  }

  return {
    currentPlan,
    isLoading,
    error,
    changePlan,
    formatPlanPrice
  }
}
