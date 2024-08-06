import { z } from 'zod'

import { investmentGroupPlaceholderSchema } from '../investment-groups/_investment-group.schema'

export const InvestmentRiskLevel = z.enum(['LOW', 'MEDIUM', 'HIGH'])

export const investmentPlanSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  interestRate: z.number(),
  minimumInvestmentAmount: z.number().optional(),
  maximumInvestmentAmount: z.number().optional(),
  duration: z.number().int(),
  riskLevel: InvestmentRiskLevel,
  liquidity: z.date(),
  penaltyForEarlyWithdrawal: z.number().nonnegative().optional(),
  currency: z.string(),
  maturityDate: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  investmentGroupId: z.string().uuid(),
  investmentGroup: z.lazy(() => investmentGroupPlaceholderSchema).optional(),
})

export type InvestmentPlanData = z.infer<typeof investmentPlanSchema>
