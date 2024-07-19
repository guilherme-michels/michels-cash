import { XCircle } from 'lucide-react'

import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent } from './ui/dialog'

interface DeleteModalProps {
  isOpened: boolean
  onClose: () => void
  confirmDelete: () => void
  name?: string
}

export function DeleteModal({
  isOpened,
  onClose,
  name,
  confirmDelete,
}: DeleteModalProps) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="flex max-w-2xl flex-col items-center justify-center">
        <XCircle size={120} className="text-red-600" />
        <strong className="text-xl">Deseja excluir {name}?</strong>

        <span className="text-center text-sm">
          Tem certeza que deseja excluir {name}? essa ação não poderá ser
          desfeita.
        </span>

        <div className="flex gap-4">
          <Button
            onClick={onClose}
            className="border-darkerBlue text-darkerBlue border-[1px] !bg-zinc-50 transition-all hover:!bg-zinc-200"
            type="button"
          >
            Cancelar
          </Button>
          <Button onClick={confirmDelete}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
