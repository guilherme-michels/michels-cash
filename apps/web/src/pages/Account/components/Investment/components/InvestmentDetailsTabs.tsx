import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface InvestmentDetailsTabsProps {
  onChange: (value: string) => void
}

export function InvestmentDetailsTabs({
  onChange,
}: InvestmentDetailsTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="all" onClick={() => onChange('all')}>
          Tudo
        </TabsTrigger>
        <TabsTrigger
          value="movimentation"
          onClick={() => onChange('movimentation')}
        >
          Movimentação
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
