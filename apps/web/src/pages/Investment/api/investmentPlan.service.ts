import { api } from '@/index'

import { InvestmentPlanData } from '../schemas/investmentPlanSchema'

export function createInvestmentPlan(data: InvestmentPlanData): Promise<{
  investmentPlan: InvestmentPlanData
}> {
  return api
    .post<{ investmentPlan: InvestmentPlanData }>('/investment-plans', data)
    .then((res) => res.data)
}

export function getInvestmentPlan(investmentPlanId: string): Promise<{
  investmentPlan: InvestmentPlanData
}> {
  return api
    .get<{
      investmentPlan: InvestmentPlanData
    }>(`/investment-plans/${investmentPlanId}`)
    .then((res) => res.data)
}
