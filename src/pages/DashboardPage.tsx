import { Card } from '../components/ui/Card'
import { money } from '../lib/format'
import type { AppState } from '../types/accounting'
import { buildTrialBalance } from '../utils/trialBalance'
import { buildProfitLoss } from '../utils/statements'
import { VoucherStatusBadge } from '../components/vouchers/VoucherStatusBadge'

export function DashboardPage({ state }: { state: AppState }) {
  const tb = buildTrialBalance(state)
  const pl = buildProfitLoss(state)
  const totals = tb.reduce((acc, row) => {
    acc.debit += row.debit
    acc.credit += row.credit
    return acc
  }, { debit: 0, credit: 0 })

  const net = pl.reduce((sum, row) => sum + row.amount, 0)

  return (
    <div className="space-y-6 p-8">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <Card><div className="text-sm text-slate-500">Accounts</div><div className="mt-3 text-3xl font-semibold">{state.accounts.length}</div></Card>
        <Card><div className="text-sm text-slate-500">Draft Vouchers</div><div className="mt-3 text-3xl font-semibold">{state.vouchers.filter(v => v.status === 'draft').length}</div></Card>
        <Card><div className="text-sm text-slate-500">Posted Total</div><div className="mt-3 text-3xl font-semibold">{money(totals.debit)}</div></Card>
        <Card><div className="text-sm text-slate-500">Net Result</div><div className="mt-3 text-3xl font-semibold">{money(net)}</div></Card>
      </div>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Recent Vouchers</h3>
        <div className="space-y-3">
          {state.vouchers.slice(0, 5).map((voucher) => (
            <div key={voucher.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3">
              <div>
                <div className="font-medium">{voucher.voucherNo}</div>
                <div className="text-sm text-slate-500">{voucher.voucherDate} — {voucher.narration}</div>
              </div>
              <VoucherStatusBadge status={voucher.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
