import { useCallback } from 'react'

export function useKeyboardGrid() {
  return useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const form = event.currentTarget.form
      if (!form) return
      const elements = Array.from(form.querySelectorAll('input, select, button, textarea')) as HTMLElement[]
      const index = elements.indexOf(event.currentTarget)
      if (index >= 0 && elements[index + 1]) {
        event.preventDefault()
        elements[index + 1].focus()
      }
    }
  }, [])
}
