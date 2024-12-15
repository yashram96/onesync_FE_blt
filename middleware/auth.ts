export default defineNuxtRouteMiddleware((to) => {
  const { checkAuth } = useAuth()
  
  if (!checkAuth() && to.path.startsWith('/dashboard')) {
    return navigateTo('/auth/login')
  }
})