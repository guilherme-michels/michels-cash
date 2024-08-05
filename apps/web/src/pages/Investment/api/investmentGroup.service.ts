import { api } from '@/index'

import { InvestmentGroupData } from '../schemas/investmentGroupSchema'

export function getInvestmentGroups({
  type: typeFilter,
  risk: riskFilter,
}: {
  type?: string
  risk?: string[]
}): Promise<{
  investmentGroups: InvestmentGroupData[]
}> {
  const params = new URLSearchParams()

  if (typeFilter) {
    params.append('type', typeFilter)
  }

  if (riskFilter && riskFilter.length > 0) {
    riskFilter.forEach((risk) => params.append('risk', risk))
  }

  return api
    .get<{
      investmentGroups: InvestmentGroupData[]
    }>(`/investment-groups?${params.toString()}`)
    .then((res) => res.data)
}
