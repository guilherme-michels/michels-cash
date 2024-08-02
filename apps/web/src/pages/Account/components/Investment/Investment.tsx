import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getInvestmentsSummary } from '@/pages/Investment/api/investment.service'

import { InvestmentDetailsCard } from './components/InvestmentDetailsCard'
import { InvestmentTypesTotalizerCard } from './components/InvestmentTypesTotalizerCard'

interface InvestmentGroup {
  groupName: string
  totalAmount: number
  percentage: number
}

export function Investment() {
  const [investmentTypeSelected, setInvestmentTypeSelected] = useState<
    null | string
  >(null)
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
    }
  }, [investmentSummaryData])

  return (
    <div className="grid-cols3 grid size-full gap-4 xl:grid-cols-5">
      <InvestmentTypesTotalizerCard
        isLoading={isLoading}
        totalInvestment={totalInvestment}
        investmentGroups={investmentGroups}
        onSelectInvestmentType={(value) => setInvestmentTypeSelected(value)}
      />

      {investmentTypeSelected && (
        <InvestmentDetailsCard name={investmentTypeSelected} />
      )}
    </div>
  )
}
