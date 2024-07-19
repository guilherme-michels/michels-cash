import { z } from 'zod'

export const transactionSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.literal('Transaction'),
])

export type TransactionSubject = z.infer<typeof transactionSubject>
