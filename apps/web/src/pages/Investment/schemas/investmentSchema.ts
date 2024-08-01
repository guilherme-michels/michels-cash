import { z } from 'zod'

export const investmentSchema = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ownerId: z.string().uuid(),
  investmentPlanId: z.string().uuid(),
})

export type InvestmentData = z.infer<typeof investmentSchema>
