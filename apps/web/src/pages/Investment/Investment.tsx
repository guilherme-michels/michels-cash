import { useState } from 'react'

import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { InvestmentFilter } from './components/InvestmentFilter'
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
