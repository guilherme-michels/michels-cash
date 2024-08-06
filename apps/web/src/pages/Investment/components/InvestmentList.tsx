import { useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { InvestmentCard } from './InvestmentCard'
import { InvestmentFormModal } from './InvestmentFormModal/InvestmentFormModal'

interface InvestmentPlansSummary {
  id: string
  name: string
  description: string
  riskLevel: string
  minimumInvestmentAmount: number
  liquidity: string
  maturityDate: Date
}

interface InvestmentListProps {
  title: string
  investmentPlans: InvestmentPlansSummary[]
}

export function InvestmentList({
  title,
  investmentPlans,
}: InvestmentListProps) {
  const [selectedInvestmentPlanId, setSelectedInvestmentPlanId] = useState<
    string | null
  >(null)

  return (
    <div className="w-full pb-4 pt-2">
      <h2 className="mb-2 px-4 text-xl font-bold">{title}</h2>

      <div className="relative">
        <Carousel className="flex snap-x snap-mandatory gap-4 overflow-x-auto">
          <CarouselContent className="flex">
            {investmentPlans.map((investmentPlan, index) => (
              <CarouselItem
                key={index}
                className="w-64 min-w-[400px] flex-none snap-start"
              >
                <InvestmentCard
                  investmentPlan={investmentPlan}
                  onClick={() => setSelectedInvestmentPlanId(investmentPlan.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {selectedInvestmentPlanId && (
        <InvestmentFormModal
          investmentPlanId={selectedInvestmentPlanId}
          onClose={() => setSelectedInvestmentPlanId(null)}
          isOpened={!!selectedInvestmentPlanId}
        />
      )}
    </div>
  )
}
