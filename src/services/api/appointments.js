import api from './client'
import Cookies from 'js-cookie'

const getCurrentClientId = () => {
  const userDataCookie = Cookies.get('userData')
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null
  return userData?.id
}

export const createAppointment = async (data) => {
  try {
    const config = {
      requiresAuth: true
    }

    const body = {
      ...data,
      cliente_id: getCurrentClientId()
    }
    const { data: response } = await api.post('/appointments', body, config)
    return response
  } catch (error) {
    console.error('Error creating appointment:', error)
    throw error
  }
}

export const getAppointments = async () => {
  try {
    const clienteId = getCurrentClientId()
    const config = {
      params: { clienteId },
      requiresAuth: true
    }
    const { data } = await api.get('/appointments/detailed', config)
    return data
  } catch (error) {
    console.error('Error getting appointments:', error)
    throw error
  }
}

export const cancelAppointment = async (id) => {
  try {
    const config = {
      requiresAuth: true
    }

    const body = {
      status: 'Cancelada'
    }
    const { data } = await api.patch(`/appointments/${id}`, body, config)
    return data
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    throw error
  }
}

export const getBlockedSlots = async (service_id, date) => {
  try {
    const config = {
      params: { fecha: date },
      requiresAuth: true
    }
    const { data } = await api.get(`/services/${service_id}/blocked-slots`, config)
    return data
  } catch (error) {
    console.error('Error getting blocked slots:', error)
    throw error
  }
}
