import { useSearchParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'

interface MovimentationDateBadgeProps {
  days: number
  selected: boolean
  onClick: (days: number) => void
}

function MovimentationDateBadge({
  days,
  selected,
  onClick,
}: MovimentationDateBadgeProps) {
  return (
    <Badge
      className={`w-fit cursor-pointer border-[1px] ${
        selected
          ? 'bg-emerald-600 text-white'
          : 'border-emerald-700 bg-transparent text-emerald-600 hover:bg-emerald-100'
      }`}
      onClick={() => onClick(days)}
    >
      {days} D
    </Badge>
  )
}

export function InvestmentDetailsMovimentationDate() {
  const daysArray = [7, 15, 30, 60, 90]
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedDays = searchParams.get('rangeDays') || '7'

  const handleBadgeClick = (days: number) => {
    setSearchParams({ rangeDays: days.toString() })
  }

  return (
    <div className="flex items-center gap-2">
      {daysArray.map((days) => (
        <MovimentationDateBadge
          key={days}
          days={days}
          selected={selectedDays === days.toString()}
          onClick={handleBadgeClick}
        />
      ))}
    </div>
  )
}
