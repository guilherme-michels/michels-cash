import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caractéres'),
})

export type SignInData = z.infer<typeof signInSchema>
