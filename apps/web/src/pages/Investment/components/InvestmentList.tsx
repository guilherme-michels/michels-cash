import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { InvestmentCard } from './InvestmentCard'

interface Investment {
  name: string
  details: string
}

interface InvestmentListProps {
  title: string
  investments: Investment[]
}

export function InvestmentList({ title, investments }: InvestmentListProps) {
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
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
