import { ListFilter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Searchable } from '@/components/searchable'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InvestmentType } from '@/interfaces/investmentType'
import { riskLevel } from '@/interfaces/riskLevel'

export function InvestmentFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedRisks, setSelectedRisks] = useState<riskLevel[]>(() => {
    return searchParams.getAll('risk') as riskLevel[]
  })

  const handleTypeFilter = (type: InvestmentType) => {
    searchParams.set('type', type)
    setSearchParams(searchParams)
  }

  const handleRiskFilter = (risk: riskLevel) => {
    let newSelectedRisks: riskLevel[]

    if (selectedRisks.includes(risk)) {
      newSelectedRisks = selectedRisks.filter((r) => r !== risk)
    } else {
      newSelectedRisks = [...selectedRisks, risk]
    }

    setSelectedRisks(newSelectedRisks)

    searchParams.delete('risk')

    newSelectedRisks.forEach((risk) => searchParams.append('risk', risk))

    setSearchParams(searchParams)
  }

  useEffect(() => {
    setSelectedRisks(searchParams.getAll('risk') as riskLevel[])
  }, [searchParams])

  return (
    <div className="flex w-full items-center gap-4">
      <Searchable />

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="h-10 w-10 cursor-pointer rounded-xl bg-zinc-50 p-2 transition-all hover:bg-zinc-200"
        >
          <ListFilter />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtro</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center gap-1 transition-all"
            onClick={() => handleTypeFilter('FIXED_INCOME')}
          >
            Renda fixa
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 transition-all"
            onClick={() => handleTypeFilter('REAL_ESTATE_FUND')}
          >
            Fundo imobiliário
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 transition-all"
            onClick={() => handleTypeFilter('STOCKS')}
          >
            Ações
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 transition-all"
            onClick={() => handleTypeFilter('MUTUAL_FUNDS')}
          >
            Fundos mútuos
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Badge
        className={`cursor-pointer bg-green-700 hover:bg-green-600 ${selectedRisks.includes('LOW') ? 'opacity-100' : 'opacity-50'}`}
        onClick={() => handleRiskFilter('LOW')}
      >
        Conservador
      </Badge>
      <Badge
        className={`cursor-pointer bg-yellow-600 hover:bg-yellow-500 ${selectedRisks.includes('MEDIUM') ? 'opacity-100' : 'opacity-50'}`}
        onClick={() => handleRiskFilter('MEDIUM')}
      >
        Moderado
      </Badge>
      <Badge
        className={`cursor-pointer bg-red-700 hover:bg-red-600 ${selectedRisks.includes('HIGH') ? 'opacity-100' : 'opacity-50'}`}
        onClick={() => handleRiskFilter('HIGH')}
      >
        Arriscado
      </Badge>
    </div>
  )
}
