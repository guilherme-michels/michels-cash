import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { formatBRL } from '@/lib/utils'
import { InvestmentData } from '@/pages/Investment/schemas/investmentSchema'

interface InvestmentDetailsItemProps {
  investment: InvestmentData
}

export function InvestmentDetailsItem({
  investment,
}: InvestmentDetailsItemProps) {
  return (
    <AccordionItem value={investment.id!}>
      <AccordionTrigger className="rounded bg-zinc-100 px-4 transition-all hover:bg-zinc-200">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded bg-[#0088FE]" />
          {investment.investmentPlan.name} - {formatBRL(investment.amount)}
        </div>
      </AccordionTrigger>
      <AccordionContent className="h-40"></AccordionContent>
    </AccordionItem>
  )
}
