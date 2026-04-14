import type { Account } from '../types/accounting'

export function sortAccounts(accounts: Account[]) {
  return [...accounts].sort((a, b) => a.code.localeCompare(b.code))
}
