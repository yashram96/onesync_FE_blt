// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      SHOW_AUTH_LINKS: process.env.NUXT_PUBLIC_SHOW_AUTH_LINKS || 'false'
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true, // Enables polling mode
        interval: 10,    // Check every 100ms
      },
      hmr: {
        port: 24678, // Default Vite HMR port
      },
    },
  },
  app: {
    head: {
      title: 'OneSync - Unify Your Cloud Storage Experience',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Access, manage, and collaborate on AWS S3, Google Cloud Storage, and Azure Blob Storage—all in one seamless interface.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})