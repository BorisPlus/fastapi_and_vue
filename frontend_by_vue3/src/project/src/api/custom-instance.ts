import Axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { useAuthStore } from '../stores/auth'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8100',
})

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export const customInstance = async <T>(url: string, config: any): Promise<T> => {
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: config.method || 'GET',
    headers: config.headers,
    // Магия совместимости: Axios использует 'data', а сгенерированный код может передать 'body'
    data: config.body !== undefined ? config.body : config.data,
  }
  const response = await AXIOS_INSTANCE(axiosConfig)
  console.log(response)
  return {
    data: response.data,
    status: response.status,
    headers: response.headers,
  } as T
}
