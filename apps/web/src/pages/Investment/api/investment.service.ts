import { api } from '@/index'

import { InvestmentData } from '../schemas/investmentSchema'

export function getInvestment(investmentId: string): Promise<{
  investment: InvestmentData
}> {
  return api
    .get<{ investment: InvestmentData }>(`/investments/${investmentId}`)
    .then((res) => res.data)
}

export function createInvestment(investment: InvestmentData): Promise<{
  investment: InvestmentData
}> {
  return api
    .post<{ investment: InvestmentData }>('/investments', investment)
    .then((res) => res.data)
}

export function getInvestmentsSummary(): Promise<{
  totalInvestment: number
  investmentGroups: {
    id: string
    name: string
    totalAmount: number
    percentage: number
  }[]
}> {
  return api
    .get<{
      totalInvestment: number
      investmentGroups: {
        id: string
        name: string
        totalAmount: number
        percentage: number
      }[]
    }>('/investments/summary')
    .then((res) => res.data)
}

export function getInvestmentsByGroupId(groupId: string): Promise<{
  investments: InvestmentData[]
}> {
  return api
    .get<{
      investments: InvestmentData[]
    }>(`/investments/group/${groupId}`)
    .then((res) => res.data)
}
