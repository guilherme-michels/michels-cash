import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import emptyImg from '@/assets/empty.png'
import { Accordion } from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getInvestmentsByGroupId } from '@/pages/Investment/api/investment.service'

import { InvestmentDetailsItem } from './InvestmentDetailsItem'
import { InvestmentDetailsMovimentationDate } from './InvestmentDetailsMovimentationDate'
import { InvestmentDetailsTabs } from './InvestmentDetailsTabs'
import { InvestmentMovimentationTable } from './InvestmentMovimentationTable'

interface InvestmentDetailsCardProps {
  group: {
    id: string
    name: string
  } | null
}

export function InvestmentDetailsCard({ group }: InvestmentDetailsCardProps) {
  const [investmentView, setInvestmentView] = useState<string | null>(null)

  const {
    data: investmentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['investmentDetails', group?.id],
    queryFn: () =>
      group ? getInvestmentsByGroupId(group.id) : Promise.resolve(null),
    enabled: !!group,
  })

  if (!group) {
    return (
      <Card className="col-span-3">
        <CardContent className="flex size-full flex-col items-center justify-center">
          <img src={emptyImg} alt="empty" className="size-60" />
          <p className="text-sm text-zinc-500">
            Apenas com investimentos já cadastrados você pode ver suas métricas
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          <strong className="cursor-pointer font-semibold hover:text-zinc-700">
            {group.name}
          </strong>
        </CardTitle>
        <CardDescription className="h-6 w-full">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <span>Investimentos presentes no grupo {group.name}</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
        <div className="flex items-center justify-between">
          <InvestmentDetailsTabs
            onChange={(value) => setInvestmentView(value)}
          />
          {investmentView === 'movimentation' && (
            <InvestmentDetailsMovimentationDate />
          )}
        </div>

        {isLoading ? (
          <Skeleton className="h-[400px] w-full" />
        ) : isError ? (
          <div className="text-red-500">
            Failed to load investments: {error.message}
          </div>
        ) : investmentView === 'movimentation' ? (
          <InvestmentMovimentationTable groupId={group.id} />
        ) : (
          <Accordion type="single" collapsible>
            {investmentData?.investments?.length ? (
              investmentData.investments.map((investment) => (
                <InvestmentDetailsItem
                  key={investment.id}
                  investment={investment}
                />
              ))
            ) : (
              <div>Nenhum investimento disponível</div>
            )}
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}
