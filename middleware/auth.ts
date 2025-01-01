export default defineNuxtRouteMiddleware((to) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  // https://stackoverflow.com/questions/64526236/error-localstorage-is-not-defined-on-refersh-nuxt-js-parse-server
  // const token =  localStorage.getItem('token')
  if (!token && to.path.startsWith('/dashboard')) {
    return navigateTo('/auth/login')
  }
})