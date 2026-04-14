import { money } from '../../lib/format'

export function VoucherTotals({ debit, credit }: { debit: number; credit: number }) {
  const balanced = Math.abs(debit - credit) < 0.005
  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
      <div className="text-sm">Debit: <strong>{money(debit)}</strong></div>
      <div className="text-sm">Credit: <strong>{money(credit)}</strong></div>
      <div className={balanced ? 'text-sm font-medium text-emerald-700' : 'text-sm font-medium text-red-700'}>
        {balanced ? 'Balanced' : 'Unbalanced'}
      </div>
    </div>
  )
}
