import { useEffect, useMemo, useState } from 'react'
import type { Account, FiscalYear, Voucher, VoucherLine } from '../../types/accounting'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { VoucherGrid } from './VoucherGrid'
import { VoucherToolbar } from './VoucherToolbar'
import { VoucherTotals } from './VoucherTotals'
import { getVoucherTotals, isVoucherBalanced } from '../../utils/voucherValidation'
import { todayISO } from '../../lib/date'
import { useKeyboardGrid } from '../../hooks/useKeyboardGrid'

function emptyLine(voucherId: string, lineNo: number): VoucherLine {
  return {
    id: crypto.randomUUID(),
    voucherId,
    accountId: '',
    description: '',
    debit: 0,
    credit: 0,
    lineNo
  }
}

export function VoucherForm({
  accounts,
  fiscalYear,
  selectedVoucher,
  selectedLines,
  onCreate,
  onSaveDraft,
  onPost
}: {
  accounts: Account[]
  fiscalYear: FiscalYear
  selectedVoucher?: Voucher | null
  selectedLines?: VoucherLine[]
  onCreate: (voucher: Voucher, lines: VoucherLine[]) => void
  onSaveDraft: (voucher: Voucher, lines: VoucherLine[]) => void
  onPost: (voucherId: string) => void
}) {
  const initialVoucherId = selectedVoucher?.id ?? crypto.randomUUID()
  const [voucher, setVoucher] = useState<Voucher>(
    selectedVoucher ?? {
      id: initialVoucherId,
      voucherNo: `JV-${Math.floor(Math.random() * 9000 + 1000)}`,
      voucherDate: todayISO(),
      voucherType: 'Journal',
      narration: '',
      status: 'draft',
      fiscalYearId: fiscalYear.id,
      createdAt: new Date().toISOString()
    }
  )

  const [lines, setLines] = useState<VoucherLine>(
    undefined as unknown as VoucherLine
  )

  useEffect(() => {
    const nextVoucher = selectedVoucher ?? {
      id: crypto.randomUUID(),
      voucherNo: `JV-${Math.floor(Math.random() * 9000 + 1000)}`,
      voucherDate: todayISO(),
      voucherType: 'Journal',
      narration: '',
      status: 'draft',
      fiscalYearId: fiscalYear.id,
      createdAt: new Date().toISOString()
    }
    setVoucher(nextVoucher)
    setLines((selectedLines && selectedLines.length > 0 ? selectedLines : [emptyLine(nextVoucher.id, 1), emptyLine(nextVoucher.id, 2)]) as unknown as VoucherLine)
  }, [selectedVoucher, selectedLines, fiscalYear.id])

  const linesArray = (Array.isArray(lines) ? lines : []) as unknown as VoucherLine[]
  const totals = useMemo(() => getVoucherTotals(linesArray), [linesArray])
  const canPost = voucher.status === 'draft' && isVoucherBalanced(linesArray)
  const onKeyDown = useKeyboardGrid()

  function addLine() {
    setLines([...(linesArray), emptyLine(voucher.id, linesArray.length + 1)] as unknown as VoucherLine)
  }

  function fresh() {
    const id = crypto.randomUUID()
    setVoucher({
      id,
      voucherNo: `JV-${Math.floor(Math.random() * 9000 + 1000)}`,
      voucherDate: todayISO(),
      voucherType: 'Journal',
      narration: '',
      status: 'draft',
      fiscalYearId: fiscalYear.id,
      createdAt: new Date().toISOString()
    })
    setLines([emptyLine(id, 1), emptyLine(id, 2)] as unknown as VoucherLine)
  }

  return (
    <div>
      <VoucherToolbar
        onNew={fresh}
        onSave={() => (selectedVoucher ? onSaveDraft(voucher, linesArray) : onCreate(voucher, linesArray))}
        onPost={() => onPost(voucher.id)}
        canPost={canPost}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm text-slate-600">Voucher No</label>
          <Input value={voucher.voucherNo} onChange={(e) => setVoucher({ ...voucher, voucherNo: e.target.value })} disabled={voucher.status !== 'draft'} />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-600">Date</label>
          <Input type="date" value={voucher.voucherDate} onChange={(e) => setVoucher({ ...voucher, voucherDate: e.target.value })} disabled={voucher.status !== 'draft'} />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-600">Type</label>
          <Select value={voucher.voucherType} onChange={(e) => setVoucher({ ...voucher, voucherType: e.target.value })} disabled={voucher.status !== 'draft'}>
            <option>Journal</option>
            <option>Payment</option>
            <option>Receipt</option>
            <option>Contra</option>
          </Select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-600">Status</label>
          <Input value={voucher.status} disabled />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm text-slate-600">Narration</label>
        <Input value={voucher.narration} onChange={(e) => setVoucher({ ...voucher, narration: e.target.value })} disabled={voucher.status !== 'draft'} />
      </div>

      <div className="mt-5">
        <VoucherGrid
          accounts={accounts}
          lines={linesArray}
          onChange={(next) => setLines(next as unknown as VoucherLine)}
          onAddLine={addLine}
          disabled={voucher.status !== 'draft'}
          onKeyDown={onKeyDown}
        />
      </div>

      <VoucherTotals debit={totals.debit} credit={totals.credit} />
    </div>
  )
}
