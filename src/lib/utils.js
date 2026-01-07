import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const isEmailDuplicateError = (error) => {
  return error.response?.status === 409 && error.response?.data?.message === 'Email already registered'
}

export const getRegisterErrorMessage = (error) => {
  if (!error.response) {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.'
  }

  const status = error.response.status
  const apiMessage = error.response.data?.message
  const apiError = error.response.data?.error

  if (status === 422 && apiError) {
    const validationErrors = Object.values(apiError).flat()
    return validationErrors.join('. ')
  }

  const errorMap = {
    409: {
      'Email already registered':
        'Ya existe una cuenta registrada con este correo electrónico. ¿Quieres iniciar sesión?'
    },
    422: {
      default: 'Los datos ingresados no son válidos. Por favor, revisa la información.'
    },
    500: {
      'Internal server error': 'Error interno del servidor. Por favor, inténtalo más tarde.'
    }
  }

  const statusErrors = errorMap[status]
  if (statusErrors && statusErrors[apiMessage]) {
    return statusErrors[apiMessage]
  }

  switch (status) {
  case 409:
    return 'Ya existe una cuenta con este correo electrónico.'
  case 422:
    return 'Los datos ingresados no son válidos. Por favor, revisa la información.'
  case 500:
    return 'Error interno del servidor. Por favor, inténtalo más tarde.'
  case 429:
    return 'Demasiados intentos de registro. Espera unos minutos.'
  default:
    return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
  }
}

export const getLoginErrorMessage = (error) => {
  if (!error.response) {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.'
  }

  const status = error.response.status
  const apiMessage = error.response.data?.message

  const errorMap = {
    404: {
      'Email not found': 'No existe una cuenta asociada a este correo electrónico.'
    },
    401: {
      'Invalid password': 'La contraseña ingresada es incorrecta.',
      'User is not active': 'Tu cuenta está inactiva. Contacta al administrador para reactivarla.'
    },
    500: {
      'Internal server error': 'Error interno del servidor. Por favor, inténtalo más tarde.'
    }
  }

  const statusErrors = errorMap[status]
  if (statusErrors && statusErrors[apiMessage]) {
    return statusErrors[apiMessage]
  }

  switch (status) {
  case 404:
    return 'No se encontró una cuenta con ese correo electrónico.'
  case 401:
    return 'Credenciales inválidas. Verifica tu correo y contraseña.'
  case 500:
    return 'Error interno del servidor. Por favor, inténtalo más tarde.'
  case 429:
    return 'Demasiados intentos de inicio de sesión. Espera unos minutos.'
  default:
    return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
  }
}

export const filterServicesByCategory = (services, category) =>
  services.filter((service) =>
    category === 'Veterinaria' ? service.categoria_id === 1 : service.categoria_id === 2
  )

export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const sortAppointments = (appointments) => {
  return appointments.sort((a, b) => {
    const activeStatuses = ['Programada', 'Reprogramada', 'En Curso']

    const aIsActive = activeStatuses.includes(a.status)
    const bIsActive = activeStatuses.includes(b.status)

    if (aIsActive && !bIsActive) return -1
    if (!aIsActive && bIsActive) return 1

    const getDateTime = (appointment) => {
      const [year, month, day] = appointment.fecha.split('-').map(Number)
      const [hours, minutes] = appointment.hora_inicio.split(':').map(Number)
      return new Date(year, month - 1, day, hours, minutes)
    }

    const dateTimeA = getDateTime(a)
    const dateTimeB = getDateTime(b)

    if (aIsActive && bIsActive) {
      return dateTimeA - dateTimeB
    }

    return dateTimeB - dateTimeA
  })
}

export const groupAppointmentsByStatus = (appointments) => {
  const pendingStatuses = ['Programada', 'En Curso', 'Reprogramada']
  const pending = appointments.filter((appointment) =>
    pendingStatuses.includes(appointment.status)
  )
  const history = appointments.filter(
    (appointment) => !pendingStatuses.includes(appointment.status)
  )

  return { pending, history }
}

export const getCurrentDateInCDMX = () => {
  const now = new Date()
  const cdmxDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
  const year = cdmxDate.getFullYear()
  const month = String(cdmxDate.getMonth() + 1).padStart(2, '0')
  const day = String(cdmxDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const getClinicHours = (date) => {
  const dayOfWeek = new Date(date + 'T00:00:00').getDay()

  switch (dayOfWeek) {
  case 0:
    return { start: '10:00', end: '17:00' }
  case 6:
    return { start: '08:00', end: '15:00' }
  default:
    return { start: '07:00', end: '20:00' }
  }
}

export const generateTimeSlots = (date, duration) => {
  if (!date || !duration) return []
  const { start, end } = getClinicHours(date)
  const slots = []
  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)
  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin

  const currentDateCDMX = getCurrentDateInCDMX()
  const isToday = date === currentDateCDMX

  let minimumStartTime = startMinutes

  if (isToday) {
    const now = new Date()
    const currentHourCDMX = now.getHours()
    const currentMinutesCDMX = now.getMinutes()

    const roundedHour = currentMinutesCDMX < 30 ? currentHourCDMX : currentHourCDMX + 1
    const minimumHourWithBuffer = roundedHour + 2
    const minimumTimeWithBuffer = minimumHourWithBuffer * 60 // convertir a minutos

    minimumStartTime = Math.max(startMinutes, minimumTimeWithBuffer)
  }

  for (let minutes = minimumStartTime; minutes < endMinutes; minutes += duration) {
    const hour = Math.floor(minutes / 60)
    const min = minutes % 60

    if (minutes >= startMinutes) {
      const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
      slots.push(timeString)
    }
  }
  return slots
}

export const sortServicesByCategory = (services) => {
  return [...services].sort((a, b) => {
    return a.categoria_id - b.categoria_id
  })
}
