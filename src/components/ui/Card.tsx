import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/cn'

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('rounded-3xl border border-slate-200 bg-white p-5 shadow-sm', className)}>{children}</div>
}
