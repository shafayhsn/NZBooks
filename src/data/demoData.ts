import type { AppState } from '../types/accounting'

const fyId = 'fy-2025'
const now = new Date().toISOString()

export const demoData: AppState = {
  fiscalYears: [
    {
      id: fyId,
      name: '2025-2026',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      isActive: true,
      lockDate: '2026-03-31'
    }
  ],
  accounts: [
    { id: 'a1', code: '1000', name: 'Cash in Hand', accountType: 'Asset', reportGroup: 'Current Assets', isActive: true },
    { id: 'a2', code: '1010', name: 'Bank Account', accountType: 'Asset', reportGroup: 'Current Assets', isActive: true },
    { id: 'a3', code: '2000', name: 'Accounts Payable', accountType: 'Liability', reportGroup: 'Current Liabilities', isActive: true },
    { id: 'a4', code: '3000', name: 'Owner Capital', accountType: 'Equity', reportGroup: 'Equity', isActive: true },
    { id: 'a5', code: '4000', name: 'Sales', accountType: 'Income', reportGroup: 'Revenue', isActive: true },
    { id: 'a6', code: '5000', name: 'Cost of Goods Sold', accountType: 'Expense', reportGroup: 'Cost of Sales', isActive: true },
    { id: 'a7', code: '5100', name: 'Utilities Expense', accountType: 'Expense', reportGroup: 'Operating Expenses', isActive: true },
    { id: 'a8', code: '5200', name: 'Rent Expense', accountType: 'Expense', reportGroup: 'Operating Expenses', isActive: true }
  ],
  vouchers: [
    {
      id: 'v1',
      voucherNo: 'JV-0001',
      voucherDate: '2026-04-05',
      voucherType: 'Journal',
      narration: 'Sales collection received in bank',
      status: 'posted',
      fiscalYearId: fyId,
      createdAt: now,
      postedAt: now
    },
    {
      id: 'v2',
      voucherNo: 'JV-0002',
      voucherDate: '2026-04-06',
      voucherType: 'Journal',
      narration: 'Utility expense accrued',
      status: 'draft',
      fiscalYearId: fyId,
      createdAt: now
    }
  ],
  voucherLines: [
    { id: 'l1', voucherId: 'v1', accountId: 'a2', description: 'Collection', debit: 185000, credit: 0, lineNo: 1 },
    { id: 'l2', voucherId: 'v1', accountId: 'a5', description: 'Sales', debit: 0, credit: 185000, lineNo: 2 },
    { id: 'l3', voucherId: 'v2', accountId: 'a7', description: 'Power and gas', debit: 48500, credit: 0, lineNo: 1 },
    { id: 'l4', voucherId: 'v2', accountId: 'a3', description: 'Accrued payable', debit: 0, credit: 48500, lineNo: 2 }
  ]
}
