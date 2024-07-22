import {
  AreaChart,
  ArrowRightLeft,
  BookOpenCheck,
  Home,
  LineChart,
  type LucideIcon,
  Settings,
  Wallet,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '../lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type SidebarItemProps = {
  title: string
  Icon: LucideIcon
  path: string
  currentPath: string
}

function SidebarItem({ title, Icon, path, currentPath }: SidebarItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={path}
          className={cn(
            'group flex w-full justify-start gap-4 rounded-lg p-1 text-muted-foreground transition-colors',
            currentPath === path &&
              'bg-zinc-100 text-foreground  dark:bg-opacity-5'
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5 text-emerald-700 transition-all group-hover:scale-110'
            )}
          />

          <span className="text-sm transition-all group-hover:scale-110 group-hover:text-foreground">
            {title}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  )
}

type DesktopSidebarProps = {
  isSidebarOpened: boolean
}

export function DesktopSidebar({ isSidebarOpened }: DesktopSidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'transition-width fixed inset-y-0 left-0 z-10 mt-12 flex flex-col border-r bg-background duration-300 ease-in-out',
        isSidebarOpened ? 'w-48' : 'w-48 -translate-x-full duration-500'
      )}
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className={cn(
            'flex w-full items-center gap-2 rounded bg-emerald-700 px-1 py-2 text-lg font-semibold text-primary-foreground transition-all hover:bg-emerald-700/90'
          )}
        >
          <Home className="h-5 w-5 transition-all" />
          <span className="text-sm transition-all">Página inicial</span>
        </Link>

        <SidebarItem
          title="Minha conta"
          Icon={Wallet}
          path="/my-account"
          currentPath={location.pathname}
        />

        <SidebarItem
          title="Investimentos"
          Icon={LineChart}
          path="/investments"
          currentPath={location.pathname}
        />

        <SidebarItem
          title="Transferências"
          Icon={ArrowRightLeft}
          path="/transactions"
          currentPath={location.pathname}
        />

        <SidebarItem
          title="Educação"
          Icon={BookOpenCheck}
          path="/financial-education"
          currentPath={location.pathname}
        />

        <SidebarItem
          title="Dashboard"
          Icon={AreaChart}
          path="/dashboard"
          currentPath={location.pathname}
        />
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <SidebarItem
          title="Configurações"
          Icon={Settings}
          path="/settings"
          currentPath={location.pathname}
        />
      </nav>
    </aside>
  )
}
