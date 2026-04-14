import type { AppState, StatementRow } from '../types/accounting'
import { buildTrialBalance } from './trialBalance'

export function buildProfitLoss(state: AppState): StatementRow[] {
  const tb = buildTrialBalance(state)
  return tb.flatMap((row) => {
    const account = state.accounts.find((a) => a.id === row.accountId)
    if (!account) return []
    if (account.accountType === 'Income') {
      return [{ group: account.reportGroup, name: account.name, amount: row.credit - row.debit }]
    }
    if (account.accountType === 'Expense') {
      return [{ group: account.reportGroup, name: account.name, amount: row.debit - row.credit }]
    }
    return []
  })
}

export function buildBalanceSheet(state: AppState): StatementRow[] {
  const tb = buildTrialBalance(state)
  return tb.flatMap((row) => {
    const account = state.accounts.find((a) => a.id === row.accountId)
    if (!account) return []
    if (account.accountType === 'Asset') {
      return [{ group: account.reportGroup, name: account.name, amount: row.debit - row.credit }]
    }
    if (account.accountType === 'Liability' || account.accountType === 'Equity') {
      return [{ group: account.reportGroup, name: account.name, amount: row.credit - row.debit }]
    }
    return []
  })
}
