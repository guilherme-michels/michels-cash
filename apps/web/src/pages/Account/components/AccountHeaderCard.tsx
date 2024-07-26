import { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AccountHeaderCardProps {
  title: string
  description: string
  icon: ReactNode
  onSelect: () => void
  selected: boolean
}

export function AccountHeaderCard({
  description,
  title,
  icon,
  onSelect,
  selected,
}: AccountHeaderCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn('flex-1 cursor-pointer border-[1px] transition-all', {
        'border-emerald-700 ': selected,
      })}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>a</CardContent>
    </Card>
  )
}
