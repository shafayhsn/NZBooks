import React, { useMemo, useState } from 'react'
import { FileText, Printer, Download, FileSpreadsheet } from 'lucide-react'
import { company, voucherTemplates, ledgerAccounts, subLedgerBalance } from './data'
import { exportRowsToExcel, exportTableToPdf } from './exporters'

function fmt(n) {
  return new Intl.NumberFormat('en-PK', { maximumFractionDigits: 2 }).format(n)
}

function Toolbar({ title, excelRows, pdfColumns, pdfRows }) {
  return (
    <div className="toolbar">
      <button className="btn" onClick={() => window.print()}><Printer size={15}/> Print</button>
      <button className="btn" onClick={() => exportTableToPdf(title, company.name + ' | ' + company.period, pdfColumns, pdfRows)}><Download size={15}/> PDF</button>
      <button className="btn" onClick={() => exportRowsToExcel(title, excelRows)}><FileSpreadsheet size={15}/> Excel</button>
    </div>
  )
}

function Shell({ children, title }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><FileText size={20} /> NZBooks V6</div>
        <div className="side-sub">Focused reports core for Sub Ledger Balance, Voucher Prints, and Account-wise Ledger.</div>
        {children.sidebar}
      </aside>
      <main className="main">
        <div className="header">
          <div>
            <h1>{title}</h1>
            <div className="muted">{company.name} • {company.period}</div>
          </div>
        </div>
        {children.main}
      </main>
    </div>
  )
}

function ReportFrame({ title, meta, toolbar, children }) {
  return (
    <div className="report-frame">
      <div className="report-head">
        <div>
          <div className="co">{company.name}</div>
          <div className="rep-title">{title}</div>
          <div className="asof">{company.period}</div>
        </div>
        {toolbar}
      </div>
      <div className="meta-row">
        {meta.map(([k,v]) => (
          <div className="meta-item" key={k}>
            <strong>{k}:</strong> {v}
          </div>
        ))}
      </div>
      <div className="line" />
      {children}
    </div>
  )
}

function VoucherReport({ kind }) {
  const v = voucherTemplates[kind]
  const totalDebit = v.lines.reduce((s, r) => s + r.debit, 0)
  const totalCredit = v.lines.reduce((s, r) => s + r.credit, 0)
  const excelRows = v.lines.map(r => ({ Account: r.account, Debit: r.debit, Credit: r.credit }))
  const pdfRows = v.lines.map(r => [r.account, String(r.debit), String(r.credit)])

  return (
    <ReportFrame
      title={v.title}
      meta={[
        ['Voucher No', v.number],
        ['Date', v.date],
        ['Licensed', company.licensed]
      ]}
      toolbar={<Toolbar title={v.title} excelRows={excelRows} pdfColumns={['Account','Debit','Credit']} pdfRows={pdfRows} />}
    >
      <div className="voucher-box">
        <div className="voucher-heading">{v.title}</div>
        <div className="voucher-top">
          <div><strong>No:</strong> {v.number}</div>
          <div><strong>Date:</strong> {v.date}</div>
        </div>
        <table className="rpt-table">
          <thead>
            <tr>
              <th>Account Description</th>
              <th className="num">Debit</th>
              <th className="num">Credit</th>
            </tr>
          </thead>
          <tbody>
            {v.lines.map((line, i) => (
              <tr key={i}>
                <td>{line.account}</td>
                <td className="num">{fmt(line.debit)}</td>
                <td className="num">{fmt(line.credit)}</td>
              </tr>
            ))}
            <tr className="total">
              <td>Total</td>
              <td className="num">{fmt(totalDebit)}</td>
              <td className="num">{fmt(totalCredit)}</td>
            </tr>
          </tbody>
        </table>
        <div className="narr"><strong>Narration:</strong> {v.narration}</div>
        <div className="narr"><strong>Amount in Words:</strong> {v.amountWords}</div>
        <div className="signatures">
          <span>Prepared By</span>
          <span>Checked By</span>
          <span>Approved By</span>
          <span>Receiver</span>
        </div>
      </div>
    </ReportFrame>
  )
}

