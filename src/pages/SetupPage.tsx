import type { AppState } from '../types/accounting'
import { AccountForm } from '../components/setup/AccountForm'
import { FiscalYearForm } from '../components/setup/FiscalYearForm'
import { LockDateForm } from '../components/setup/LockDateForm'

export function SetupPage({
  state,
  onCreateAccount
}: {
  state: AppState
  onCreateAccount: Parameters<typeof AccountForm>[0]['onCreate']
}) {
  const activeYear = state.fiscalYears.find((f) => f.isActive) ?? null

  return (
    <div className="space-y-6 p-8">
      <FiscalYearForm fiscalYear={activeYear} />
      <LockDateForm lockDate={activeYear?.lockDate} />
      <AccountForm onCreate={onCreateAccount} />
    </div>
  )
}
