import type { PropsWithChildren } from 'react'

export function PrintReportLayout({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  )
}
