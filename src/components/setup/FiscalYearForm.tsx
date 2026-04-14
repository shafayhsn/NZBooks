import type { FiscalYear } from '../../types/accounting'
import { Input } from '../ui/Input'
import { Card } from '../ui/Card'

export function FiscalYearForm({ fiscalYear }: { fiscalYear: FiscalYear | null }) {
  if (!fiscalYear) return null
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Active Fiscal Year</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input value={fiscalYear.name} disabled />
        <Input value={fiscalYear.startDate} disabled />
        <Input value={fiscalYear.endDate} disabled />
        <Input value={fiscalYear.lockDate ?? ''} disabled />
      </div>
    </Card>
  )
}
