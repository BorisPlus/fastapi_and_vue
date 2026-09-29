<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <a v-if="authStore.isAuthenticated" class="" href="#" @click="authStore.logout">Logout</a>
  <RouterLink v-else to="/login" class="btn-login">Login</RouterLink>
</template>
