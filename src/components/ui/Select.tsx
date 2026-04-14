import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn('w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400', props.className)} />
}
