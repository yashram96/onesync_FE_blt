import type { StorageLimit } from '~/types/billing'

export function formatStorageLimit(limit: StorageLimit): string {
  if (limit.value === 0) return 'Custom'
  return `${limit.value}${limit.unit}`
}

export function calculateStoragePercentage(used: number, total: number): number {
  if (total === 0) return 0
  return Math.min((used / total) * 100, 100)
}

export function formatBillingDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function validateCardNumber(cardNumber: string): boolean {
  // Basic card number validation
  return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''))
}

export function validateExpiryDate(expiry: string): boolean {
  // Basic MM/YY validation
  const [month, year] = expiry.split('/')
  if (!month || !year) return false
  
  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1
  
  const expiryMonth = parseInt(month, 10)
  const expiryYear = parseInt(year, 10)
  
  if (expiryMonth < 1 || expiryMonth > 12) return false
  if (expiryYear < currentYear) return false
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false
  
  return true
}

export function validateCVC(cvc: string): boolean {
  // Basic CVC validation (3-4 digits)
  return /^\d{3,4}$/.test(cvc)
}
