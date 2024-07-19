import { z } from 'zod'

export const investmentPlanSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.literal('InvestmentPlan'),
])

export type InvestmentPlanSubject = z.infer<typeof investmentPlanSubject>
