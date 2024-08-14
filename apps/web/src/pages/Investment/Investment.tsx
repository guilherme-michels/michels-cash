import { CircleDollarSign } from 'lucide-react'
import { useState } from 'react'

import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { InvestmentFilter } from './components/InvestmentFilter'
import { InvestmentHeaderCard } from './components/InvestmentHeaderCard'
import { InvestmentPlanFormModal } from './components/InvestmentPlanFormModal'
import { Investments } from './components/Investments'

export function Investment() {
  const options = [
    { name: 'Página inicial', link: '/' },
    { name: 'Investimentos', link: '/investments' },
  ]

  const [isInvestmentPlanFormModalOpen, setIsInvestmentPlanFormModalOpen] =
    useState(false)

  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <InvestmentHeaderCard
              icon={<CircleDollarSign color="#19850b" />}
              description="Planos de investimento"
              title="Planos de investimento"
            />

            <InvestmentHeaderCard
              icon={<CircleDollarSign color="#19850b" />}
              description="Simulador de ganhos"
              title="Simulador de ganhos"
            />

            <InvestmentHeaderCard
              icon={<CircleDollarSign color="#19850b" />}
              description="Histórico de investimentos"
              title="Histórico"
            />
          </div>

          <div className="flex w-full items-center justify-between">
            <InvestmentFilter
              setIsInvestmentPlanFormModalOpen={
                setIsInvestmentPlanFormModalOpen
              }
            />
          </div>

          <Investments />
        </div>
      </div>

      <InvestmentPlanFormModal
        isOpened={isInvestmentPlanFormModalOpen}
        onClose={() => setIsInvestmentPlanFormModalOpen(false)}
      />
    </SidebarTemplate>
  )
}
