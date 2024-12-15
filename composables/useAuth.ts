

export function useAuth() {
  const isAuthenticated = ref<boolean>(true); // Mock authentication state

  const checkAuth = (): boolean => {
    // Implement actual auth check logic
    return isAuthenticated.value;
  };

  const logout = (): void => {
    isAuthenticated.value = false;
    // Implement actual logout logic
  };

  return {
    isAuthenticated,
    checkAuth,
    logout,
  };

  console.log(isAuthenticated.value)
}