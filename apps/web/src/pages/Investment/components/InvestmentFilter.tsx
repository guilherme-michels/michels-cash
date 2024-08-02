import { ListFilter } from 'lucide-react'

import { Searchable } from '@/components/searchable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function InvestmentFilter() {
  return (
    <div className="flex w-full items-center gap-4">
      <Searchable />

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="h-10 w-10 cursor-pointer rounded-xl bg-zinc-50 p-2 transition-all hover:bg-zinc-200"
        >
          <ListFilter />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtro</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-1 transition-all">
            Renda fixa
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 transition-all">
            Fundo imobiliário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
