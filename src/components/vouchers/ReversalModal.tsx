import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export function ReversalModal({
  open,
  onClose,
  onConfirm
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-lg font-semibold">Reverse Voucher</h3>
      <p className="mt-2 text-sm text-slate-600">This will create an opposite posted voucher and mark the original as reversed.</p>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Create Reversal</Button>
      </div>
    </Modal>
  )
}
