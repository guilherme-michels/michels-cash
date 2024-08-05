import { formatDate } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import { formatBRL } from '@/lib/utils'

import { InvestmentPlanData } from '../../schemas/investmentPlanSchema'

interface InvestmentDetailsProps {
  investmentPlan: InvestmentPlanData
}

export function InvestmentDetails({ investmentPlan }: InvestmentDetailsProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 p-4 text-sm xl:grid-cols-4">
      <span>Nome</span>
      <span>{investmentPlan.name}</span>

      <span>Taxa de Juros</span>
      <span>{investmentPlan.interestRate}%</span>

      <span>Investimento Mínimo</span>
      <span>{formatBRL(investmentPlan.minimumInvestmentAmount!)}</span>

      <span>Investimento Máximo</span>
      <span>{formatBRL(investmentPlan.maximumInvestmentAmount!)}</span>

      <span>Duração</span>
      <span>{investmentPlan.duration} meses</span>

      <span>Nível de Risco</span>

      {investmentPlan.riskLevel === 'LOW' && (
        <Badge className="bg-green-700 hover:bg-green-600">Conservador</Badge>
      )}
      {investmentPlan.riskLevel === 'MEDIUM' && (
        <Badge className="bg-yellow-600 hover:bg-yellow-500">Moderado</Badge>
      )}
      {investmentPlan.riskLevel === 'HIGH' && (
        <Badge className="bg-red-700 hover:bg-red-600">Arriscado</Badge>
      )}

      <span>Liquidez</span>
      <span>{formatDate(investmentPlan.liquidity, 'dd/MM/yyyy')}</span>

      <span>Penalidade por Retirada Antecipada</span>
      <span>{formatBRL(investmentPlan.penaltyForEarlyWithdrawal!)}</span>

      <span>Moeda</span>
      <span>{investmentPlan.currency}</span>

      <span>Data de Vencimento</span>
      <span>{formatDate(investmentPlan.maturityDate, 'dd/MM/yyyy')}</span>
    </div>
  )
}
