import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { FiChevronDown, FiX } from 'react-icons/fi'
import Collapsible from '@/components/Collapsible'
import IconButton from '@/components/IconButton'
import Logo from '@/components/Logo'
import { cn } from '@/utils/cn'

const rowClasses =
  'flex min-h-14 w-full items-center justify-between font-display text-base tracking-wide uppercase transition-colors hover:text-accent'

const MobileMenuAccordion = ({ item, onNavigate }) => {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <li className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={cn(rowClasses, open && 'text-accent')}
      >
        {item.label}
        <FiChevronDown
          aria-hidden="true"
          className={cn('size-5 transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      <Collapsible id={panelId} open={open}>
        <div className="space-y-5 pb-5 pl-3">
          {item.menu.groups.map((group) => (
            <div key={group.id}>
              <Link
                to={group.href}
                onClick={onNavigate}
                className="flex min-h-11 items-center font-display text-sm font-medium tracking-wider text-ink uppercase"
              >
                {group.title}
              </Link>
              <ul className="border-l border-line pl-4">
                {group.items.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.href}
                      onClick={onNavigate}
                      className="flex min-h-11 items-center text-sm text-ink-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            to={item.href}
            onClick={onNavigate}
            className="flex min-h-11 items-center font-display text-xs tracking-widest text-accent uppercase"
          >
            {item.menu.viewAllLabel}
          </Link>
        </div>
      </Collapsible>
    </li>
  )
}

const MobileMenu = ({ id, open, onClose, brand, navItems }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-label="Site menu"
      onClose={onClose}
      onClick={handleBackdropClick}
      className="fixed inset-y-0 right-auto left-0 m-0 h-dvh max-h-dvh w-[85vw] max-w-sm -translate-x-full bg-surface p-0 text-ink shadow-2xl transition-[translate,overlay,display] transition-discrete duration-300 ease-out backdrop:bg-ink/0 backdrop:transition-[background-color,overlay,display] backdrop:transition-discrete backdrop:duration-300 open:translate-x-0 open:backdrop:bg-ink/50 starting:open:-translate-x-full starting:open:backdrop:bg-ink/0"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
          <Logo brand={brand} onClick={onClose} className="items-start" />
          <IconButton icon={FiX} label="Close menu" onClick={onClose} className="-mr-2.5" />
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4">
          <ul>
            {navItems.map((item) =>
              item.menu ? (
                <MobileMenuAccordion key={item.id} item={item} onNavigate={onClose} />
              ) : (
                <li key={item.id} className="border-b border-line">
                  <NavLink
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) => cn(rowClasses, isActive && 'text-accent')}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </dialog>
  )
}

export default MobileMenu
