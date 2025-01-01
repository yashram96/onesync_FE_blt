export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Make feature flags available in the Nuxt context
  // using plugin i can use directly as $featureFlags.showAuthLinks 
  // using composables for complex logic for feature flags
  return {
    provide: {
      globalVars: {
        // featureflags
        showAuthLinks: config.SHOW_AUTH_LINKS === true,

        // api
        apiBase: config.public.apiBase
      }
    }
  }
})