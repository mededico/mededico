import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Accept': 'application/json'
  }
})

let isRefreshing = false
let refreshQueue = []

const processQueue = (error, newToken = null) => {
  refreshQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(newToken)
  })
  refreshQueue = []
}

// === Request interceptor: añade accessToken si existe ===
api.interceptors.request.use((config) => {
  if (API_KEY) {
    config.headers['x-api-key'] = API_KEY
  }

  if (config.requiresAuth) {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  delete config.requiresAuth
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true
      const refreshToken = Cookies.get('refreshToken')
      if (!refreshToken) {
        isRefreshing = false
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken })
        const { accessToken, refreshToken: newRefreshToken } = data

        // Extraer userData del nuevo access token
        const payload = JSON.parse(atob(accessToken.split('.')[1]))
        const userData = {
          id: payload.id,
          email: payload.email,
          nombre: payload.nombre,
          apellido: payload.apellido
        }

        const accessExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hora
        Cookies.set('accessToken', accessToken, { expires: accessExpires, secure: true, sameSite: 'strict' })
        Cookies.set('userData', JSON.stringify(userData), { expires: accessExpires, secure: true, sameSite: 'strict' })
        const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        Cookies.set('refreshToken', newRefreshToken, { expires: refreshExpires, secure: true, sameSite: 'strict' })

        processQueue(null, accessToken)
        isRefreshing = false

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        isRefreshing = false
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userData')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
