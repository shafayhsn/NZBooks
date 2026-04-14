import type { StatementRow } from '../../types/accounting'
import { money } from '../../lib/format'
import { Table } from '../ui/Table'

export function BalanceSheetTable({ rows }: { rows: StatementRow[] }) {
  const total = rows.reduce((sum, row) => sum + row.amount, 0)
  return (
    <Table>
      <thead className="bg-slate-50 text-slate-500">
        <tr>
          <th className="px-4 py-3 text-left font-medium">Group</th>
          <th className="px-4 py-3 text-left font-medium">Account</th>
          <th className="px-4 py-3 text-left font-medium">Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="border-t border-slate-100">
            <td className="px-4 py-3">{row.group}</td>
            <td className="px-4 py-3">{row.name}</td>
            <td className="px-4 py-3">{money(row.amount)}</td>
          </tr>
        ))}
        <tr className="border-t-2 border-slate-300 font-semibold">
          <td className="px-4 py-3" colSpan={2}>Total</td>
          <td className="px-4 py-3">{money(total)}</td>
        </tr>
      </tbody>
    </Table>
  )
}
