import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getInvestmentsSummary } from '@/pages/Investment/api/investment.service'

import { InvestmentDetailsCard } from './components/InvestmentDetailsCard'
import { InvestmentTypesTotalizerCard } from './components/InvestmentTypesTotalizerCard'

interface InvestmentGroup {
  id: string
  name: string
  totalAmount: number
  percentage: number
}

interface SelectedInvestmentGroup {
  id: string
  name: string
}

export function Investment() {
  const [investmentGroupSelected, setInvestmentGroupSelected] =
    useState<SelectedInvestmentGroup | null>(null)
  const [totalInvestment, setTotalInvestment] = useState<number>(0)
  const [investmentGroups, setInvestmentGroups] = useState<InvestmentGroup[]>(
    []
  )

  const { data: investmentSummaryData, isLoading } = useQuery({
    queryKey: ['investmentSummary'],
    queryFn: () => getInvestmentsSummary(),
  })

  useEffect(() => {
    if (investmentSummaryData) {
      setTotalInvestment(investmentSummaryData.totalInvestment)
      setInvestmentGroups(investmentSummaryData.investmentGroups)

      if (investmentSummaryData.investmentGroups.length === 0) {
        setInvestmentGroupSelected(null)
        return
      }

      const firstGroup = investmentSummaryData.investmentGroups[0]
      setInvestmentGroupSelected({ id: firstGroup.id, name: firstGroup.name })
    }
  }, [investmentSummaryData])

  return (
    <div className="grid-cols3 grid size-full gap-4 xl:grid-cols-5">
      <InvestmentTypesTotalizerCard
        isLoading={isLoading}
        totalInvestment={totalInvestment}
        investmentGroups={investmentGroups}
        onSelectInvestmentType={(value) => {
          setInvestmentGroupSelected({
            id: value.id,
            name: value.name,
          })
        }}
      />

      <InvestmentDetailsCard group={investmentGroupSelected} />
    </div>
  )
}
