import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { readUsersMeUsersMeGet, loginForAccessTokenTokenPost } from '@/api/generated/api'
import type { BodyLoginForAccessTokenTokenPost, Token } from '@/api/generated/models'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const token = ref<string | null>(localStorage.getItem('access_token'))
  const user = ref<any>(null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (username: string, password: string) => {
    try {
      const payload: BodyLoginForAccessTokenTokenPost = {
        username,
        password,
        grant_type: 'password',
      }

      const response = await loginForAccessTokenTokenPost(payload)
      const responseToken = response.data as unknown as Token

      if (responseToken.access_token) {
        token.value = responseToken.access_token
        localStorage.setItem('access_token', responseToken.access_token)
      } else {
        throw new Error('token is empty')
      }

      await fetchUser()
      router.push('/messages')
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      const response = await readUsersMeUsersMeGet()

      user.value = response.data
    } catch (error) {
      console.error('Failed to fetch user', error)
      logout()
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('access_token')
    // router.push('/login');
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  }
})
