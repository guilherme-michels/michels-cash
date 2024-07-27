import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'

interface InvestmentGroupFormModalPros {
  isOpened: boolean
  onClose: () => void
}

export function InvestmentGroupFormModal({
  isOpened,
  onClose,
}: InvestmentGroupFormModalPros) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent></DialogContent>
    </Dialog>
  )
}
