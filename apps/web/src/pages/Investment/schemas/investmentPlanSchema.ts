import { z } from 'zod'

export const investmentPlanSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  interestRate: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  investmentGroupId: z.string().uuid(),
})

export type InvestmentPlanData = z.infer<typeof investmentPlanSchema>
