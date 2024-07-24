import { AlignJustify, Bell, Search, Sun, UserCircle } from 'lucide-react'

interface HeaderProps {
  onToggleDesktopSidebar: () => void
}

export function Header({ onToggleDesktopSidebar }: HeaderProps) {
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
            <UserCircle />
            <span>Guilherme Michels</span>
          </div>
        </div>
      </div>
    </div>
  )
}
