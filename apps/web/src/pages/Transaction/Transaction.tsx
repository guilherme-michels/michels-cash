import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

export function Transaction() {
  const options = [
    { name: 'Página inicial', link: '/home' },
    { name: 'Transações', link: '/transactions' },
  ]
  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col"></div>
      </div>
    </SidebarTemplate>
  )
}
