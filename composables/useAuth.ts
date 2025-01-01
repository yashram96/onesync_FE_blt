
export function useAuth() {
  const isAuthenticated = ref<boolean>(true); // Mock authentication state
  const config = useRuntimeConfig()
  const token = ref<string | null>(null)
  const user = ref(null)

  const login = async (username: string, password: string) => {
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const { data , status } = await useFetch('/api/auth/token', {
        method: 'POST',
        body: formData,
      })
      console.log(status.value)
      if (status.value !='success') {
        throw new Error('Authentication failed')
      }
      token.value = data.value?.access_token

      console.log(data.value?.access_token)
      // Store token in localStorage or cookie
      localStorage.setItem('token', data.value?.access_token
)

      // Fetch user details
      await fetchUser()

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      user.value = await response.json()
      console.log(user.value)
    } catch (error) {
      console.error('Fetch user error:', error)
    }
  }



  const logout = (): void => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    logout,
    fetchUser,
    token,
    user,
    login
  };

  console.log(isAuthenticated.value)
}