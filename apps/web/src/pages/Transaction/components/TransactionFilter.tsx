import { Eye } from 'lucide-react'

import { Searchable } from '@/components/searchable'

export function TransactionFilter() {
  return (
    <div className="flex w-full items-center gap-4">
      <Searchable />

      <Eye className="h-10 w-10 cursor-pointer rounded-xl bg-zinc-50 p-2 transition-all hover:bg-zinc-200" />
    </div>
  )
}
