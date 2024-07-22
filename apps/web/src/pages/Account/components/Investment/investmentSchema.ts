import { z } from 'zod'

export const investmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type InvestmentData = z.infer<typeof investmentSchema>
