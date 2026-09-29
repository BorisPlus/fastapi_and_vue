import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/home/HomeView.vue'
import AboutView from '@/views/about/AboutView.vue'
import ItemsView from '@/views/items/ItemsView.vue'
import DefaultFooter from '@/views/default/DefaultFooter.vue'
import DefaultSidebar from '@/views/default/DefaultSidebar.vue'
import SettingsView from '@/views/settings/SettingsView.vue'
import SettingsSidebar from '@/views/settings/SettingsSidebar.vue'
import SettingsToolbar from '@/views/settings/SettingsFooter.vue'
import MessagesView from '@/views/messages/MessagesView.vue'
import LoginView from '@/views/login/LoginView.vue'

const routes = [
  {
    path: '/',
    components: {
      default: HomeView,
      sidebar: DefaultSidebar,
      footer: DefaultFooter,
    },
  },
  {
    path: '/about',
    components: {
      default: AboutView,
      sidebar: DefaultSidebar,
      footer: DefaultFooter,
    },
  },
  {
    path: '/settings',
    components: {
      default: SettingsView,
      sidebar: SettingsSidebar,
      footer: SettingsToolbar,
    },
  },
  {
    path: '/items',
    components: {
      default: ItemsView,
      sidebar: DefaultSidebar,
      footer: DefaultFooter,
    },
  },
  {
    path: '/messages',
    components: {
      default: MessagesView,
      sidebar: DefaultSidebar,
      footer: DefaultFooter,
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    components: {
      default: LoginView,
      sidebar: DefaultSidebar,
      footer: DefaultFooter,
    },
  },
  {
    path: '/login_logout',
    components: {
      default: LoginView,
      sidebar: DefaultSidebar,
      footer: DefaultFooter,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
  if (to.path === '/login' && authStore.isAuthenticated) {
    return '/messages'
  }
})

export default router
