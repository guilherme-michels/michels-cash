import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { InvestmentFilter } from './components/InvestmentFilter'
import { Investments } from './components/Investments'

export function Investment() {
  const options = [
    { name: 'Página inicial', link: '/home' },
    { name: 'Investimentos', link: '/investments' },
  ]
  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <InvestmentFilter />

          <Investments />
        </div>
      </div>
    </SidebarTemplate>
  )
}
