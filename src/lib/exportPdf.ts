import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportTableToPdf(title: string, columns: string[], rows: string[][]) {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text(title, 14, 16)
  autoTable(doc, {
    startY: 24,
    head: [columns],
    body: rows
  })
  doc.save(`${title}.pdf`)
}
