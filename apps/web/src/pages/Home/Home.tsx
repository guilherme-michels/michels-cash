import { Breadcrumb } from '../../components/breadcrumb'
import { SidebarTemplate } from '../../template/SidebarTemplate'
import HomeHeader from './components/HomeHeader'
import { QuickAccessCard } from './components/QuickAccessCard'

export function HomePage() {
  const options = [{ name: 'Página inicial', link: '/home' }]
  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <HomeHeader />
          <div className="flex flex-col gap-2 px-20">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
              <QuickAccessCard
                title="Minha conta"
                description="teste"
                url="/my-account"
              />

              <QuickAccessCard
                title="Investimentos"
                description="teste"
                url="/investments"
              />

              <QuickAccessCard
                title="Educação financeira"
                description="teste"
                url="/financial-education"
              />

              <QuickAccessCard
                title="Transferências"
                description="teste"
                url="/transactions"
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  )
}
