<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const username = ref('admin')
const password = ref('secret')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  try {
    await authStore.login(username.value, password.value)
  } catch (e) {
    error.value = 'Error login/password'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Sign in</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Login" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Sign in...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>
