import type { AppState } from '../types/accounting'
import { buildBalanceSheet } from '../utils/statements'
import { BalanceSheetTable } from '../components/reports/BalanceSheetTable'
import { PrintReportLayout } from '../components/reports/PrintReportLayout'
import { exportRowsToExcel } from '../lib/exportExcel'
import { exportTableToPdf } from '../lib/exportPdf'
import { Button } from '../components/ui/Button'

export function BalanceSheetPage({ state }: { state: AppState }) {
  const rows = buildBalanceSheet(state)
  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => exportRowsToExcel('Balance_Sheet', rows as unknown as Array<Record<string, unknown>>)}>Excel</Button>
        <Button variant="secondary" onClick={() => exportTableToPdf('Balance Sheet', ['Group', 'Account', 'Amount'], rows.map(r => [r.group, r.name, String(r.amount)]))}>PDF</Button>
      </div>
      <PrintReportLayout title="Balance Sheet">
        <BalanceSheetTable rows={rows} />
      </PrintReportLayout>
    </div>
  )
}
