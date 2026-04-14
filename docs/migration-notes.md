# Migration Notes

Do not load legacy MDB data until:
1. The accounting logic is approved by an accountant
2. Chart of Accounts mapping is finalized
3. Opening balances are verified
4. Supplier / customer masters are cleaned

Recommended migration order:
- Accounts
- Sub accounts / parties
- Opening balances
- Voucher headers
- Voucher lines
