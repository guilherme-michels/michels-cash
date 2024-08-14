import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { X } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useDebounce } from '@/hooks/useDebounce'

import { getInvestmentGroups } from '../api/investmentGroup.service'
import { InvestmentGroupData } from '../schemas/investmentGroupSchema'
import { InvestmentPlanData } from '../schemas/investmentPlanSchema'
import { InvestmentList } from './InvestmentList'

export function Investments() {
  const [searchParams, setSearchParams] = useSearchParams()

  const typeFilter = searchParams.get('type') || ''
  const riskFilters = useMemo(
    () => searchParams.getAll('risk') || [],
    [searchParams]
  )
  const searchQuery = searchParams.get('search') || ''

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const {
    data: investmentGroupsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'investmentGroups',
      { type: typeFilter, risk: riskFilters, search: debouncedSearchQuery },
    ],
    queryFn: () =>
      getInvestmentGroups({
        type: typeFilter || undefined,
        risk: riskFilters.length > 0 ? riskFilters : undefined,
        search: debouncedSearchQuery || undefined,
      }),
    placeholderData: keepPreviousData,
  })

  const formattedFilters = {
    type: typeFilter || '',
    risk: riskFilters.length > 0 ? riskFilters.join(', ') : '',
    search: searchQuery || '',
  }

  const clearFilters = () => {
    searchParams.delete('type')
    searchParams.delete('risk')
    searchParams.delete('search')
    setSearchParams(searchParams)
  }

  if (isLoading) {
    return (
      <Skeleton className="flex h-[40vh] w-full items-center justify-center bg-zinc-50" />
    )
  }

  if (isError) {
    console.error('Erro ao buscar grupos de investimento:', error)
    return
  }

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex h-8 items-center">
        <span
          className={`ml-1 text-xs text-zinc-500 ${
            formattedFilters.type ||
            formattedFilters.risk ||
            formattedFilters.search
              ? 'visible'
              : 'invisible'
          }`}
        >
          Filtrando por:{' '}
          {formattedFilters.type && (
            <>
              <span>{formattedFilters.type}</span>
              {formattedFilters.risk || formattedFilters.search ? ', ' : ''}
            </>
          )}
          {formattedFilters.risk && (
            <>
              <span>{formattedFilters.risk}</span>
              {formattedFilters.search ? ', ' : ''}
            </>
          )}
          {formattedFilters.search}
        </span>

        {(formattedFilters.type ||
          formattedFilters.risk ||
          formattedFilters.search) && (
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

      {investmentGroupsData?.investmentGroups?.length === 0 ? (
        <div className="flex h-full min-h-[40vh]  w-full items-center justify-center text-zinc-500">
          Nenhum resultado encontrado
        </div>
      ) : (
        investmentGroupsData?.investmentGroups?.map(
          (group: InvestmentGroupData) => (
            <InvestmentList
              key={group.id}
              title={group.name}
              color={group.color}
              investmentPlans={
                group.investmentPlans?.map((plan: InvestmentPlanData) => ({
                  liquidity: format(new Date(plan.liquidity), 'dd/MM/yyyy'),
                  minimumInvestmentAmount: plan.minimumInvestmentAmount!,
                  maturityDate: plan.maturityDate,
                  riskLevel: plan.riskLevel,
                  name: plan.name,
                  description: plan.description,
                  id: plan.id || '',
                })) || []
              }
            />
          )
        )
      )}
    </div>
  )
}
