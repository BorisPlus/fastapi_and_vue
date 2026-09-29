import { createApp } from 'vue'

import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './queryClient.ts'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(VueQueryPlugin, {
  queryClient,
})
app.use(pinia)
app.use(router)

app.mount('#app')
