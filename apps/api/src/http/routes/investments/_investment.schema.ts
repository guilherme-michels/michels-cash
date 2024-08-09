import { z } from 'zod'

import { investmentPlanSchema } from '../investment-plans/_investment-plan.schema'

export const investmentSchema = z.object({
  id: z.string().uuid().optional(),
  amount: z.number().positive(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ownerId: z.string().uuid(),
  investmentPlanId: z.string().uuid(),
  investmentPlan: z.lazy(() => investmentPlanSchema).optional(),
})

export type InvestmentData = z.infer<typeof investmentSchema>
