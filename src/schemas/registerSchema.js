import { z } from 'zod'

export const registerSchema = z.object({
  nombre: z
    .string()
    .nonempty('El nombre es obligatorio.')
    .max(100, 'El nombre no debe exceder los 100 caracteres.')
    .trim(),

  apellido: z
    .string()
    .nonempty('El apellido es obligatorio.')
    .max(100, 'El apellido no debe exceder los 100 caracteres.')
    .trim(),

  email: z
    .string()
    .nonempty('El correo electrónico es obligatorio.')
    .email('El formato del correo electrónico no es válido.')
    .max(150, 'El correo electrónico no debe exceder los 150 caracteres.')
    .trim(),

  telefono: z
    .string()
    .max(10, 'El teléfono no debe exceder los 10 caracteres.')
    .regex(/^[0-9]*$/, { message: 'El teléfono solo debe contener números.' })
    .trim()
    .optional()
    .or(z.literal('')), // Permite que el campo sea opcional o una cadena vacía

  password: z
    .string()
    .nonempty('La contraseña es obligatoria.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(100, 'La contraseña no debe exceder los 100 caracteres.')
    .trim(),

  direccion: z
    .string()
    .max(255, 'La dirección no debe exceder los 255 caracteres.')
    .trim()
    .optional()
    .or(z.literal('')) // Permite que el campo sea opcional o una cadena vacía
})
