import { useState } from 'react'
import type { AccountType } from '../../types/accounting'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

export function AccountForm({
  onCreate
}: {
  onCreate: (input: { code: string; name: string; accountType: AccountType; reportGroup: string; isActive: boolean; parentId?: string | null }) => void
}) {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [accountType, setAccountType] = useState<AccountType>('Asset')
  const [reportGroup, setReportGroup] = useState('Current Assets')

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Create Account</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Select value={accountType} onChange={(e) => setAccountType(e.target.value as AccountType)}>
          <option>Asset</option>
          <option>Liability</option>
          <option>Equity</option>
          <option>Income</option>
          <option>Expense</option>
        </Select>
        <Input placeholder="Report Group" value={reportGroup} onChange={(e) => setReportGroup(e.target.value)} />
      </div>
      <div className="mt-4">
        <Button
          onClick={() => {
            if (!code || !name) return
            onCreate({ code, name, accountType, reportGroup, isActive: true })
            setCode('')
            setName('')
          }}
        >
          Add Account
        </Button>
      </div>
    </Card>
  )
}
