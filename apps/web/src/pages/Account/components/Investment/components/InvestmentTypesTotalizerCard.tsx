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

interface DataEntry {
  name: string
  value: number
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded border bg-white p-2 shadow-md">
        <p className="label">{`${payload[0].name} : ${payload[0].value}%`}</p>
      </div>
    )
  }

  return null
}

interface InvestmentTypesTotalizerCardProps {
  onSelectInvestmentType: (value: string) => void
}

export function InvestmentTypesTotalizerCard({
  onSelectInvestmentType,
}: InvestmentTypesTotalizerCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const data: DataEntry[] = [
    { name: 'LCA', value: 33 },
    { name: 'LCI', value: 47 },
    { name: 'CDB', value: 20 },
  ]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const HOVER_COLORS = ['#005F9E', '#007A6E', '#CC8A00', '#CC5A00']

  return (
    <Card className=" col-span-3 flex-1 lg:col-span-2">
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
        <CardDescription>Totalizador de investimentos</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center space-x-4">
        <div className="flex size-full flex-col">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === activeIndex
                        ? HOVER_COLORS[index % HOVER_COLORS.length]
                        : COLORS[index % COLORS.length]
                    }
                    onClick={() => onSelectInvestmentType(entry.name)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className="cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 justify-items-center">
            {data.map((entry, index) => (
              <div
                key={`legend-${index}`}
                className="mb-2 flex cursor-pointer items-center transition-all hover:text-zinc-500"
                onClick={() => onSelectInvestmentType(entry.name)}
              >
                <div
                  className="mr-2 h-3 w-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
