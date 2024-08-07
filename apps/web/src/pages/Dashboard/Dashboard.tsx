import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { DepositsAndWithdrawalsChart } from './components/DepositsAndWithdrawalsCard'
import { InvestmentChart } from './components/InvestmentsChart'
import { InvestmentsGroupsChart } from './components/InvestmentsGroupsChart'
import { Swap } from './components/Swap/Swap'

export function Dashboard() {
  const options = [
    { name: 'Página inicial', link: '/' },
    { name: 'Dashboard', link: '/Dashboard' },
  ]
  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <Swap />

          <div className="grid size-full grid-cols-1 gap-4 xl:grid-cols-3">
            <DepositsAndWithdrawalsChart />

            <InvestmentChart />

            <InvestmentsGroupsChart />
          </div>
        </div>
      </div>
    </SidebarTemplate>
  )
}
