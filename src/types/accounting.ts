export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense'
export type VoucherStatus = 'draft' | 'posted' | 'reversed'
export type PageKey =
  | 'dashboard'
  | 'accounts'
  | 'vouchers'
  | 'ledger'
  | 'trial-balance'
  | 'profit-loss'
  | 'balance-sheet'
  | 'setup'

export interface Account {
  id: string
  code: string
  name: string
  accountType: AccountType
  reportGroup: string
  parentId?: string | null
  isActive: boolean
}

export interface VoucherLine {
  id: string
  voucherId: string
  accountId: string
  description: string
  debit: number
  credit: number
  lineNo: number
}

export interface Voucher {
  id: string
  voucherNo: string
  voucherDate: string
  voucherType: string
  narration: string
  status: VoucherStatus
  fiscalYearId: string
  reversedFromId?: string | null
  createdAt: string
  postedAt?: string | null
}

export interface FiscalYear {
  id: string
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  lockDate?: string | null
}

export interface LedgerRow {
  voucherNo: string
  voucherDate: string
  narration: string
  debit: number
  credit: number
  balance: number
  status: VoucherStatus
}

export interface TrialBalanceRow {
  accountId: string
  code: string
  name: string
  debit: number
  credit: number
}

export interface StatementRow {
  group: string
  name: string
  amount: number
}

export interface AppState {
  accounts: Account[]
  vouchers: Voucher[]
  voucherLines: VoucherLine[]
  fiscalYears: FiscalYear[]
}
