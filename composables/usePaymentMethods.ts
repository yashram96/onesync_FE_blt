```typescript
import { ref } from 'vue'
import type { PaymentMethod } from '~/types/billing'

export function usePaymentMethods() {
  const paymentMethods = ref<PaymentMethod[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const addPaymentMethod = async (paymentDetails: Partial<PaymentMethod>) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newPaymentMethod: PaymentMethod = {
        id: Math.random().toString(36).substr(2, 9),
        isDefault: paymentMethods.value.length === 0,
        ...paymentDetails
      } as PaymentMethod

      paymentMethods.value.push(newPaymentMethod)
      return newPaymentMethod
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const removePaymentMethod = async (id: string) => {
    const index = paymentMethods.value.findIndex(pm => pm.id === id)
    if (index !== -1) {
      paymentMethods.value.splice(index, 1)
    }
  }

  const setDefaultPaymentMethod = async (id: string) => {
    paymentMethods.value = paymentMethods.value.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    }))
  }

  return {
    paymentMethods,
    isLoading,
    error,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod
  }
}
```