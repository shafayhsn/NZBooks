import { Button } from '../ui/Button'

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <p className="text-sm text-slate-500">{subtitle ?? 'NZBooks V2'}</p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary">Export</Button>
        <Button>New</Button>
      </div>
    </header>
  )
}
