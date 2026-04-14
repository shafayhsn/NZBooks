import type { AppState } from '../types/accounting'
import { buildTrialBalance } from '../utils/trialBalance'
import { TrialBalanceTable } from '../components/reports/TrialBalanceTable'
import { PrintReportLayout } from '../components/reports/PrintReportLayout'
import { exportRowsToExcel } from '../lib/exportExcel'
import { exportTableToPdf } from '../lib/exportPdf'
import { Button } from '../components/ui/Button'

export function TrialBalancePage({ state }: { state: AppState }) {
  const rows = buildTrialBalance(state)
  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => exportRowsToExcel('Trial_Balance', rows as unknown as Array<Record<string, unknown>>)}>Excel</Button>
        <Button variant="secondary" onClick={() => exportTableToPdf('Trial Balance', ['Code', 'Account', 'Debit', 'Credit'], rows.map(r => [r.code, r.name, String(r.debit), String(r.credit)]))}>PDF</Button>
      </div>
      <PrintReportLayout title="Trial Balance">
        <TrialBalanceTable rows={rows} />
      </PrintReportLayout>
    </div>
  )
}