function LedgerReport({ accountKey }) {
  const acct = ledgerAccounts[accountKey]
  const excelRows = acct.rows.map(r => ({ Voucher: r.voucher, Date: r.date, Narration: r.narration, Debit: r.debit, Credit: r.credit, Balance: r.balance }))
  const pdfRows = acct.rows.map(r => [r.voucher, r.date, r.narration, String(r.debit), String(r.credit), String(r.balance)])
  const closing = acct.rows[acct.rows.length - 1]?.balance ?? 0

  return (
    <ReportFrame
      title="ACCOUNT WISE LEDGER"
      meta={[
        ['Account Code', acct.code],
        ['Account', acct.name],
        ['Licensed', company.licensed]
      ]}
      toolbar={<Toolbar title={`Ledger_${acct.code}`} excelRows={excelRows} pdfColumns={['Voucher','Date','Narration','Debit','Credit','Balance']} pdfRows={pdfRows} />}
    >
      <table className="rpt-table">
        <thead>
          <tr>
            <th>Voucher</th>
            <th>Date</th>
            <th>Narration</th>
            <th className="num">Debit</th>
            <th className="num">Credit</th>
            <th className="num">Balance</th>
          </tr>
        </thead>
        <tbody>
          {acct.rows.map((r, i) => (
            <tr key={i}>
              <td>{r.voucher}</td>
              <td>{r.date}</td>
              <td>{r.narration}</td>
              <td className="num">{fmt(r.debit)}</td>
              <td className="num">{fmt(r.credit)}</td>
              <td className="num">{fmt(r.balance)}</td>
            </tr>
          ))}
          <tr className="total">
            <td colSpan="5">Closing Balance</td>
            <td className="num">{fmt(closing)}</td>
          </tr>
        </tbody>
      </table>
    </ReportFrame>
  )
}

