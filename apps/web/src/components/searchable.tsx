import { Search } from 'lucide-react'

import { Input } from './ui/input'

export function Searchable() {
  return (
    <div className="relative min-w-[500px]">
      <span className="absolute inset-y-0 left-0 z-10 flex items-center px-2">
        <Search className="text-zinc-500" />
      </span>
      <Input
        className="rounded-xl border-[1px] border-zinc-300  bg-zinc-50 pl-10"
        placeholder="Pesquisar..."
      />
    </div>
  )
}
