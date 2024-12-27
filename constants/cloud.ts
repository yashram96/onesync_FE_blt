import { CloudArrowUpIcon } from '@heroicons/vue/24/outline'
import type { CloudProvider } from '~/types/cloud'

export const cloudProviders: CloudProvider[] = [
  {
    id: 'aws',
    name: 'AWS S3',
    icon: defineAsyncComponent(() => import('~/components/icons/cloud/AwsIcon.vue'))
  },
  {
    id: 'google',
    name: 'Google Cloud Storage',
    icon: defineAsyncComponent(() => import('~/components/icons/cloud/GoogleCloudIcon.vue'))
  },
  {
    id: 'azure',
    name: 'Azure Blob Storage',
    icon: defineAsyncComponent(() => import('~/components/icons/cloud/AzureIcon.vue'))
  }
]