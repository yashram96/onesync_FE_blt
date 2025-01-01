export default defineNuxtRouteMiddleware((to) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  // https://stackoverflow.com/questions/64526236/error-localstorage-is-not-defined-on-refersh-nuxt-js-parse-server
  // const token =  localStorage.getItem('token')

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (token && (to.path === '/auth/login' || to.path === '/auth/signup')) {
    return navigateTo('/dashboard')
  }
})