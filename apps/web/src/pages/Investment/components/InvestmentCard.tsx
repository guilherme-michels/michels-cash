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
  onClick: () => void
}

export function InvestmentCard({
  name,
  details,
  onClick,
}: InvestmentCardProps) {
  return (
    <Card className="h-[300px] flex-1 cursor-grab" onClick={onClick}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{details}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
