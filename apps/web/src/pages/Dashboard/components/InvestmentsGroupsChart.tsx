'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { group: 'Renda fixa', value: 186 },
  { group: 'Ações', value: 285 },
  { group: 'Fundo imobiliário', value: 237 },
]

const chartConfig = {
  value: {
    label: 'Valor',
    color: '#047857',
  },
} satisfies ChartConfig

export function InvestmentsGroupsChart() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="!text-base">Grupos de investimento</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-value] opacity-20" />
            <PolarAngleAxis dataKey="group" />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
