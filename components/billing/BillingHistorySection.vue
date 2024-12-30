<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-lg font-semibold">Billing History</h2>
      <p class="text-gray-600">View and download your past invoices</p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Description
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Amount
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Invoice
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatDate(transaction.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ transaction.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              ${{ transaction.amount.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="[
                  transaction.status === 'paid' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ transaction.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <Button variant="outline" size="sm" @click="downloadInvoice(transaction)">
                <DocumentArrowDownIcon class="w-4 h-4 mr-1" />
                Download
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="transactions.length === 0" class="text-center py-8 text-gray-500">
        No billing history available
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentArrowDownIcon } from '@heroicons/vue/24/outline'
import { formatDate } from '~/utils/format'
import Button from '~/components/ui/Button.vue'

defineProps<{
  transactions: Array<{
    id: string
    date: string
    description: string
    amount: number
    status: 'paid' | 'pending'
    invoice: string
  }>
}>()

const downloadInvoice = (transaction: any) => {
  // Implement invoice download logic
  console.log('Downloading invoice:', transaction.invoice)
}
</script>