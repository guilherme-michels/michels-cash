import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  color: string
  investmentPlans: InvestmentPlansSummary[]
}

export function InvestmentList({
  title,
  color,
  investmentPlans,
}: InvestmentListProps) {
  const [selectedInvestmentPlanId, setSelectedInvestmentPlanId] = useState<
    string | null
  >(null)

  return (
    <div className="w-full pb-4 pt-2">
      <h2 className="mb-2 flex items-center gap-2 px-4 text-xl font-bold">
        <div
          className="size-3 rounded"
          style={{ backgroundColor: color || '#047857' }}
        />
        {title}
      </h2>
      <div className="relative">
        {investmentPlans.length > 0 ? (
          <Carousel className="flex snap-x snap-mandatory gap-4 overflow-x-auto">
            <CarouselContent className="flex">
              {investmentPlans.map((investmentPlan, index) => (
                <CarouselItem
                  key={index}
                  className="w-64 min-w-[400px] flex-none snap-start"
                >
                  <InvestmentCard
                    investmentPlan={investmentPlan}
                    onClick={() =>
                      setSelectedInvestmentPlanId(investmentPlan.id)
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <Card className="h-full flex-1 cursor-default transition-colors hover:bg-zinc-50">
            <CardHeader className="mb-3 border-b-[1px] border-zinc-200 pb-4">
              <CardTitle className="!text-lg">
                Nenhum plano disponível para {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Atualmente, não há planos de investimento disponíveis. Volte
                  mais tarde.
                </span>
              </div>
            </CardContent>
          </Card>
        )}
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
