import { CircleDollarSign, Minus, Plus } from 'lucide-react'

import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { TransactionFilter } from './components/TransactionFilter'
import { TransactionHeaderCard } from './components/TransactionHeaderCard'
import { TransactionTable } from './components/TransactionTable'
import { TransactionTabs } from './components/TransactionTabs'

export function Transaction() {
  const options = [
    { name: 'Página inicial', link: '/home' },
    { name: 'Transações', link: '/transactions' },
  ]
  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <TransactionHeaderCard
              icon={<CircleDollarSign color="#19850b" />}
              description="Saldo atual"
              title="Saldo atual"
            />

            <TransactionHeaderCard
              icon={<Plus color="#19850b" />}
              description="Entradas"
              title="Entradas"
            />

            <TransactionHeaderCard
              icon={<Minus color="#850f0b" />}
              description="Saídas"
              title="Saídas"
            />
          </div>

          <div className="flex items-center gap-4">
            <TransactionFilter />
            <TransactionTabs onChange={() => console.log('entrou')} />
          </div>

          <TransactionTable />
        </div>
      </div>
    </SidebarTemplate>
  )
}
