import * as XLSX from 'xlsx'

export function exportRowsToExcel(name: string, rows: Array<Record<string, unknown>>) {
  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, name.slice(0, 31))
  XLSX.writeFile(workbook, `${name}.xlsx`)
}
