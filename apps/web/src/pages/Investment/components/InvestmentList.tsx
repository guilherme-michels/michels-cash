import React, { useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { InvestmentCard } from './InvestmentCard'
import { InvestmentFormModal } from './InvestmentFormModal'

interface Investment {
  id: string
  name: string
  details: string
}

interface InvestmentListProps {
  title: string
  investments: Investment[]
}

export function InvestmentList({ title, investments }: InvestmentListProps) {
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<
    string | null
  >(null)

  return (
    <div className="w-full pt-2">
      <h2 className="mb-2 px-4 text-xl font-bold">{title}</h2>

      <div className="relative">
        <Carousel className="flex snap-x snap-mandatory gap-4 overflow-x-auto">
          <CarouselContent className="flex">
            {investments.map((investment, index) => (
              <CarouselItem
                key={index}
                className="w-64 min-w-[300px] flex-none snap-start"
              >
                <InvestmentCard
                  name={investment.name}
                  details={investment.details}
                  onClick={() => setSelectedInvestmentId(investment.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {selectedInvestmentId && (
        <InvestmentFormModal
          investmentId={selectedInvestmentId}
          onClose={() => setSelectedInvestmentId(null)}
          isOpened={!!selectedInvestmentId}
        />
      )}
    </div>
  )
}