function SubLedgerBalanceReport() {
  const flatRows = []
  subLedgerBalance.forEach(group => {
    group.rows.forEach(r => {
      flatRows.push({
        GroupCode: group.code,
        Group: group.group,
        Code: r.code,
        Account: r.name,
        BillsPayment: r.billsPayment,
        BillsReceived: r.billsReceived,
        Debit: r.debit,
        Credit: r.credit
      })
    })
  })

  const pdfRows = []
  subLedgerBalance.forEach(group => {
    const totalDebit = group.rows.reduce((s, r) => s + r.debit, 0)
    const totalCredit = group.rows.reduce((s, r) => s + r.credit, 0)
    group.rows.forEach(r => {
      pdfRows.push([r.code, r.name, String(r.billsPayment), String(r.billsReceived), String(r.debit), String(r.credit)])
    })
    pdfRows.push(['', group.group + ' TOTAL', '', '', String(totalDebit), String(totalCredit)])
  })

  return (
    <ReportFrame
      title="SUB LEDGER BALANCE"
      meta={[
        ['Description', 'Party-wise grouped balances'],
        ['As On', company.period],
        ['Licensed', company.licensed]
      ]}
      toolbar={<Toolbar title="Sub_Ledger_Balance" excelRows={flatRows} pdfColumns={['Code','Account Description','Bills Payment','Bills Received','Debit','Credit']} pdfRows={pdfRows} />}
    >
      <div className="old-report-note">As on April 08, 2026</div>
      <table className="rpt-table slim">
        <thead>
          <tr>
            <th style={{width:'110px'}}>Code</th>
            <th>Account Description</th>
            <th className="num" style={{width:'140px'}}>Bills Payment</th>
            <th className="num" style={{width:'140px'}}>Bills Received</th>
            <th className="num" style={{width:'140px'}}>Debit</th>
            <th className="num" style={{width:'140px'}}>Credit</th>
          </tr>
        </thead>
        <tbody>
          {subLedgerBalance.map(group => {
            const totalDebit = group.rows.reduce((s, r) => s + r.debit, 0)
            const totalCredit = group.rows.reduce((s, r) => s + r.credit, 0)
            return (
              <React.Fragment key={group.code}>
                <tr className="group-row">
                  <td>{group.code}</td>
                  <td colSpan="5">{group.group}</td>
                </tr>
                {group.rows.map((r, i) => (
                  <tr key={group.code + i}>
                    <td>{r.code}</td>
                    <td>{r.name}</td>
                    <td className="num">{r.billsPayment ? fmt(r.billsPayment) : ''}</td>
                    <td className="num">{r.billsReceived ? fmt(r.billsReceived) : ''}</td>
                    <td className="num">{r.debit ? fmt(r.debit) : '0.00'}</td>
                    <td className="num">{r.credit ? fmt(r.credit) : '0.00'}</td>
                  </tr>
                ))}
                <tr className="subtotal">
                  <td colSpan="4"></td>
                  <td className="num">{fmt(totalDebit)}</td>
                  <td className="num">{fmt(totalCredit)}</td>
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </ReportFrame>
  )
}

export default function App() {
  const [reportType, setReportType] = useState('sub_ledger_balance')
  const [voucherKind, setVoucherKind] = useState('cash_payment')
  const [ledgerKey, setLedgerKey] = useState('bank')

  let content = null
  let title = 'Reports Core'

  if (reportType === 'sub_ledger_balance') {
    title = 'Sub Ledger Balance'
    content = <SubLedgerBalanceReport />
  }
  if (reportType === 'voucher') {
    title = 'Voucher Prints'
    content = <VoucherReport kind={voucherKind} />
  }
  if (reportType === 'ledger') {
    title = 'Account Wise Ledger'
    content = <LedgerReport accountKey={ledgerKey} />
  }

  return (
    <Shell title={title}>
      {{
        sidebar: (
          <>
            <div className="sidebar-block">
              <div className="sb-title">Report Family</div>
              <button className={reportType==='sub_ledger_balance' ? 'sb-btn active' : 'sb-btn'} onClick={() => setReportType('sub_ledger_balance')}>Sub Ledger Balance</button>
              <button className={reportType==='voucher' ? 'sb-btn active' : 'sb-btn'} onClick={() => setReportType('voucher')}>Voucher Prints</button>
              <button className={reportType==='ledger' ? 'sb-btn active' : 'sb-btn'} onClick={() => setReportType('ledger')}>Account Wise Ledger</button>
            </div>

            {reportType === 'voucher' && (
              <div className="sidebar-block">
                <div className="sb-title">Voucher Type</div>
                <button className={voucherKind==='cash_payment' ? 'sb-btn active' : 'sb-btn'} onClick={() => setVoucherKind('cash_payment')}>Cash Payment</button>
                <button className={voucherKind==='cash_receipt' ? 'sb-btn active' : 'sb-btn'} onClick={() => setVoucherKind('cash_receipt')}>Cash Receipt</button>
                <button className={voucherKind==='bank_payment' ? 'sb-btn active' : 'sb-btn'} onClick={() => setVoucherKind('bank_payment')}>Bank Payment</button>
                <button className={voucherKind==='bank_receipt' ? 'sb-btn active' : 'sb-btn'} onClick={() => setVoucherKind('bank_receipt')}>Bank Receipt</button>
                <button className={voucherKind==='journal' ? 'sb-btn active' : 'sb-btn'} onClick={() => setVoucherKind('journal')}>Journal Voucher</button>
              </div>
            )}

            {reportType === 'ledger' && (
              <div className="sidebar-block">
                <div className="sb-title">Ledger Account</div>
                <button className={ledgerKey==='bank' ? 'sb-btn active' : 'sb-btn'} onClick={() => setLedgerKey('bank')}>1010 - Bank Account</button>
                <button className={ledgerKey==='sales' ? 'sb-btn active' : 'sb-btn'} onClick={() => setLedgerKey('sales')}>4000 - Sales</button>
                <button className={ledgerKey==='payable' ? 'sb-btn active' : 'sb-btn'} onClick={() => setLedgerKey('payable')}>2000 - Accounts Payable</button>
              </div>
            )}
          </>
        ),
        main: content
      }}
    </Shell>
  )
}
