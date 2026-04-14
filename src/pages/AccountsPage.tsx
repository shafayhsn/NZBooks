import type { AppState } from '../types/accounting'
import { Card } from '../components/ui/Card'
import { sortAccounts } from '../utils/accountGrouping'

export function AccountsPage({ state }: { state: AppState }) {
  const accounts = sortAccounts(state.accounts)
  return (
    <div className="space-y-6 p-8">
      <Card>
        <h3 className="mb-4 text-lg font-semibold">Chart of Accounts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Code</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Group</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{account.code}</td>
                  <td className="px-4 py-3">{account.name}</td>
                  <td className="px-4 py-3">{account.accountType}</td>
                  <td className="px-4 py-3">{account.reportGroup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
