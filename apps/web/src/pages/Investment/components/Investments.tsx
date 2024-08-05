import { formatDate } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getInvestmentGroups } from '../api/investmentGroup.service'
import { InvestmentGroupData } from '../schemas/investmentGroupSchema'
import { InvestmentPlanData } from '../schemas/investmentPlanSchema'
import { InvestmentList } from './InvestmentList'

export function Investments() {
  const [investmentGroups, setInvestmentGroups] = useState<
    InvestmentGroupData[]
  >([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setLoading(true)

    const typeFilter = (searchParams.get('type') || undefined) as
      | string
      | undefined

    const riskFilter = searchParams.getAll('risk') as string[]

    getInvestmentGroups({
      type: typeFilter,
      risk: riskFilter.length > 0 ? riskFilter : undefined,
    })
      .then((data) => {
        setInvestmentGroups(data.investmentGroups)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao buscar grupos de investimento:', error)
        setLoading(false)
      })
  }, [searchParams])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex max-h-[70vh] flex-col gap-8 overflow-y-auto overflow-x-hidden">
      {investmentGroups.map((group) => (
        <InvestmentList
          key={group.id}
          title={group.name}
          investmentPlans={
            group.investmentPlans?.map((plan: InvestmentPlanData) => ({
              liquidity: formatDate(plan.liquidity, 'dd/MM/yyyy'),
              minimumInvestmentAmount: plan.minimumInvestmentAmount!,
              riskLevel: plan.riskLevel,
              name: plan.name,
              description: plan.description,
              id: plan.id || '',
            })) || []
          }
        />
      ))}
    </div>
  )
}
