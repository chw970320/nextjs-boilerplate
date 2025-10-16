// src/lib/axios.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add the auth token to headers and start loading
axiosInstance.interceptors.request.use(
  (config) => {
    // Get accessToken from auth store instead of localStorage
    if (typeof window !== 'undefined') {
      // Dynamically import to avoid SSR issues
      import('@/store').then(({ useAuthStore }) => {
        const accessToken = useAuthStore.getState().accessToken
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
      })
    }

    // Start loading for this request
    // Use the final URL (baseURL + url or absolute URL)
    const finalUrl =
      config.url && !config.url.startsWith('http')
        ? `${config.baseURL || ''}${config.url}`
        : config.url || ''
    const requestId = `${config.method?.toUpperCase()}_${finalUrl}`

    if (typeof window !== 'undefined') {
      // Dynamically import to avoid SSR issues
      import('@/store').then(({ useLoadingStore }) => {
        useLoadingStore.getState().startLoading(requestId)
      })
    }

    return config
  },
  (error) => {
    // Stop loading on request error
    if (typeof window !== 'undefined') {
      import('@/store').then(({ useLoadingStore }) => {
        useLoadingStore.getState().stopLoading()
      })
    }
    return Promise.reject(error)
  },
)

// Response interceptor to stop loading
axiosInstance.interceptors.response.use(
  (response) => {
    // Stop loading for this request
    const config = response.config
    const finalUrl =
      config.url && !config.url.startsWith('http')
        ? `${config.baseURL || ''}${config.url}`
        : config.url || ''
    const requestId = `${config.method?.toUpperCase()}_${finalUrl}`

    if (typeof window !== 'undefined') {
      import('@/store').then(({ useLoadingStore }) => {
        useLoadingStore.getState().stopLoading(requestId)
      })
    }
    return response
  },
  (error) => {
    // Stop loading on response error
    if (error.config && typeof window !== 'undefined') {
      const config = error.config
      const finalUrl =
        config.url && !config.url.startsWith('http')
          ? `${config.baseURL || ''}${config.url}`
          : config.url || ''
      const requestId = `${config.method?.toUpperCase()}_${finalUrl}`

      import('@/store').then(({ useLoadingStore }) => {
        useLoadingStore.getState().stopLoading(requestId)
      })
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
