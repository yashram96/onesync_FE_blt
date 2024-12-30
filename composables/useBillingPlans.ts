import { ref, computed } from 'vue'
import type { BillingPlan, PlanChangeWarning } from '~/types/billing'

export function useBillingPlans() {
  const plans = ref<BillingPlan[]>([
    {
      id: 'free',
      name: 'Free',
      price: 0,
      storageLimit: { value: 500, unit: 'MB' },
      maxShareLinks: 2,
      maxTeamMembers: 1,
      features: [
        { name: 'Basic file management', included: true },
        { name: 'Encryption', included: true },
        { name: 'Reminders', included: true },
        { name: 'Basic analytics', included: true }
      ]
    },
    {
      id: 'pay-as-you-go',
      name: 'Pay-As-You-Go',
      price: 'Usage-Based',
      storageLimit: { value: 0, unit: 'TB' }, // No limit, uses cloud storage
      maxShareLinks: Infinity,
      maxTeamMembers: Infinity,
      features: [
        { name: 'Cloud account linking', included: true },
        { name: 'Bill payment reminders', included: true },
        { name: 'Advanced encryption', included: true },
        { name: 'Team collaboration', included: true },
        { name: 'Usage analytics', included: true }
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 19.99,
      period: 'month',
      storageLimit: { value: 1, unit: 'TB' },
      maxShareLinks: Infinity,
      maxTeamMembers: 10,
      features: [
        { name: 'All Pay-As-You-Go features', included: true },
        { name: 'Unlimited share links', included: true },
        { name: 'Advanced team collaboration', included: true },
        { name: 'Priority support', included: true }
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      storageLimit: { value: 0, unit: 'TB' }, // Custom limit
      maxShareLinks: Infinity,
      maxTeamMembers: Infinity,
      features: [
        { name: 'All Professional features', included: true },
        { name: 'SSO integration', included: true },
        { name: 'Advanced team management', included: true },
        { name: 'Dedicated support manager', included: true },
        { name: 'Custom integration', included: true }
      ]
    }
  ])

  const validatePlanChange = (currentPlan: BillingPlan, newPlan: BillingPlan, usage: {
    storage: number
    shareLinks: number
    teamMembers: number
  }): PlanChangeWarning[] => {
    const warnings: PlanChangeWarning[] = []

    // Check storage limitations
    if (newPlan.storageLimit.value > 0 && usage.storage > newPlan.storageLimit.value) {
      warnings.push({
        type: 'storage',
        message: `You are currently using more storage than allowed in the ${newPlan.name} plan. Please reduce your storage usage before downgrading.`,
        severity: 'error'
      })
    }

    // Check share links limitations
    if (usage.shareLinks > newPlan.maxShareLinks) {
      warnings.push({
        type: 'shareLinks',
        message: `You will need to remove ${usage.shareLinks - newPlan.maxShareLinks} share links before downgrading.`,
        severity: 'error'
      })
    }

    // Check team members limitations
    if (usage.teamMembers > newPlan.maxTeamMembers) {
      warnings.push({
        type: 'team',
        message: `You will need to remove ${usage.teamMembers - newPlan.maxTeamMembers} team members before downgrading.`,
        severity: 'error'
      })
    }

    return warnings
  }

  return {
    plans,
    validatePlanChange
  }
}