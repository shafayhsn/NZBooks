import type { PropsWithChildren } from 'react'

export function Modal({ open, onClose, children }: PropsWithChildren<{ open: boolean; onClose: () => void }>) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex justify-end">
          <button onClick={onClose} className="rounded-xl px-3 py-1 text-sm text-slate-600 hover:bg-slate-100">Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}
