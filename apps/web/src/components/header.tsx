import {
  AlignJustify,
  Bell,
  ChevronDown,
  Search,
  Sun,
  UserCircle,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'

interface HeaderProps {
  onToggleDesktopSidebar: () => void
}

export function Header({ onToggleDesktopSidebar }: HeaderProps) {
  const { signOut, user } = useAuth()

  return (
    <div className="left-0 top-0 flex h-14 w-full items-center justify-between border-b-[1px] border-zinc-200 bg-zinc-50 px-12">
      <div className="flex items-center gap-4">
        <AlignJustify
          size={18}
          className="cursor-pointer"
          onClick={onToggleDesktopSidebar}
        />

        <strong className="text-emerald-700">MichelsCash</strong>
      </div>

      <div className="flex gap-12">
        <div className="flex items-center gap-8 whitespace-nowrap text-sm">
          <Search size={18} />

          <Sun size={18} />
          <Bell size={18} />
          <div className="flex items-center gap-2 whitespace-nowrap text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="cursor-pointer rounded-xl bg-zinc-50 p-2 transition-all hover:bg-zinc-200"
              >
                <div className="flex items-center gap-2">
                  <UserCircle />
                  <span>{user?.name}</span>
                  <ChevronDown size={14} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center gap-1 transition-all">
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-1 transition-all"
                  onClick={signOut}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
