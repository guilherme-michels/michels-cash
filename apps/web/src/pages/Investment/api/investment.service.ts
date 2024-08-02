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
    groupName: string
    totalAmount: number
    percentage: number
  }[]
}> {
  return api
    .get<{
      totalInvestment: number
      investmentGroups: {
        groupName: string
        totalAmount: number
        percentage: number
      }[]
    }>('/investments/summary')
    .then((res) => res.data)
}
