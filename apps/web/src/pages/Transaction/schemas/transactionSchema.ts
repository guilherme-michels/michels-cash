import { z } from 'zod'

export const transactionSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type TransactionData = z.infer<typeof transactionSchema>
