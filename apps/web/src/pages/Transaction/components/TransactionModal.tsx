import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'

interface TransactionModalProps {
  isOpened: boolean
  onClose: () => void
}

export function TransactionModal({ isOpened, onClose }: TransactionModalProps) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent></DialogContent>
    </Dialog>
  )
}
