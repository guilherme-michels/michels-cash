import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'

interface PerfilFormModalProps {
  isOpened: boolean
  onClose: () => void
}

export function PerfilFormModal({ isOpened, onClose }: PerfilFormModalProps) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent></DialogContent>
    </Dialog>
  )
}
