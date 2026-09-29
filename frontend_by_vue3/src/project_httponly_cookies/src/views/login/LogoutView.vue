<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
const authStore = useAuthStore()
authStore.logout()
</script>

<template></template>
