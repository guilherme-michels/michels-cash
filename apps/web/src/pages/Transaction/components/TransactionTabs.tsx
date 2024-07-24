import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TransactionTabsProps {
  onChange: (value: string) => void
}

export function TransactionTabs({ onChange }: TransactionTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="all" onClick={() => onChange('all')}>
          Tudo
        </TabsTrigger>
        <TabsTrigger value="deposit" onClick={() => onChange('deposit')}>
          Entradas
        </TabsTrigger>
        <TabsTrigger value="withdraw" onClick={() => onChange('withdraw')}>
          Saídas
        </TabsTrigger>
        <TabsTrigger value="scheduled" onClick={() => onChange('scheduled')}>
          Agendado
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
