import { z } from 'zod'

export const appointmentSchema = z.object({
  mascota_id: z.preprocess((val) => (val === '' ? undefined : val),
    z.string({
      required_error: 'El ID de la mascota es obligatorio',
      invalid_type_error: 'El ID de la mascota debe ser un UUID válido'
    })
      .uuid('El ID de la mascota debe ser un UUID válido')
      .trim()),

  servicio_id: z.preprocess((val) => {
    if (val === '') return undefined
    const n = Number(val)
    return Number.isNaN(n) ? val : n
  }, z.number({
    required_error: 'El ID del servicio es obligatorio',
    invalid_type_error: 'El ID del servicio debe ser un número'
  }).int('El ID del servicio debe ser un número entero')),

  status: z.string()
    .trim()
    .max(20, 'El estado no debe exceder los 20 caracteres')
    .default('Programada'),

  fecha: z.preprocess((val) => (val === '' ? undefined : val), z.string({
    required_error: 'La fecha de la cita es obligatoria',
    invalid_type_error: 'La fecha de la cita debe ser una cadena de texto válida'
  })
    .trim()
    .refine(val => {
      return /^\d{4}-\d{2}-\d{2}$/.test(val)
    }, {
      message: 'La fecha debe tener el formato YYYY-MM-DD'
    })),

  hora_inicio: z.preprocess((val) => (val === '' ? undefined : val), z.string({
    required_error: 'La hora de la cita es obligatoria',
    invalid_type_error: 'La hora de la cita debe ser una cadena de texto válida'
  })
    .trim()
    .refine(val => {
      return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(val)
    }, {
      message: 'La hora debe tener el formato HH:MM o HH:MM:SS'
    })),

  motivo_consulta: z.string()
    .trim()
    .default('')
})
