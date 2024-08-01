import { Breadcrumb } from '@/components/breadcrumb'
import { SidebarTemplate } from '@/template/SidebarTemplate'

export function FinancialEducationPost() {
  const options = [
    { name: 'Página inicial', link: '/home' },
    { name: 'Educação financeira', link: '/financial-education' },
    {
      name: 'Escrever postagem',
      link: '',
    },
  ]

  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4"></div>
      </div>
    </SidebarTemplate>
  )
}
