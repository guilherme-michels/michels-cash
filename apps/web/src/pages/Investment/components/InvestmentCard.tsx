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
  }
  onClick: () => void
}

export function InvestmentCard({
  investmentPlan,
  onClick,
}: InvestmentCardProps) {
  return (
    <Card className="h-[300px] flex-1 cursor-grab" onClick={onClick}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {investmentPlan.name}
          {investmentPlan.riskLevel === 'LOW' && (
            <Badge className="bg-green-700 hover:bg-green-600">
              Conservador
            </Badge>
          )}
          {investmentPlan.riskLevel === 'MEDIUM' && (
            <Badge className="bg-yellow-600 hover:bg-yellow-500">
              Moderado
            </Badge>
          )}
          {investmentPlan.riskLevel === 'HIGH' && (
            <Badge className="bg-red-700 hover:bg-red-600">Arriscado</Badge>
          )}
        </CardTitle>
        <CardDescription>{investmentPlan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span>Liquidez</span>
          <strong>{investmentPlan.liquidity}</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Aplicação min</span>
          <strong>{formatBRL(investmentPlan.minimumInvestmentAmount!)}</strong>
        </div>
      </CardContent>
    </Card>
  )
}
