import { formatDate } from 'date-fns'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { getInvestmentGroups } from '../api/investmentGroup.service'
import { InvestmentGroupData } from '../schemas/investmentGroupSchema'
import { InvestmentPlanData } from '../schemas/investmentPlanSchema'
import { InvestmentList } from './InvestmentList'

export function Investments() {
  const [investmentGroups, setInvestmentGroups] = useState<
    InvestmentGroupData[]
  >([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const typeFilter = searchParams.get('type') || ''
  const riskFilters = useMemo(
    () => searchParams.getAll('risk') || [],
    [searchParams]
  )

  useEffect(() => {
    setLoading(true)

    getInvestmentGroups({
      type: typeFilter || undefined,
      risk: riskFilters.length > 0 ? riskFilters : undefined,
    })
      .then((data) => {
        setInvestmentGroups(data.investmentGroups)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao buscar grupos de investimento:', error)
        setLoading(false)
      })
  }, [typeFilter, riskFilters])

  const formattedFilters = {
    type: typeFilter || '',
    risk: riskFilters.length > 0 ? riskFilters.join(', ') : '',
  }

  const clearFilters = () => {
    searchParams.delete('type')
    searchParams.delete('risk')
    setSearchParams(searchParams)
  }

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex h-8 items-center">
        <span
          className={`ml-1 text-xs text-zinc-500 ${formattedFilters.type || formattedFilters.risk ? 'visible' : 'invisible'}`}
        >
          Filtrando por:{' '}
          {formattedFilters.type && (
            <>
              <span>{formattedFilters.type}</span>
              {formattedFilters.risk && ', '}
            </>
          )}
          {formattedFilters.risk}
        </span>

        {(formattedFilters.type || formattedFilters.risk) && (
          <Tooltip>
            <TooltipTrigger className="ml-2">
              <X
                size={14}
                className="text-zinc-500 hover:text-zinc-700"
                onClick={clearFilters}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        )}
      </div>

      {loading ? (
        <Skeleton className="flex h-[70vh] w-full items-center justify-center bg-zinc-50" />
      ) : (
        investmentGroups.map((group) => (
          <InvestmentList
            key={group.id}
            title={group.name}
            investmentPlans={
              group.investmentPlans?.map((plan: InvestmentPlanData) => ({
                liquidity: formatDate(plan.liquidity, 'dd/MM/yyyy'),
                minimumInvestmentAmount: plan.minimumInvestmentAmount!,
                maturityDate: plan.maturityDate,
                riskLevel: plan.riskLevel,
                name: plan.name,
                description: plan.description,
                id: plan.id || '',
              })) || []
            }
          />
        ))
      )}
    </div>
  )
}
