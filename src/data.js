export const company = {
  name: 'Nizamia Apparels / NZBooks Demo',
  period: 'As on April 08, 2026',
  licensed: 'Licensed by KS'
}

export const voucherTemplates = {
  cash_payment: {
    title: 'CASH PAYMENT VOUCHER',
    number: 'CPV-000145',
    date: '08 Apr 2026',
    narration: 'Payment against local supplier denim fabric invoice.',
    amountWords: 'PKR Six Million Three Hundred Eleven Thousand One Hundred Twelve Only',
    lines: [
      { account: 'Rose Textile', debit: 6311112, credit: 0 },
      { account: 'Cash Account', debit: 0, credit: 6311112 }
    ]
  },
  cash_receipt: {
    title: 'CASH RECEIPT VOUCHER',
    number: 'CRV-000031',
    date: '08 Apr 2026',
    narration: 'Cash received against local receivable.',
    amountWords: 'PKR Eight Hundred Forty Four Thousand Three Hundred Eighty Four Only',
    lines: [
      { account: 'Cash Account', debit: 844384, credit: 0 },
      { account: 'Digital Lola Commerce (Venca)', debit: 0, credit: 844384 }
    ]
  },
  bank_payment: {
    title: 'BANK PAYMENT VOUCHER',
    number: 'BPV-000077',
    date: '08 Apr 2026',
    narration: 'Bank payment against yarn supplier balance.',
    amountWords: 'PKR Five Million Five Hundred Eight Thousand Seven Hundred Two Only',
    lines: [
      { account: 'Indus Lyallpur Limited', debit: 5508702, credit: 0 },
      { account: 'Bank Account', debit: 0, credit: 5508702 }
    ]
  },
  bank_receipt: {
    title: 'BANK RECEIPT VOUCHER',
    number: 'BRV-000024',
    date: '08 Apr 2026',
    narration: 'Collection received through bank transfer.',
    amountWords: 'PKR Thirteen Million Fifteen Thousand Two Hundred Ninety Six Only',
    lines: [
      { account: 'Bank Account', debit: 13015296, credit: 0 },
      { account: 'STAR RIDE KIDS INV', debit: 0, credit: 13015296 }
    ]
  },
  journal: {
    title: 'JOURNAL VOUCHER',
    number: 'JV-000221',
    date: '08 Apr 2026',
    narration: 'Utility accrual and month-end adjustment.',
    amountWords: 'PKR Forty Eight Thousand Five Hundred Only',
    lines: [
      { account: 'Utilities Expense', debit: 48500, credit: 0 },
      { account: 'Accounts Payable', debit: 0, credit: 48500 }
    ]
  }
}

export const ledgerAccounts = {
  bank: {
    code: '1010',
    name: 'Bank Account',
    rows: [
      { voucher: 'BRV-000024', date: '08 Apr 2026', narration: 'Collection received through bank transfer', debit: 13015296, credit: 0, balance: 13015296 },
      { voucher: 'BPV-000077', date: '08 Apr 2026', narration: 'Bank payment against yarn supplier balance', debit: 0, credit: 5508702, balance: 7506594 },
      { voucher: 'JV-000229', date: '09 Apr 2026', narration: 'Bank charges', debit: 0, credit: 1500, balance: 7505094 }
    ]
  },
  sales: {
    code: '4000',
    name: 'Sales',
    rows: [
      { voucher: 'BRV-000024', date: '08 Apr 2026', narration: 'Collection allocated against sales', debit: 0, credit: 13015296, balance: -13015296 },
      { voucher: 'CRV-000031', date: '08 Apr 2026', narration: 'Cash collection against sales', debit: 0, credit: 844384, balance: -13859680 }
    ]
  },
  payable: {
    code: '2000',
    name: 'Accounts Payable',
    rows: [
      { voucher: 'JV-000221', date: '08 Apr 2026', narration: 'Utility accrual and month-end adjustment', debit: 0, credit: 48500, balance: -48500 }
    ]
  }
}

