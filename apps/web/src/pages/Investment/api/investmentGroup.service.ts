import { api } from '@/index'

import { InvestmentGroupData } from '../schemas/investmentGroupSchema'

export function getInvestmentGroups(): Promise<{
  investmentGroups: InvestmentGroupData[]
}> {
  return api
    .get<{ investmentGroups: any[] }>('/investment-groups')
    .then((res) => res.data)
}
