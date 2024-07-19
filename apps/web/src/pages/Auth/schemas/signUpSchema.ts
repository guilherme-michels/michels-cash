import { z } from 'zod'

export const signUpSchema = z.object({})

export type BranchData = z.infer<typeof signUpSchema>
