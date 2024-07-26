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
    <Card className="h-[300px] w-full flex-1 cursor-grab">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{details}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
