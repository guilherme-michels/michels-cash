import { z } from 'zod'

import { investmentPlanSchema } from './investmentPlanSchema'

export const investmentSchema = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ownerId: z.string().uuid(),
  investmentPlanId: z.string().uuid(),
  investmentPlan: investmentPlanSchema,
})

export type InvestmentData = z.infer<typeof investmentSchema>
