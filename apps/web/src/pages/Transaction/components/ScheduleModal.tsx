import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'

interface ScheduleModalProps {
  isOpened: boolean
  onClose: () => void
}

export function ScheduleModal({ isOpened, onClose }: ScheduleModalProps) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />

      <DialogContent></DialogContent>
    </Dialog>
  )
}
