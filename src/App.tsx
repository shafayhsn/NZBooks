import { useState } from 'react'
import './index.css'
import type { PageKey } from './types/accounting'
import { AppShell } from './components/layout/AppShell'
import { Topbar } from './components/layout/Topbar'
import { useAppState } from './hooks/useAppState'
import { DashboardPage } from './pages/DashboardPage'
import { AccountsPage } from './pages/AccountsPage'
import { VouchersPage } from './pages/VouchersPage'
import { GeneralLedgerPage } from './pages/GeneralLedgerPage'
import { TrialBalancePage } from './pages/TrialBalancePage'
import { ProfitLossPage } from './pages/ProfitLossPage'
import { BalanceSheetPage } from './pages/BalanceSheetPage'
import { SetupPage } from './pages/SetupPage'

export default function App() {
  const [page, setPage] = useState<PageKey>('dashboard')
  const app = useAppState()

  function titleForPage(current: PageKey) {
    switch (current) {
      case 'dashboard': return 'Dashboard'
      case 'accounts': return 'Chart of Accounts'
      case 'vouchers': return 'Vouchers'
      case 'ledger': return 'General Ledger'
      case 'trial-balance': return 'Trial Balance'
      case 'profit-loss': return 'Profit & Loss'
      case 'balance-sheet': return 'Balance Sheet'
      case 'setup': return 'Setup'
      default: return 'NZBooks'
    }
  }

  return (
    <AppShell page={page} onPageChange={setPage}>
      <Topbar title={titleForPage(page)} subtitle="NZBooks V2 — Accounting Brain" />
      {page === 'dashboard' && <DashboardPage state={app.state} />}
      {page === 'accounts' && <AccountsPage state={app.state} />}
      {page === 'vouchers' && (
        <VouchersPage
          state={app.state}
          onCreate={app.createVoucher}
          onSaveDraft={app.saveDraft}
          onPost={app.post}
          onReverse={app.reverse}
        />
      )}
      {page === 'ledger' && <GeneralLedgerPage state={app.state} />}
      {page === 'trial-balance' && <TrialBalancePage state={app.state} />}
      {page === 'profit-loss' && <ProfitLossPage state={app.state} />}
      {page === 'balance-sheet' && <BalanceSheetPage state={app.state} />}
      {page === 'setup' && <SetupPage state={app.state} onCreateAccount={app.createAccount} />}
    </AppShell>
  )
}
