import { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface InvestmentHeaderCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function InvestmentHeaderCard({
  description,
  title,
  icon,
}: InvestmentHeaderCardProps) {
  return (
    <Card className={'flex-1 border-[1px]'}>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full items-end justify-end gap-2 pt-0"></CardContent>
    </Card>
  )
}
