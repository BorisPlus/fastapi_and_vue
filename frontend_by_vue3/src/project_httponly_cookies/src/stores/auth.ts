import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { readUsersMeUsersMeGet, loginLoginPost, logoutLogoutPost } from '@/api/generated/api'
import type { BodyLoginLoginPost, User } from '@/api/generated/models'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const user = ref<any>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (username: string, password: string) => {
    try {
      const payload: BodyLoginLoginPost = {
        username,
        password,
        grant_type: 'password',
      }
      const response = await loginLoginPost(payload)
      const responseUser = response.data as unknown as User
      if (responseUser.username) {
        user.value = responseUser.username
      } else {
        throw new Error('user is empty')
      }
      router.push('/messages')
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  }

  const fetchUser = async () => {
    if (!user.value) return
    try {
      const response = await readUsersMeUsersMeGet()
      user.value = response.data
    } catch (error) {
      console.error('Failed to fetch user', error)
      logout()
    }
  }

  const logout = async () => {
    try {
      const _ = await logoutLogoutPost()
    } catch (error) {
    } finally {
      user.value = null
      router.push('/')
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  }
})
