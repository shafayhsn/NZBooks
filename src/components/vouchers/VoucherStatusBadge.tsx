import type { VoucherStatus } from '../../types/accounting'
import { Badge } from '../ui/Badge'

export function VoucherStatusBadge({ status }: { status: VoucherStatus }) {
  if (status === 'posted') return <Badge className="bg-emerald-50 text-emerald-700">Posted</Badge>
  if (status === 'reversed') return <Badge className="bg-rose-50 text-rose-700">Reversed</Badge>
  return <Badge className="bg-sky-50 text-sky-700">Draft</Badge>
}
