import { Search } from 'lucide-react'

import { Input } from './ui/input'

export function Searchable() {
  return (
    <div className="relative min-w-[300px]">
      <span className="absolute inset-y-0 left-0 z-10 flex items-center px-2">
        <Search className="text-zinc-500" />
      </span>
      <Input className="pl-10" placeholder="Pesquisar..." />
    </div>
  )
}
