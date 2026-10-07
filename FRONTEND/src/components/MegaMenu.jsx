import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@/utils/cn'
import { splitIntoColumns } from '@/utils/splitIntoColumns'

const CLOSE_DELAY_MS = 150

const MegaMenu = ({ item }) => {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const closeTimer = useRef(null)
  const { menu } = item
  const columns = splitIntoColumns(menu.groups, 2)
  const { pathname } = useLocation()
  const active = menu.groups.some(
    (group) => pathname === group.href || group.items.some((link) => pathname === link.href),
  )

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Safari does not focus a clicked button, so blur alone misses outside clicks.
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  const openMenu = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const closeMenu = () => {
    clearTimeout(closeTimer.current)
    setOpen(false)
  }

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'mouse') openMenu()
  }

  const handlePointerLeave = (event) => {
    if (event.pointerType !== 'mouse') return
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape' || !open) return
    closeMenu()
    triggerRef.current?.focus()
  }

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeMenu()
  }

  return (
    <li
      ref={rootRef}
      className="relative"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? closeMenu() : openMenu())}
        className={cn(
          'link-underline flex min-h-11 items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors hover:text-gold xl:text-base',
          (open || active) && 'text-gold',
        )}
      >
        {item.label}
        <FiChevronDown
          aria-hidden="true"
          className={cn('size-4 transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          'absolute top-full -left-6 z-10 pt-3 transition-[opacity,translate,visibility]',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <div className="w-max max-w-[calc(100vw-2rem)] rounded-card border border-ink/10 bg-bg p-8 shadow-soft">
          <p className="inline-block border-b-2 border-gold pb-2 text-sm font-medium tracking-widest text-gold uppercase">
            {menu.title}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-16">
            {columns.map((column) => (
              <div key={column[0].id} className="flex flex-col gap-6">
                {column.map((group) => (
                  <div key={group.id}>
                    <Link
                      to={group.href}
                      onClick={closeMenu}
                      className="text-sm font-medium tracking-wider text-ink uppercase transition-colors hover:text-gold"
                    >
                      {group.title}
                    </Link>
                    <ul className="mt-2 space-y-1.5">
                      {group.items.map((link) => (
                        <li key={link.id}>
                          <Link
                            to={link.href}
                            onClick={closeMenu}
                            className="text-sm text-ink/70 transition-colors hover:text-gold"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

export default MegaMenu
