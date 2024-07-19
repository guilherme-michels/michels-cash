import { Breadcrumb } from '../../components/breadcrumb'
import { SidebarTemplate } from '../../template/SidebarTemplate'
import HomeHeader from './components/HomeHeader'

export function HomePage() {
  const options = [{ name: 'Página inicial', link: '/' }]
  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <HomeHeader />
          <div className="flex flex-col gap-2 px-20">
            <div className="grid w-full grid-cols-2 gap-4"></div>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  )
}
