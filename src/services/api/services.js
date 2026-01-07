import api from './client'

export const getServices = async () => {
  try {
    const response = await api.get('/services/active/true')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
