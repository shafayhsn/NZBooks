import type { Account } from '../../types/accounting'
import { Select } from '../ui/Select'

export function LedgerFilters({
  accounts,
  value,
  onChange
}: {
  accounts: Account[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="mb-4 max-w-md">
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.code} — {account.name}
          </option>
        ))}
      </Select>
    </div>
  )
}
