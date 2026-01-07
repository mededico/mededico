import api from './client'

export const login = async ({ input }) => {
  try {
    const { data } = await api.post('/auth/login', input)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const register = async ({ input }) => {
  try {
    const { data } = await api.post('/auth/register', input)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const refreshToken = async ({ refreshToken }) => {
  try {
    const { data } = await api.post('/auth/refresh', { refreshToken })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const logout = async ({ refreshToken }) => {
  try {
    const { data } = await api.post('/auth/logout', { refreshToken }, { requiresAuth: true })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
