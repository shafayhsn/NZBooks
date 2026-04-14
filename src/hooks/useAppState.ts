import { useMemo, useState } from 'react'
import { demoData } from '../data/demoData'
import type { AppState, Account, Voucher, VoucherLine } from '../types/accounting'
import { addVoucher, postVoucher, reverseVoucher, updateDraftVoucher } from '../utils/posting'

export function useAppState() {
  const [state, setState] = useState<AppState>(demoData)
  const activeFiscalYear = useMemo(() => state.fiscalYears.find((f) => f.isActive) ?? null, [state])

  function createAccount(input: Omit<Account, 'id'>) {
    const account: Account = { ...input, id: crypto.randomUUID() }
    setState((prev) => ({ ...prev, accounts: [...prev.accounts, account] }))
  }

  function createVoucher(voucher: Voucher, lines: VoucherLine[]) {
    setState((prev) => addVoucher(prev, voucher, lines))
  }

  function saveDraft(voucher: Voucher, lines: VoucherLine[]) {
    setState((prev) => updateDraftVoucher(prev, voucher, lines))
  }

  function post(voucherId: string) {
    setState((prev) => postVoucher(prev, voucherId))
  }

  function reverse(voucherId: string) {
    setState((prev) => reverseVoucher(prev, voucherId))
  }

  return {
    state,
    activeFiscalYear,
    createAccount,
    createVoucher,
    saveDraft,
    post,
    reverse
  }
}
