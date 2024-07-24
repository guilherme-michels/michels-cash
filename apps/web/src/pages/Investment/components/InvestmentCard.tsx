import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface InvestmentCardProps {
  name: string
  details: string
}

export function InvestmentCard({ name, details }: InvestmentCardProps) {
  return (
    <Card className="flex-1 cursor-grab border-[1px] border-emerald-700">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{details}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
