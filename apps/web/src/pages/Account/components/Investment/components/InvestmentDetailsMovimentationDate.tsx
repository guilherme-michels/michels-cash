import { Badge } from '@/components/ui/badge'

interface MovimentationDateBadgeProps {
  days: number
}

function MovimentationDateBadge({ days }: MovimentationDateBadgeProps) {
  return (
    <Badge className="w-fit cursor-pointer border-[1px] border-emerald-700 bg-transparent text-emerald-600 hover:bg-emerald-100">
      {days} D
    </Badge>
  )
}

export function InvestmentDetailsMovimentationDate() {
  const daysArray = [7, 15, 30, 60, 90]

  return (
    <div className="flex items-center gap-2">
      {daysArray.map((days) => (
        <MovimentationDateBadge key={days} days={days} />
      ))}
    </div>
  )
}
