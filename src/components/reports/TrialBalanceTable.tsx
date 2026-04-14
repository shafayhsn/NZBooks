import type { TrialBalanceRow } from '../../types/accounting'
import { money } from '../../lib/format'
import { Table } from '../ui/Table'

export function TrialBalanceTable({ rows }: { rows: TrialBalanceRow[] }) {
  const totals = rows.reduce((acc, row) => {
    acc.debit += row.debit
    acc.credit += row.credit
    return acc
  }, { debit: 0, credit: 0 })

  return (
    <Table>
      <thead className="bg-slate-50 text-slate-500">
        <tr>
          <th className="px-4 py-3 text-left font-medium">Code</th>
          <th className="px-4 py-3 text-left font-medium">Account</th>
          <th className="px-4 py-3 text-left font-medium">Debit</th>
          <th className="px-4 py-3 text-left font-medium">Credit</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.accountId} className="border-t border-slate-100">
            <td className="px-4 py-3">{row.code}</td>
            <td className="px-4 py-3">{row.name}</td>
            <td className="px-4 py-3">{money(row.debit)}</td>
            <td className="px-4 py-3">{money(row.credit)}</td>
          </tr>
        ))}
        <tr className="border-t-2 border-slate-300 font-semibold">
          <td className="px-4 py-3" colSpan={2}>Total</td>
          <td className="px-4 py-3">{money(totals.debit)}</td>
          <td className="px-4 py-3">{money(totals.credit)}</td>
        </tr>
      </tbody>
    </Table>
  )
}
