import { CircleDollarSign, Gem, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { AccountHeaderCard } from './components/AccountHeaderCard'
import { CurrentAccount } from './components/CurrentAccount/CurrentAccount'
import { Deposit } from './components/Deposit/Deposit'
import { Investment } from './components/Investment/Investment'
import { Withdraw } from './components/Withdraw/Withdraw'

export function Account() {
  const options = [
    { name: 'Página inicial', link: '/home' },
    { name: 'Minha conta', link: '/my-account' },
  ]

  const [selectedCard, setSelectedCard] = useState<
    null | 'current-account' | 'investment' | 'withdraw' | 'deposit'
  >(null)

  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <AccountHeaderCard
              icon={<CircleDollarSign color="#19850b" />}
              description="Conta corrente"
              title="Conta corrente"
              onSelect={() => setSelectedCard('current-account')}
              selected={selectedCard === 'current-account'}
            />

            <AccountHeaderCard
              icon={<Gem color="#19850b" />}
              description="Investido"
              title="Investido"
              onSelect={() => setSelectedCard('investment')}
              selected={selectedCard === 'investment'}
            />

            <AccountHeaderCard
              icon={<Plus color="#19850b" />}
              description="Entradas"
              title="Entradas"
              onSelect={() => setSelectedCard('deposit')}
              selected={selectedCard === 'deposit'}
            />

            <AccountHeaderCard
              icon={<Minus color="#850f0b" />}
              description="Saídas"
              title="Saídas"
              onSelect={() => setSelectedCard('withdraw')}
              selected={selectedCard === 'withdraw'}
            />
          </div>

          <div className="mt-4 size-full">
            {selectedCard === 'current-account' && <CurrentAccount />}
            {selectedCard === 'withdraw' && <Withdraw />}
            {selectedCard === 'deposit' && <Deposit />}
            {selectedCard === 'investment' && <Investment />}
          </div>
        </div>
      </div>
    </SidebarTemplate>
  )
}
