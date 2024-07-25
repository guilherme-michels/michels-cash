import { PropsWithChildren, useState } from 'react'

import { Header } from '@/components/header'

import { DesktopSidebar } from '../components/sidebar'

export function SidebarTemplate({ children }: PropsWithChildren<unknown>) {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true)
  const toggleDesktopSidebar = () => setIsSidebarOpened((prev) => !prev)

  return (
    <div className="flex size-full">
      <DesktopSidebar isSidebarOpened={isSidebarOpened} />
      <div className="flex size-full min-h-[100vh] flex-col">
        <Header onToggleDesktopSidebar={toggleDesktopSidebar} />

        <main
          className={`h-min-[100vh] flex h-auto flex-1 flex-col  pt-4 transition-all duration-500 ${
            isSidebarOpened ? 'pl-52' : ''
          } overflow-y-auto`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
