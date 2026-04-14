import type { AppState, TrialBalanceRow } from '../types/accounting'

export function buildTrialBalance(state: AppState): TrialBalanceRow[] {
  const postedIds = new Set(state.vouchers.filter((v) => v.status === 'posted').map((v) => v.id))
  return state.accounts
    .map((account) => {
      const lines = state.voucherLines.filter((line) => postedIds.has(line.voucherId) && line.accountId === account.id)
      const net = lines.reduce((sum, line) => sum + line.debit - line.credit, 0)
      return {
        accountId: account.id,
        code: account.code,
        name: account.name,
        debit: net > 0 ? net : 0,
        credit: net < 0 ? Math.abs(net) : 0
      }
    })
    .filter((row) => row.debit !== 0 || row.credit !== 0)
}
