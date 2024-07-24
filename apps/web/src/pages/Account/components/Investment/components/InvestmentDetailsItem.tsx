import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface InvestmentDetailsItemProps {
  investmentId: string
}

export function InvestmentDetailsItem({
  investmentId,
}: InvestmentDetailsItemProps) {
  return (
    <AccordionItem value={investmentId}>
      <AccordionTrigger className="rounded bg-zinc-100 px-4 transition-all hover:bg-zinc-200">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded bg-[#0088FE]" />
          LCA R$ 2.350,00 (23%)
        </div>
      </AccordionTrigger>
      <AccordionContent className="h-40"></AccordionContent>
    </AccordionItem>
  )
}
