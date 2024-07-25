import { type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface TransactionOptionButtonProps {
  onClick: () => void
  description: string
  Icon: LucideIcon
}

export function TransactionOptionButton({
  onClick,
  Icon,
  description,
}: TransactionOptionButtonProps) {
  return (
    <div className=" flex flex-col items-center gap-1" onClick={onClick}>
      <Button className="group flex size-14 items-center justify-center rounded-full border-[1px] border-zinc-300 bg-white transition-all hover:bg-zinc-100">
        <Icon className="h-5 w-5 text-emerald-800 transition-all group-hover:scale-125" />
      </Button>
      <span className="text-xs text-zinc-700">{description}</span>
    </div>
  )
}
