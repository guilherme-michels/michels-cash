import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <Carousel className="flex gap-4">
        <CarouselContent>
          {investments.map((investment, index) => (
            <CarouselItem key={index} className="md:basis-1/3 xl:basis-1/5">
              <InvestmentCard
                name={investment.name}
                details={investment.details}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
