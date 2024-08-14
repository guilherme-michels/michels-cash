import { api } from '@/index'

import { InvestmentGroupData } from '../schemas/investmentGroupSchema'

export function getInvestmentGroups({
  type: typeFilter,
  risk: riskFilter,
  search: stringFilter,
}: {
  type?: string
  risk?: string[]
  search?: string
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

  if (stringFilter) {
    params.append('search', stringFilter)
  }

  return api
    .get<{
      investmentGroups: InvestmentGroupData[]
    }>(`/investment-groups?${params.toString()}`)
    .then((res) => res.data)
}
