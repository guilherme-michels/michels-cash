import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' }),
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Insira um email válido'),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(6, 'A senha deve conter pelo menos 6 caractéres'),
})

export type SignUpData = z.infer<typeof signUpSchema>
