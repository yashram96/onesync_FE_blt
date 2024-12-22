export default defineNuxtRouteMiddleware((to) => {
  const { checkAuth } = useAuth()
  
  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (checkAuth() && (to.path === '/auth/login' || to.path === '/auth/signup')) {
    return navigateTo('/dashboard')
  }
})