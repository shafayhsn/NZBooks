import { Button } from '../ui/Button'

export function VoucherToolbar({
  onNew,
  onSave,
  onPost,
  canPost
}: {
  onNew: () => void
  onSave: () => void
  onPost: () => void
  canPost: boolean
}) {
  return (
    <div className="mb-4 flex gap-3">
      <Button variant="secondary" onClick={onNew}>New Voucher</Button>
      <Button variant="secondary" onClick={onSave}>Save Draft</Button>
      <Button onClick={onPost} disabled={!canPost} className={!canPost ? 'opacity-50' : ''}>Post Voucher</Button>
    </div>
  )
}
