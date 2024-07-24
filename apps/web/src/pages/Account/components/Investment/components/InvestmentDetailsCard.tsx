import React, { useEffect, useState } from 'react'

import { Accordion } from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getFakeInvestments } from '../investment.service'
import { InvestmentData } from '../schemas/investmentSchema'
import { InvestmentDetailsItem } from './InvestmentDetailsItem'
import { InvestmentDetailsMovimentationDate } from './InvestmentDetailsMovimentationDate'
import { InvestmentDetailsTabs } from './InvestmentDetailsTabs'

interface InvestmentDetailsCardProps {
  name: string
}

export function InvestmentDetailsCard({ name }: InvestmentDetailsCardProps) {
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(
    null
  )
  const [investmentView, setInvestmentView] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getFakeInvestments(name)
      setInvestmentData(data.investment)
      setLoading(false)
    }

    fetchData()
  }, [name])

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          <strong className="cursor-pointer font-semibold hover:text-zinc-700">
            {name}
          </strong>
        </CardTitle>
        <CardDescription>{investmentData?.description}</CardDescription>
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

        <Accordion type="single" collapsible>
          {Array.from({ length: 8 }, (_, i) => (
            <InvestmentDetailsItem
              key={i + 1}
              investmentId={(i + 1).toString()}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
