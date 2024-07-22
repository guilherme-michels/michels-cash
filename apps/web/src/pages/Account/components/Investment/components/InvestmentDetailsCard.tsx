import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getFakeInvestments } from '../investment.service'
import { InvestmentData } from '../investmentSchema'

interface InvestmentDetailsCardProps {
  name: string
}

export function InvestmentDetailsCard({ name }: InvestmentDetailsCardProps) {
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(
    null
  )
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
        <CardTitle>{name}</CardTitle>
        {loading ? (
          <CardDescription>Carregando...</CardDescription>
        ) : (
          <CardDescription>{investmentData?.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Carregando conteúdo...</div>
        ) : (
          <div>{investmentData?.description}</div>
        )}
      </CardContent>
    </Card>
  )
}
