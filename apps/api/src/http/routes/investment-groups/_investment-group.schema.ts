import { z } from 'zod'

import { investmentPlanSchema } from '../investment-plans/_investment-plan.schema'

export const investmentTypeEnum = z.enum([
  'FIXED_INCOME',
  'REAL_ESTATE_FUND',
  'STOCKS',
  'MUTUAL_FUNDS',
])

export const investmentGroupPlaceholderSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: investmentTypeEnum,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  investmentPlans: z.array(z.any()).optional(),
})

export type InvestmentGroupPlaceholderData = z.infer<
  typeof investmentGroupPlaceholderSchema
>

export const investmentGroupSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: investmentTypeEnum,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  investmentPlans: z.array(z.lazy(() => investmentPlanSchema)).optional(),
})

export type InvestmentGroupData = z.infer<typeof investmentGroupSchema>
