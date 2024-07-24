import { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface TransactionHeaderCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function TransactionHeaderCard({
  description,
  title,
  icon,
}: TransactionHeaderCardProps) {
  return (
    <Card className={'flex-1 border-[1px]'}>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full items-end justify-end gap-2 pt-0">
        <strong className="text-lg">R$</strong>
        <strong className="text-4xl text-zinc-800"> 15.000,00</strong>
      </CardContent>
    </Card>
  )
}
