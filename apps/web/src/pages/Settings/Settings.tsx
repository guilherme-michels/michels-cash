import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

export function Settings() {
  const options = [
    { name: 'Página inicial', link: '/' },
    { name: 'Configurações', link: '/settings' },
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
