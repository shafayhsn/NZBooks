import type { LedgerRow } from '../../types/accounting'
import { money } from '../../lib/format'
import { Table } from '../ui/Table'
import { RunningBalance } from './RunningBalance'

export function LedgerTable({ rows }: { rows: LedgerRow[] }) {
  return (
    <Table>
      <thead className="bg-slate-50 text-slate-500">
        <tr>
          <th className="px-4 py-3 text-left font-medium">Voucher</th>
          <th className="px-4 py-3 text-left font-medium">Date</th>
          <th className="px-4 py-3 text-left font-medium">Narration</th>
          <th className="px-4 py-3 text-left font-medium">Debit</th>
          <th className="px-4 py-3 text-left font-medium">Credit</th>
          <th className="px-4 py-3 text-left font-medium">Balance</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="border-t border-slate-100">
            <td className="px-4 py-3">{row.voucherNo}</td>
            <td className="px-4 py-3">{row.voucherDate}</td>
            <td className="px-4 py-3">{row.narration}</td>
            <td className="px-4 py-3">{money(row.debit)}</td>
            <td className="px-4 py-3">{money(row.credit)}</td>
            <td className="px-4 py-3"><RunningBalance amount={row.balance} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
