
// Add these interfaces to the existing billing.ts file

export interface PaymentMethod {
  id: string
  type: 'card'
  last4: string
  brand: string
  expiryMonth: string
  expiryYear: string
  isDefault: boolean
}

export interface BillingTransaction {
  id: string
  date: string
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  invoice?: string
}

export interface BillingUsage {
  storage: {
    used: number
    total: number
  }
  shareLinks: {
    active: number
    total: number
  }
  teamMembers: {
    active: number
    total: number
  }
  platformCosts?: {
    current: number
    limit: number
  }
}
