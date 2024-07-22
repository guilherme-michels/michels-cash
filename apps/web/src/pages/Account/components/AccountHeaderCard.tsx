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
      className={cn(
        'flex-1 cursor-pointer border-[1px] border-zinc-500 bg-transparent transition-all hover:border-zinc-400',
        {
          'border-emerald-800 shadow-lg shadow-emerald-800': selected,
        }
      )}
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
