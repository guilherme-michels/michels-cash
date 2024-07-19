import { CalendarDays } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

interface CalendarHeaderCardProps {
  title: string
  value: string | number
  description: string
}

export function CalendarHeaderCard({
  title,
  value,
  description,
}: CalendarHeaderCardProps) {
  return (
    <div>
      <Card className="relative">
        <CardHeader className="pb-3">
          <CardTitle className="flex gap-2">
            <CalendarDays />
            {value}
          </CardTitle>
          <CardDescription>{title}</CardDescription>
          <CardContent>
            <div className="text-muted-foreground text-xs">{description}</div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
