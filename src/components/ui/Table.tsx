import type { PropsWithChildren } from 'react'

export function Table({ children }: PropsWithChildren) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  )
}
