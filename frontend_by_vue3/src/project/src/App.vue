<script setup lang="ts">
import LoginLogout from '@/components/login_logout/LoginLogout.vue'
</script>

<template>
  <link rel="stylesheet" href="/styles.css" />
  <h1>Vue3 application with JWT in HTTP-Header</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
    <RouterLink to="/items">Items</RouterLink>
    <RouterLink to="/messages">Messages (for auth only)</RouterLink>
    <LoginLogout />
  </nav>
  <div class="content">
    <aside>
      <router-view name="sidebar" />
    </aside>
    <main>
      <router-view />
    </main>
  </div>
  <footer>
    <router-view name="footer" />
  </footer>
</template>
