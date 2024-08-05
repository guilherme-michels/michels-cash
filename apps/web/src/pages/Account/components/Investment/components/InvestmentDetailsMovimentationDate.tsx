import { Badge } from '@/components/ui/badge'

export function InvestmentDetailsMovimentationDate() {
  return (
    <div className="flex items-center gap-2">
      <Badge className="w-fit cursor-pointer border-[1px] border-emerald-700 bg-transparent text-emerald-600 hover:bg-emerald-100">
        7 D
      </Badge>
      <Badge className="w-fit cursor-pointer border-[1px] border-emerald-700 bg-transparent text-emerald-600 hover:bg-emerald-100">
        15 D
      </Badge>
      <Badge className="w-fit cursor-pointer border-[1px] border-emerald-700 bg-transparent text-emerald-600 hover:bg-emerald-100">
        30 D
      </Badge>
      <Badge className="w-fit cursor-pointer border-[1px] border-emerald-700 bg-transparent text-emerald-600 hover:bg-emerald-100">
        60 D
      </Badge>
      <Badge className="w-fit cursor-pointer border-[1px] border-emerald-700 bg-transparent text-emerald-600 hover:bg-emerald-100">
        90 D
      </Badge>
    </div>
  )
}
