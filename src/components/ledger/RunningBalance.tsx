import { money } from '../../lib/format'

export function RunningBalance({ amount }: { amount: number }) {
  return <span className="font-medium">{money(amount)}</span>
}
