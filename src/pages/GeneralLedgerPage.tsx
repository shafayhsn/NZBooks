import { useMemo, useState } from 'react'
import type { AppState } from '../types/accounting'
import { Card } from '../components/ui/Card'
import { LedgerFilters } from '../components/ledger/LedgerFilters'
import { LedgerTable } from '../components/ledger/LedgerTable'
import { buildLedger } from '../utils/ledger'
import { exportRowsToExcel } from '../lib/exportExcel'
import { exportTableToPdf } from '../lib/exportPdf'
import { Button } from '../components/ui/Button'

export function GeneralLedgerPage({ state }: { state: AppState }) {
  const [accountId, setAccountId] = useState(state.accounts[0]?.id ?? '')
  const rows = useMemo(() => buildLedger(state, accountId), [state, accountId])

  return (
    <div className="space-y-6 p-8">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">General Ledger</h3>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => exportRowsToExcel('General_Ledger', rows.map(r => ({ ...r } as Record<string, unknown>)))}>Excel</Button>
            <Button variant="secondary" onClick={() => exportTableToPdf('General Ledger', ['Voucher', 'Date', 'Narration', 'Debit', 'Credit', 'Balance'], rows.map(r => [r.voucherNo, r.voucherDate, r.narration, String(r.debit), String(r.credit), String(r.balance)]))}>PDF</Button>
          </div>
        </div>
        <LedgerFilters accounts={state.accounts} value={accountId} onChange={setAccountId} />
        <LedgerTable rows={rows} />
      </Card>
    </div>
  )
}
