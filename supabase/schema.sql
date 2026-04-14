create extension if not exists pgcrypto;

create table if not exists fiscal_years (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date not null,
  is_active boolean not null default false,
  lock_date date
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  account_type text not null check (account_type in ('Asset','Liability','Equity','Income','Expense')),
  report_group text not null,
  parent_id uuid references accounts(id),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists vouchers (
  id uuid primary key default gen_random_uuid(),
  voucher_no text not null unique,
  voucher_date date not null,
  voucher_type text not null,
  narration text not null default '',
  status text not null check (status in ('draft','posted','reversed')) default 'draft',
  fiscal_year_id uuid references fiscal_years(id),
  reversed_from_id uuid references vouchers(id),
  created_at timestamptz not null default now(),
  posted_at timestamptz
);

create table if not exists voucher_lines (
  id uuid primary key default gen_random_uuid(),
  voucher_id uuid not null references vouchers(id) on delete cascade,
  account_id uuid not null references accounts(id),
  description text not null default '',
  debit numeric(18,2) not null default 0,
  credit numeric(18,2) not null default 0,
  line_no integer not null
);

create table if not exists app_settings (
  key text primary key,
  value jsonb not null
);
