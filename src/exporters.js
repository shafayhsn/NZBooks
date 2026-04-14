import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

export function exportRowsToExcel(name, rows) {
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Report')
  XLSX.writeFile(wb, `${name}.xlsx`)
}

export function exportTableToPdf(title, subtitle, columns, rows) {
  const doc = new jsPDF('p', 'mm', 'a4')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.text(title, 14, 16)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(subtitle, 14, 22)

  autoTable(doc, {
    startY: 28,
    head: [columns],
    body: rows,
    theme: 'grid',
    styles: { fontSize: 8.5, cellPadding: 2.2, lineColor: [0,0,0], lineWidth: 0.1, textColor: [20,20,20] },
    headStyles: { fillColor: [245,245,245], textColor: [20,20,20], fontStyle: 'bold' },
    bodyStyles: { fillColor: [255,255,255] }
  })
  doc.save(`${title}.pdf`)
}
