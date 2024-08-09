import { z } from 'zod'

const transactionTypeEnum = z.enum(['deposit', 'withdrawal', 'transfer'])

export const transactionSchema = z.object({
  id: z.string().uuid().optional(),
  amount: z.number().positive(),
  type: transactionTypeEnum,
  currency: z.string().length(3),
  description: z.string(),
  createdAt: z.date().optional(),
  senderId: z.string().uuid(),
  recipientId: z.string().uuid().nullable(),
})

export type TransactionData = z.infer<typeof transactionSchema>
