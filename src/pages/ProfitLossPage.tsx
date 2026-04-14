import type { AppState } from '../types/accounting'
import { buildProfitLoss } from '../utils/statements'
import { ProfitLossTable } from '../components/reports/ProfitLossTable'
import { PrintReportLayout } from '../components/reports/PrintReportLayout'
import { exportRowsToExcel } from '../lib/exportExcel'
import { exportTableToPdf } from '../lib/exportPdf'
import { Button } from '../components/ui/Button'

export function ProfitLossPage({ state }: { state: AppState }) {
  const rows = buildProfitLoss(state)
  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => exportRowsToExcel('Profit_Loss', rows as unknown as Array<Record<string, unknown>>)}>Excel</Button>
        <Button variant="secondary" onClick={() => exportTableToPdf('Profit & Loss', ['Group', 'Account', 'Amount'], rows.map(r => [r.group, r.name, String(r.amount)]))}>PDF</Button>
      </div>
      <PrintReportLayout title="Profit & Loss">
        <ProfitLossTable rows={rows} />
      </PrintReportLayout>
    </div>
  )
}
