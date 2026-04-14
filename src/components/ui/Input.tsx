import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400', props.className)} />
}
