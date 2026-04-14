import type { PageKey } from '../../types/accounting'
import { cn } from '../../lib/cn'

const items: Array<{ key: PageKey; label: string }> = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'accounts', label: 'Chart of Accounts' },
  { key: 'vouchers', label: 'Vouchers' },
  { key: 'ledger', label: 'General Ledger' },
  { key: 'trial-balance', label: 'Trial Balance' },
  { key: 'profit-loss', label: 'Profit & Loss' },
  { key: 'balance-sheet', label: 'Balance Sheet' },
  { key: 'setup', label: 'Setup' }
]

export function Sidebar({ page, onChange }: { page: PageKey; onChange: (page: PageKey) => void }) {
  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-900 text-white">
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white font-bold text-slate-900">NZ</div>
          <div>
            <div className="text-xl font-semibold">NZBooks</div>
            <div className="text-sm text-slate-400">Accounting System</div>
          </div>
        </div>
      </div>
      <nav className="space-y-2 px-4 py-5">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={cn(
              'block w-full rounded-2xl px-4 py-3 text-left text-sm transition',
              page === item.key ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
