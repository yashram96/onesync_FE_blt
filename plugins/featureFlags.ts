export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Make feature flags available in the Nuxt context
  return {
    provide: {
      featureFlags: {
        showAuthLinks: config.public.SHOW_AUTH_LINKS === 'true'
      }
    }
  }
})