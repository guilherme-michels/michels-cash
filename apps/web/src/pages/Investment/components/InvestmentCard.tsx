import { formatDate } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatBRL } from '@/lib/utils'

interface InvestmentCardProps {
  investmentPlan: {
    id: string
    name: string
    description: string
    riskLevel: string
    minimumInvestmentAmount: number
    liquidity: string
    maturityDate: Date
  }
  onClick: () => void
}

export function InvestmentCard({
  investmentPlan,
  onClick,
}: InvestmentCardProps) {
  return (
    <Card
      className="h-fit flex-1 cursor-grab transition-colors hover:bg-zinc-50"
      onClick={onClick}
    >
      <CardHeader className="mb-3 border-b-[1px] border-zinc-200 pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl">{investmentPlan.name}</span>

          {investmentPlan.riskLevel === 'LOW' && (
            <Badge className="bg-green-700">Conservador</Badge>
          )}
          {investmentPlan.riskLevel === 'MEDIUM' && (
            <Badge className="bg-yellow-600">Moderado</Badge>
          )}
          {investmentPlan.riskLevel === 'HIGH' && (
            <Badge className="bg-red-700">Arriscado</Badge>
          )}
        </CardTitle>
        <CardDescription>{investmentPlan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs">Liquidez</span>
          <strong>{investmentPlan.liquidity}</strong>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Aplicação min.</span>
          <strong>{formatBRL(investmentPlan.minimumInvestmentAmount!)}</strong>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Vencimento</span>
          <strong>
            {formatDate(investmentPlan.maturityDate, 'dd/MM/yyyy')}
          </strong>
        </div>
      </CardContent>
    </Card>
  )
}
