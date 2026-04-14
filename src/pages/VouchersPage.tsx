import { useMemo, useState } from 'react'
import type { AppState, Voucher } from '../types/accounting'
import { Card } from '../components/ui/Card'
import { VoucherForm } from '../components/vouchers/VoucherForm'
import { VoucherStatusBadge } from '../components/vouchers/VoucherStatusBadge'
import { ReversalModal } from '../components/vouchers/ReversalModal'
import { Button } from '../components/ui/Button'

export function VouchersPage({
  state,
  onCreate,
  onSaveDraft,
  onPost,
  onReverse
}: {
  state: AppState
  onCreate: Parameters<typeof VoucherForm>[0]['onCreate']
  onSaveDraft: Parameters<typeof VoucherForm>[0]['onSaveDraft']
  onPost: (voucherId: string) => void
  onReverse: (voucherId: string) => void
}) {
  const activeFiscalYear = state.fiscalYears.find((f) => f.isActive)!
  const [selectedId, setSelectedId] = useState<string | null>(state.vouchers[0]?.id ?? null)
  const [reversalId, setReversalId] = useState<string | null>(null)

  const selectedVoucher = useMemo(() => state.vouchers.find((v) => v.id === selectedId) ?? null, [state.vouchers, selectedId])
  const selectedLines = useMemo(() => state.voucherLines.filter((line) => line.voucherId === selectedId), [state.voucherLines, selectedId])

  return (
    <div className="grid grid-cols-1 gap-6 p-8 xl:grid-cols-[380px,1fr]">
      <Card className="h-fit">
        <h3 className="mb-4 text-lg font-semibold">Voucher List</h3>
        <div className="space-y-3">
          {state.vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="rounded-2xl border border-slate-100 p-4"
            >
              <button className="w-full text-left" onClick={() => setSelectedId(voucher.id)}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{voucher.voucherNo}</div>
                  <VoucherStatusBadge status={voucher.status} />
                </div>
                <div className="mt-1 text-sm text-slate-500">{voucher.voucherDate}</div>
                <div className="mt-1 text-sm text-slate-600">{voucher.narration}</div>
              </button>
              {voucher.status === 'posted' && (
                <div className="mt-3">
                  <Button variant="danger" onClick={() => setReversalId(voucher.id)}>Reverse</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Voucher Entry</h3>
        <VoucherForm
          accounts={state.accounts}
          fiscalYear={activeFiscalYear}
          selectedVoucher={selectedVoucher}
          selectedLines={selectedLines}
          onCreate={onCreate}
          onSaveDraft={onSaveDraft}
          onPost={onPost}
        />
      </Card>

      <ReversalModal
        open={Boolean(reversalId)}
        onClose={() => setReversalId(null)}
        onConfirm={() => {
          if (reversalId) onReverse(reversalId)
          setReversalId(null)
        }}
      />
    </div>
  )
}
