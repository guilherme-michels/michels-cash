import { z } from 'zod'

import { investmentPlanSchema } from './investmentPlanSchema'

export const investmentTypeEnum = z.enum([
  'FIXED_INCOME',
  'REAL_ESTATE_FUND',
  'STOCKS',
  'MUTUAL_FUNDS',
])

export const investmentGroupSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: investmentTypeEnum,
  investmentPlans: z.array(investmentPlanSchema).nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type InvestmentGroupData = z.infer<typeof investmentGroupSchema>
