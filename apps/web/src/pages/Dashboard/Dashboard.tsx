import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { DepositsAndWithdrawalsChart } from './components/DepositsAndWithdrawalsCard'

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
          <div className="grid grid-cols-3 gap-4">
            <DepositsAndWithdrawalsChart />
          </div>
        </div>
      </div>
    </SidebarTemplate>
  )
}
