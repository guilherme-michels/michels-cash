import { z } from 'zod'

export const depositSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type DepositData = z.infer<typeof depositSchema>
