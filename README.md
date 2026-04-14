# NZBooks V2

NZBooks V2 is a modern accounting application inspired by a legacy GL system.
This repo is GitHub-ready and includes a practical React + Vite + TypeScript frontend,
core accounting logic, demo mode, and Supabase schema files.

## Main capabilities
- Chart of Accounts
- Draft / Posted vouchers
- Reversal vouchers
- Lock date enforcement
- General Ledger
- Trial Balance
- Profit & Loss
- Balance Sheet
- CSV / Excel / PDF export utilities

## Quick start

```bash
npm install
npm run dev
```

## Demo mode
The app runs with in-memory demo data immediately.

## Supabase mode
1. Create a Supabase project
2. Run `supabase/schema.sql`
3. Copy `.env.example` to `.env.local`
4. Add your keys
5. Replace demo state handling with database-backed flows as needed

## Honest note
This repo is a strong V2 foundation with core accounting brain implemented in the frontend.
It is suitable for testing and further developer hardening, but it is not a regulated production accounting package yet.
