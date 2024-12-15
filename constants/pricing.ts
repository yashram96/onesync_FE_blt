import { type Plan } from '~/types/pricing'

export const pricingPlans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    storage: '500MB on OneSync storage',
    cloudIntegrations: 'Up to 2 cloud accounts',
    features: [
      'Basic file management tools',
      'Create and share up to 2 file links',
      'View, download, and open OneSync files',
      'View-only for cloud files'
    ],
    platformCosts: 'Free',
    teamSupport: 'Single-user only',
    support: 'Community support',
    cta: 'Get Started for Free'
  },
  {
    name: 'Pay-As-You-Go',
    price: 'Usage Based',
    storage: 'Uses linked cloud storage',
    cloudIntegrations: 'Unlimited accounts',
    features: [
      'Centralized view of linked files',
      'Encryption of linked files',
      'Budgeting tools',
      'Payment reminders'
    ],
    platformCosts: 'Usage-based',
    teamSupport: 'Teams at extra cost',
    support: 'Community support',
    cta: 'Start with Pay-As-You-Go'
  },
  {
    name: 'Professional',
    price: '$19.99',
    period: 'month',
    storage: '1TB on OneSync storage',
    cloudIntegrations: 'Unlimited accounts',
    features: [
      'Full file access',
      'Unlimited file sharing',
      'Advanced budgeting tools',
      'Team collaboration included'
    ],
    platformCosts: 'Included',
    teamSupport: 'Teams included',
    support: 'Priority support',
    cta: 'Start Your Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    storage: 'Customizable storage',
    cloudIntegrations: 'Unlimited accounts',
    features: [
      'Full file access',
      'Role-based access management',
      'SSO integration',
      'Dedicated support manager'
    ],
    platformCosts: 'Custom pricing',
    teamSupport: 'Full team management',
    support: 'Dedicated manager',
    cta: 'Contact Sales'
  }
]