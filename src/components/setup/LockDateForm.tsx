import { Card } from '../ui/Card'

export function LockDateForm({ lockDate }: { lockDate?: string | null }) {
  return (
    <Card>
      <h3 className="mb-2 text-lg font-semibold">Lock Date</h3>
      <p className="text-sm text-slate-600">Transactions on or before this date cannot be added or posted.</p>
      <p className="mt-3 text-sm font-medium">{lockDate ?? 'Not set'}</p>
    </Card>
  )
}
