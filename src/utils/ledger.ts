import type { AppState, LedgerRow } from '../types/accounting'

export function buildLedger(state: AppState, accountId: string): LedgerRow[] {
  const vouchersById = Object.fromEntries(state.vouchers.map((v) => [v.id, v]))
  const rows = state.voucherLines
    .filter((line) => line.accountId === accountId)
    .map((line) => ({ line, voucher: vouchersById[line.voucherId] }))
    .filter((item) => item.voucher?.status === 'posted')
    .sort((a, b) => a.voucher.voucherDate.localeCompare(b.voucher.voucherDate))

  let balance = 0
  return rows.map(({ line, voucher }) => {
    balance += line.debit - line.credit
    return {
      voucherNo: voucher.voucherNo,
      voucherDate: voucher.voucherDate,
      narration: voucher.narration,
      debit: line.debit,
      credit: line.credit,
      balance,
      status: voucher.status
    }
  })
}
