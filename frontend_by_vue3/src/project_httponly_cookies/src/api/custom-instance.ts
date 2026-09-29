import Axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8100',
  withCredentials: true,
})

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
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