export const subLedgerBalance = [
  {
    code: '153000',
    group: 'LOCAL RECEIVABLE',
    rows: [
      { code: '153014', name: 'Rose Textile', billsPayment: 6311112, billsReceived: 0, debit: 6311112, credit: 0 },
      { code: '153020', name: 'ZAHRA TEXTILE', billsPayment: 0, billsReceived: 0, debit: 0, credit: 6311122 }
    ]
  },
  {
    code: '154300',
    group: 'EXPORT RECEIVABLES',
    rows: [
      { code: '154310', name: 'Digital Lola Commerce(Venca)', billsPayment: 844384, billsReceived: 0, debit: 844384, credit: 0 },
      { code: '154312', name: 'STAR RIDE KIDS INV', billsPayment: 68599440, billsReceived: 55584144, debit: 13015296, credit: 0 }
    ]
  },
  {
    code: '177000',
    group: 'STAFF LOANS & ADVANCES',
    rows: [
      { code: '177008', name: 'ALI MECHANIC', billsPayment: 250000, billsReceived: 234000, debit: 16000, credit: 0 },
      { code: '177014', name: 'USAMA OUT DOOR', billsPayment: 75000, billsReceived: 72000, debit: 3000, credit: 0 },
      { code: '177067', name: 'Anwar Watchman', billsPayment: 10000, billsReceived: 5000, debit: 5000, credit: 0 },
      { code: '177069', name: 'Syed Production manger', billsPayment: 188750, billsReceived: 0, debit: 188750, credit: 0 },
      { code: '177092', name: 'Shafay Hassan', billsPayment: 117321, billsReceived: 112321, debit: 5000, credit: 0 },
      { code: '177203', name: 'Owais Outdoor', billsPayment: 35500, billsReceived: 34484, debit: 1016, credit: 0 },
      { code: '177262', name: 'Anjum Shahzad', billsPayment: 100000, billsReceived: 0, debit: 100000, credit: 0 },
      { code: '177269', name: 'Asif Admin', billsPayment: 40500, billsReceived: 34500, debit: 6000, credit: 0 },
      { code: '177297', name: 'Ifran G.M', billsPayment: 340000, billsReceived: 230000, debit: 110000, credit: 0 },
      { code: '177344', name: 'Walid cutting', billsPayment: 121500, billsReceived: 116500, debit: 5000, credit: 0 },
      { code: '177350', name: 'ASIF FABRIC INCHARGE', billsPayment: 90000, billsReceived: 80000, debit: 10000, credit: 0 },
      { code: '177358', name: 'RIZWAN WATCHMAN', billsPayment: 5000, billsReceived: 0, debit: 5000, credit: 0 }
    ]
  },
  {
    code: '360100',
    group: 'YARN - PAYABLES',
    rows: [
      { code: '360103', name: 'Mariyam Textile', billsPayment: 298758, billsReceived: 0, debit: 298758, credit: 0 },
      { code: '360116', name: 'Indus Lyallpur Limited', billsPayment: 7037700, billsReceived: 1528998, debit: 5508702, credit: 0 },
      { code: '360117', name: 'Libral impex (Denim)', billsPayment: 40500, billsReceived: 0, debit: 40500, credit: 0 }
    ]
  },
  {
    code: '360200',
    group: 'FABRIC PAYABLES',
    rows: [
      { code: '360218', name: 'Abdul Qadir Rajwani', billsPayment: 1030673, billsReceived: 1285148, debit: 0, credit: 254475 },
      { code: '360219', name: 'MB Textile', billsPayment: 2000000, billsReceived: 0, debit: 2000000, credit: 0 },
      { code: '360236', name: 'Siddiqsons Limited', billsPayment: 18054, billsReceived: 0, debit: 18054, credit: 0 },
      { code: '360636', name: 'Ghulam Rasool', billsPayment: 38307841, billsReceived: 42265273, debit: 0, credit: 3957432 },
      { code: '360639', name: 'ZAM ZAM TRADERS', billsPayment: 0, billsReceived: 1060130, debit: 0, credit: 1060130 },
      { code: '360640', name: 'AZUL DENIM PVT LIMITED', billsPayment: 18185872, billsReceived: 18185871, debit: 1, credit: 0 }
    ]
  }
]
