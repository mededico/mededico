import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('El correo electrónico es obligatorio.')
    .email({ message: 'El formato del correo electrónico no es válido.' }),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria.')
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
})
