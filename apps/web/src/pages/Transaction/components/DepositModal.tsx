import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'

interface DepositModalProps {
  isOpened: boolean
  onClose: () => void
}

export function DepositModal({ isOpened, onClose }: DepositModalProps) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent></DialogContent>
    </Dialog>
  )
}
