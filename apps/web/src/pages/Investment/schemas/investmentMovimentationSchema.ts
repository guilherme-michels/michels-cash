import { z } from 'zod'

export const investmentMovimentationSchema = z.object({
  amount: z.number(),
  createdAt: z.date(),
})

export type InvestmentMovimentationData = z.infer<
  typeof investmentMovimentationSchema
>
