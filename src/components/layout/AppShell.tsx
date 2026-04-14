import type { PropsWithChildren } from 'react'
import type { PageKey } from '../../types/accounting'
import { Sidebar } from './Sidebar'

export function AppShell({
  page,
  onPageChange,
  children
}: PropsWithChildren<{ page: PageKey; onPageChange: (page: PageKey) => void }>) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar page={page} onChange={onPageChange} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
