import { useEffect, useRef } from 'react'

// Keeps a native <dialog> in sync with an `open` flag. showModal() gives the
// focus trap, Esc handling and top-layer rendering for free.
export const useDialog = (open) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return dialogRef
}
