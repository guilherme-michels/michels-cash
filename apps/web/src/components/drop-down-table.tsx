import { Eye, MoreHorizontalIcon, Pencil, Trash } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Button } from './ui/button'

interface DropDownTableProps {
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
}

export function DropDownTable({
  onDelete,
  onEdit,
  onView,
}: DropDownTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-0">
          <MoreHorizontalIcon className="h-3 hover:animate-pulse" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {onEdit && (
          <DropdownMenuItem
            className="flex items-center gap-1 text-zinc-700 hover:!bg-zinc-400/15"
            onClick={onEdit}
          >
            <Pencil size={13} />
            Editar
          </DropdownMenuItem>
        )}

        {onView && (
          <DropdownMenuItem
            className="flex items-center gap-1 text-zinc-700 hover:!bg-zinc-400/15"
            onClick={onView}
          >
            <Eye size={13} />
            Visualizar
          </DropdownMenuItem>
        )}

        {onDelete && (
          <DropdownMenuItem
            className="flex items-center gap-1 text-red-500 transition-all hover:!bg-red-500/15"
            onClick={onDelete}
          >
            <Trash size={13} />
            Excluir
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
