import type { Account, VoucherLine } from '../../types/accounting'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

export function VoucherGrid({
  accounts,
  lines,
  onChange,
  onAddLine,
  disabled,
  onKeyDown
}: {
  accounts: Account[]
  lines: VoucherLine[]
  onChange: (lines: VoucherLine[]) => void
  onAddLine: () => void
  disabled?: boolean
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}) {
  function update(index: number, patch: Partial<VoucherLine>) {
    onChange(lines.map((line, i) => (i === index ? { ...line, ...patch } : line)))
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Account</th>
            <th className="px-4 py-3 text-left font-medium">Description</th>
            <th className="px-4 py-3 text-left font-medium">Debit</th>
            <th className="px-4 py-3 text-left font-medium">Credit</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, index) => (
            <tr key={line.id} className="border-t border-slate-100">
              <td className="px-4 py-3">
                <Select
                  disabled={disabled}
                  value={line.accountId}
                  onChange={(e) => update(index, { accountId: e.target.value })}
                >
                  <option value="">Select account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.code} — {account.name}
                    </option>
                  ))}
                </Select>
              </td>
              <td className="px-4 py-3">
                <Input
                  disabled={disabled}
                  value={line.description}
                  onChange={(e) => update(index, { description: e.target.value })}
                />
              </td>
              <td className="px-4 py-3">
                <Input
                  disabled={disabled}
                  type="number"
                  step="0.01"
                  value={line.debit}
                  onKeyDown={onKeyDown}
                  onChange={(e) => update(index, { debit: Number(e.target.value || 0) })}
                />
              </td>
              <td className="px-4 py-3">
                <Input
                  disabled={disabled}
                  type="number"
                  step="0.01"
                  value={line.credit}
                  onKeyDown={onKeyDown}
                  onChange={(e) => update(index, { credit: Number(e.target.value || 0) })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!disabled && (
        <div className="p-4">
          <Button variant="secondary" onClick={onAddLine}>Add Line</Button>
        </div>
      )}
    </div>
  )
}
