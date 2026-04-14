import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/cn'

export function Badge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', className)}>{children}</span>
}
