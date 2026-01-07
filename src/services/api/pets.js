import api from './client'
import Cookies from 'js-cookie'

export const getPets = async () => {
  const userDataCookie = Cookies.get('userData')
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null
  const clienteId = userData?.id

  try {
    const config = {
      params: { clienteId },
      requiresAuth: true
    }
    const { data } = await api.get('/pets/detail', config)
    return data
  } catch (error) {
    console.error('Error getting pets:', error)
    throw error
  }
}

export const addPet = async (petData) => {
  const userDataCookie = Cookies.get('userData')
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null
  const clienteId = userData?.id

  if (!clienteId) {
    const error = new Error('No se pudo obtener el ID del cliente')
    console.error('Error adding pet:', error)
    throw error
  }

  const requestBody = {
    cliente_id: clienteId,
    ...petData
  }

  try {
    const config = {
      requiresAuth: true
    }
    const { data } = await api.post('/pets', requestBody, config)
    return { data: data }
  } catch (error) {
    console.error('Error adding pet:', error)
    throw error
  }
}

export const uploadPetImage = async (petId, imageFile) => {
  if (!petId || !imageFile) {
    const error = new Error('Se requiere ID de mascota y archivo de imagen')
    console.error('Error uploading pet image:', error)
    throw error
  }

  try {
    const formData = new FormData()
    formData.append('imagen', imageFile)

    const config = {
      requiresAuth: true,
      headers: {}
    }

    const { data } = await api.post(`/pets/${petId}/imagen`, formData, config)
    return data
  } catch (error) {
    console.error('Error uploading pet image:', error)
    throw error
  }
}

export const updatePet = async (petId, petData) => {
  if (!petId || !petData) {
    const error = new Error('Se requiere ID de mascota y datos de mascota')
    console.error('Error updating pet:', error)
    throw error
  }

  try {
    const config = {
      requiresAuth: true
    }
    const { data } = await api.patch(`/pets/${petId}`, petData, config)
    return data
  } catch (error) {
    console.error('Error updating pet:', error)
    throw error
  }
}

export const deletePet = async (petId) => {
  if (!petId) {
    const error = new Error('Se requiere un ID de mascota válido')
    console.error('Error deleting pet:', error)
    throw error
  }

  try {
    const config = {
      requiresAuth: true
    }
    const { data } = await api.delete(`/pets/${petId}`, config)
    return data
  } catch (error) {
    console.error('Error deleting pet:', error)
    throw error
  }
}
