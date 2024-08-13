import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatBRL } from '@/lib/utils'

interface InvestmentGroup {
  id: string
  name: string
  totalAmount: number
  percentage: number
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const { payload: data } = payload[0]
    return (
      <div className="custom-tooltip rounded border bg-white p-2 shadow-md">
        <p className="label">{`${data.name} : ${data.percentage}%`}</p>
      </div>
    )
  }
  return null
}

interface InvestmentTypesTotalizerCardProps {
  onSelectInvestmentType: (group: { id: string; name: string }) => void
  totalInvestment: number
  investmentGroups: InvestmentGroup[]
  isLoading: boolean
}

export function InvestmentTypesTotalizerCard({
  onSelectInvestmentType,
  investmentGroups,
  totalInvestment,
  isLoading,
}: InvestmentTypesTotalizerCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const HOVER_COLORS = ['#005F9E', '#007A6E', '#CC8A00', '#CC5A00']

  return (
    <Card className="col-span-3 flex-1 xl:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Investimentos
          <Link
            to="/investments"
            className="text-sm transition-all hover:text-zinc-700"
          >
            Ver mais
          </Link>
        </CardTitle>
        <CardDescription>
          {isLoading ? (
            'Carregando...'
          ) : investmentGroups.length > 0 ? (
            `Totalizador de investimentos ${formatBRL(totalInvestment)}`
          ) : (
            <span>Você não possui investimentos</span>
          )}
        </CardDescription>
      </CardHeader>
      {!isLoading && investmentGroups.length > 0 ? (
        <CardContent className="flex items-center justify-center space-x-4">
          <div className="flex size-full flex-col">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={investmentGroups}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="percentage"
                  nameKey="name"
                >
                  {investmentGroups.map((investmentGroup, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex
                          ? HOVER_COLORS[index % HOVER_COLORS.length]
                          : COLORS[index % COLORS.length]
                      }
                      onClick={() =>
                        onSelectInvestmentType({
                          id: investmentGroup.id,
                          name: investmentGroup.name,
                        })
                      }
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      className="cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid h-[50px] grid-cols-3 justify-items-center">
              {investmentGroups.map((investmentGroup, index) => (
                <div
                  key={`legend-${index}`}
                  className="mb-2 flex cursor-pointer items-center transition-all hover:text-zinc-500"
                  onClick={() =>
                    onSelectInvestmentType({
                      id: investmentGroup.id,
                      name: investmentGroup.name,
                    })
                  }
                >
                  <div
                    className="mr-2 h-3 w-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{investmentGroup.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      ) : (
        !isLoading && (
          <CardContent className="flex h-[450px] w-full flex-col items-center justify-center text-zinc-500">
            <span>Nenhum investimento encontrado</span>
            <Link
              to="/investments"
              className="text-sm text-blue-500 underline transition-all hover:text-blue-600"
            >
              Conhecer investimentos
            </Link>
          </CardContent>
        )
      )}
    </Card>
  )
}
