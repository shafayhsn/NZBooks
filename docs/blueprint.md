# NZBooks V2 Blueprint

## Modules
- Dashboard
- Chart of Accounts
- Vouchers
- General Ledger
- Trial Balance
- Profit & Loss
- Balance Sheet
- Setup

## Core accounting rules
- Vouchers start as Draft
- Only balanced vouchers can be Posted
- Posted vouchers cannot be edited directly
- Posted vouchers cannot be deleted
- Reversal creates an opposite Posted voucher
- Reports use Posted vouchers only
- Voucher dates before lock date are blocked

## Later upgrades
- Supabase persistence for every action
- Audit logs
- Role-based permissions
- Print-perfect classic statement layouts
- Legacy data migration from MDB exports
