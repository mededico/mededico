import { z } from 'zod'

export const petSchema = z.object({
  nombre: z
    .string()
    .nonempty('El nombre es obligatorio.')
    .max(100, 'El nombre no debe exceder los 100 caracteres.')
    .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'El nombre solo debe contener letras y espacios')
    .trim(),

  especie_id: z
    .number({
      required_error: 'El ID de la especie es obligatorio',
      invalid_type_error: 'El ID de la especie debe ser un número'
    }),

  raza_id: z
    .number({
      required_error: 'El ID de la raza es obligatorio',
      invalid_type_error: 'El ID de la raza debe ser un número'
    }),

  edad: z
    .number({
      required_error: 'La edad es obligatoria',
      invalid_type_error: 'La edad debe ser un número'
    })
    .int('La edad debe ser un número entero')
    .positive('La edad debe ser mayor a 0')
    .max(30, 'La edad debe ser menor a 30 años'),

  sexo: z
    .string()
    .nonempty('El sexo es obligatorio')
    .refine(val => ['M', 'H'].includes(val), {
      message: 'El sexo debe ser M (Macho) o H (Hembra)'
    })
})
