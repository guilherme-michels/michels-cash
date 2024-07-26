import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface QuickAccessCardProps {
  title: string
  description: string
  url: string
}

export function QuickAccessCard({
  description,
  title,
  url,
}: QuickAccessCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <Link
            to={url}
            className="relative flex items-center justify-end gap-2 pb-1 text-sm font-bold text-emerald-800 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
          >
            Ver mais
            <ArrowRight size={16} strokeWidth={3} />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
