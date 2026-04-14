alter table fiscal_years enable row level security;
alter table accounts enable row level security;
alter table vouchers enable row level security;
alter table voucher_lines enable row level security;
alter table app_settings enable row level security;

create policy "Public read fiscal_years" on fiscal_years for select using (true);
create policy "Public read accounts" on accounts for select using (true);
create policy "Public read vouchers" on vouchers for select using (true);
create policy "Public read voucher_lines" on voucher_lines for select using (true);
