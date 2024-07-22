import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

export function Dashboard() {
  const options = [
    { name: 'Página inicial', link: '/home' },
    { name: 'Dashboard', link: '/Dashboard' },
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
