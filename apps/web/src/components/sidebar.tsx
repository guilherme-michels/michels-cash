import {
  BarChart3,
  Box,
  Calendar,
  DollarSign,
  Home,
  Settings,
  Users,
} from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface MenuItem {
  name: string
  icon: keyof typeof icons
  link: string
}

const icons = {
  Home: <Home className="h-5 w-5" />,
  Patient: <Users className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  Stock: <Box className="h-5 w-5" />,
  Financial: <DollarSign className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
  Dashboard: <BarChart3 className="h-5 w-5" />,
}

const TooltipItem: React.FC<MenuItem> = ({ name, icon, link }) => {
  const location = useLocation()
  const isActive = location.pathname === link

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={link}
            className={`flex h-9 w-9 items-center justify-center rounded-lg  transition-all hover:bg-[#6d5544] ${
              isActive
                ? 'bg-zinc-50 text-black hover:bg-zinc-300'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            {icons[icon]}
            <span className="sr-only">{name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      name: 'Página inicial',
      icon: 'Home',
      link: '/home',
    },
    {
      name: 'Agenda',
      icon: 'Calendar',
      link: '/calendar',
    },
    {
      name: 'Pacientes',
      icon: 'Patient',
      link: '/patients',
    },
    {
      name: 'Estoque',
      icon: 'Stock',
      link: '/stock',
    },
    {
      name: 'Financeiro',
      icon: 'Financial',
      link: '/financial',
    },
    {
      name: 'Dashboard',
      icon: 'Dashboard',
      link: '/dashboard',
    },
    {
      name: 'Configurações',
      icon: 'Settings',
      link: '/settings',
    },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-16 flex-col border-r bg-[#574436]">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/home"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-[#574436] transition-all hover:bg-opacity-85"
        >
          CB
        </Link>
        {menuItems.slice(0, -1).map((item) => (
          <TooltipItem key={item.name} {...item} />
        ))}
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipItem {...menuItems[menuItems.length - 1]} />
      </nav>
    </aside>
  )
}
