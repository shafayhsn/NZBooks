import type { VoucherLine } from '../types/accounting'

export function getVoucherTotals(lines: VoucherLine[]) {
  const debit = lines.reduce((sum, line) => sum + Number(line.debit || 0), 0)
  const credit = lines.reduce((sum, line) => sum + Number(line.credit || 0), 0)
  return { debit, credit }
}

export function isVoucherBalanced(lines: VoucherLine[]) {
  const { debit, credit } = getVoucherTotals(lines)
  return lines.length >= 2 && Math.abs(debit - credit) < 0.005
}
