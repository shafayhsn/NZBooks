insert into fiscal_years (name, start_date, end_date, is_active, lock_date)
values ('2025-2026', '2025-07-01', '2026-06-30', true, '2026-03-31')
on conflict do nothing;
