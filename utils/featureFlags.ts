import { ref, computed } from 'vue'

interface FeatureFlags {
  showAuthLinks: boolean
  // Add more feature flags here as needed
}

// Create a reactive store for feature flags
const featureFlags = ref<FeatureFlags>({
  showAuthLinks: false // Default value
})

// Initialize flags when the app starts
const initializeFlags = () => {
  if (process.client) {
    const config = useRuntimeConfig()
    featureFlags.value.showAuthLinks = config.SHOW_AUTH_LINKS === 'true'
  }
}

export function useFeatureFlags() {
  // Initialize flags on first use
  initializeFlags()

  // Simplified computed property
  const isFeatureEnabled = (flagName: keyof FeatureFlags): boolean => {
    return featureFlags.value[flagName]
  }

  const setFeatureFlag = (flagName: keyof FeatureFlags, value: boolean): void => {
    featureFlags.value[flagName] = value
  }

  return {
    isFeatureEnabled,
    setFeatureFlag
  }
}