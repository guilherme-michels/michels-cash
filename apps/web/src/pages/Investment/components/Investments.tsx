import { useEffect, useState } from 'react'

import { getInvestmentGroups } from '../api/investmentGroup.service'
import { InvestmentGroupData } from '../schemas/investmentGroupSchema'
import { InvestmentPlanData } from '../schemas/investmentPlanSchema'
import { InvestmentList } from './InvestmentList'
export function Investments() {
  const [investmentGroups, setInvestmentGroups] = useState<
    InvestmentGroupData[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInvestmentGroups()
      .then((data) => {
        setInvestmentGroups(data.investmentGroups)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao buscar grupos de investimento:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex max-h-[70vh] flex-col gap-8 overflow-y-auto overflow-x-hidden">
      {investmentGroups.map((group) => (
        <InvestmentList
          key={group.id}
          title={group.name}
          investments={
            group.investmentPlans?.map((plan: InvestmentPlanData) => ({
              name: plan.name,
              details: plan.description,
              id: plan.id || '',
            })) || []
          }
        />
      ))}
    </div>
  )
}
