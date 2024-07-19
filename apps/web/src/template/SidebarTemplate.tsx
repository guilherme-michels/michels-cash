import { PropsWithChildren } from 'react'

import { Header } from '../components/header/header'
import { Sidebar } from '../components/sidebar'

export function SidebarTemplate({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex size-full">
      <Sidebar />
      <div className="ml-14 flex size-full min-h-[100vh] flex-col">
        <Header />

        <div className="size-full flex-grow transform overflow-y-auto bg-[#D1CDCB]">
          {children}
        </div>
      </div>
    </div>
  )
}
