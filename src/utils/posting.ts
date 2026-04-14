import type { AppState, Voucher, VoucherLine } from '../types/accounting'
import { isVoucherBalanced } from './voucherValidation'

export function getActiveFiscalYear(state: AppState) {
  return state.fiscalYears.find((f) => f.isActive) ?? null
}

export function assertVoucherDateAllowed(state: AppState, voucherDate: string) {
  const fy = getActiveFiscalYear(state)
  if (!fy) return
  if (fy.lockDate && voucherDate <= fy.lockDate) {
    throw new Error(`Voucher date is locked up to ${fy.lockDate}`)
  }
}

export function postVoucher(state: AppState, voucherId: string): AppState {
  const voucher = state.vouchers.find((v) => v.id === voucherId)
  if (!voucher) throw new Error('Voucher not found')
  if (voucher.status !== 'draft') throw new Error('Only draft vouchers can be posted')

  const lines = state.voucherLines.filter((l) => l.voucherId === voucherId)
  if (!isVoucherBalanced(lines)) throw new Error('Voucher is not balanced')

  assertVoucherDateAllowed(state, voucher.voucherDate)

  return {
    ...state,
    vouchers: state.vouchers.map((v) =>
      v.id === voucherId
        ? { ...v, status: 'posted', postedAt: new Date().toISOString() }
        : v
    )
  }
}

export function addVoucher(state: AppState, voucher: Voucher, lines: VoucherLine[]): AppState {
  assertVoucherDateAllowed(state, voucher.voucherDate)
  return {
    ...state,
    vouchers: [voucher, ...state.vouchers],
    voucherLines: [...state.voucherLines, ...lines]
  }
}

export function updateDraftVoucher(state: AppState, voucher: Voucher, lines: VoucherLine[]): AppState {
  const current = state.vouchers.find((v) => v.id === voucher.id)
  if (!current) throw new Error('Voucher not found')
  if (current.status !== 'draft') throw new Error('Posted vouchers cannot be edited')
  assertVoucherDateAllowed(state, voucher.voucherDate)

  return {
    ...state,
    vouchers: state.vouchers.map((v) => (v.id === voucher.id ? voucher : v)),
    voucherLines: [...state.voucherLines.filter((l) => l.voucherId !== voucher.id), ...lines]
  }
}

export function reverseVoucher(state: AppState, voucherId: string): AppState {
  const original = state.vouchers.find((v) => v.id === voucherId)
  if (!original) throw new Error('Voucher not found')
  if (original.status !== 'posted') throw new Error('Only posted vouchers can be reversed')

  const originalLines = state.voucherLines.filter((l) => l.voucherId === voucherId)
  const newId = crypto.randomUUID()
  const newVoucherNo = `${original.voucherNo}-REV`
  const reversedVoucher: Voucher = {
    id: newId,
    voucherNo: newVoucherNo,
    voucherDate: new Date().toISOString().slice(0, 10),
    voucherType: original.voucherType,
    narration: `Reversal of ${original.voucherNo}`,
    status: 'posted',
    fiscalYearId: original.fiscalYearId,
    reversedFromId: original.id,
    createdAt: new Date().toISOString(),
    postedAt: new Date().toISOString()
  }

  const reversedLines: VoucherLine[] = originalLines.map((line, idx) => ({
    ...line,
    id: crypto.randomUUID(),
    voucherId: newId,
    debit: line.credit,
    credit: line.debit,
    lineNo: idx + 1
  }))

  return {
    ...state,
    vouchers: [{ ...original, status: 'reversed' }, reversedVoucher, ...state.vouchers.filter((v) => v.id !== original.id)],
    voucherLines: [...state.voucherLines, ...reversedLines]
  }
}
