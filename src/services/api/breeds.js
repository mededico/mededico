import api from './client'

export const getBreeds = async () => {
  try {
    const { data } = await api.get('/breeds', { requiresAuth: true })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getSpecies = async () => {
  try {
    const { data } = await api.get('/species', { requiresAuth: true })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
