import { ListFilter } from 'lucide-react'
import { useState } from 'react'

import { Breadcrumb } from '@/components/breadcrumb'
import { Button } from '@/components/ui/button'
import { SidebarTemplate } from '@/template/SidebarTemplate'

import { FinancialContentFilter } from './components/FinancialContentFilter'
import { FinancialEducationFilter } from './components/FinancialEducationFilter'
import { PostCard } from './components/PostCard'

export function FinancialEducation() {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const options = [
    { name: 'Página inicial', link: '/' },
    { name: 'Educação financeira', link: '/financial-education' },
  ]

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <FinancialEducationFilter />

            <Button onClick={() => console.log(true)}>
              Adicionar postagem
            </Button>
          </div>

          <div className="grid h-full w-full grid-cols-3 gap-4">
            <div className="order-2 col-span-3 flex max-h-[75vh] flex-col gap-4 overflow-y-auto xl:order-1 xl:col-span-2">
              <PostCard url="a" />
              <PostCard url="a" />
              <PostCard url="a" />
              <PostCard url="a" />
            </div>

            <div className="order-1 col-span-3 xl:order-2 xl:col-span-1">
              <Button
                className="mb-4 flex w-full items-center gap-2 rounded bg-emerald-700 p-2 text-white hover:bg-emerald-800 xl:hidden"
                onClick={toggleFilterVisibility}
              >
                <ListFilter size={18} />
                Filtro de Conteúdos
              </Button>

              <div
                className={`${isFilterVisible ? 'block' : 'hidden'} xl:block`}
              >
                <FinancialContentFilter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  )
}
