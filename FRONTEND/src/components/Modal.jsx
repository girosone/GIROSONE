import { useId } from 'react'
import { FiX } from 'react-icons/fi'
import IconButton from '@/components/IconButton'
import { useDialog } from '@/hooks/useDialog'
import { cn } from '@/utils/cn'

// `footer` is the optional action row (usually Buttons).
const Modal = ({ open, onClose, title, footer, className, children }) => {
  const dialogRef = useDialog(open)
  const titleId = useId()

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={cn(
        'm-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-lg translate-y-2 overflow-y-auto rounded-card bg-bg p-0 text-ink opacity-0 shadow-soft transition-[opacity,translate,overlay,display] transition-discrete backdrop:bg-ink/0 backdrop:transition-[background-color,overlay,display] backdrop:transition-discrete backdrop:duration-300 open:translate-y-0 open:opacity-100 open:backdrop:bg-ink/50 starting:open:translate-y-2 starting:open:opacity-0 starting:open:backdrop:bg-ink/0',
        className,
      )}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl md:text-3xl">
            {title}
          </h2>
          <IconButton icon={FiX} label="Close" onClick={onClose} className="-mt-2 -mr-2.5" />
        </div>
        <div className="mt-4">{children}</div>
        {footer && (
          <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">{footer}</div>
        )}
      </div>
    </dialog>
  )
}

export default Modal
