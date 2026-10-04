import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@/utils/cn'
import { splitIntoColumns } from '@/utils/splitIntoColumns'

const CLOSE_DELAY_MS = 150

const MegaMenu = ({ item }) => {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const triggerRef = useRef(null)
  const closeTimer = useRef(null)
  const { menu } = item
  const columns = splitIntoColumns(menu.groups, 2)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

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
          'link-underline flex min-h-11 items-center gap-1 font-display text-base tracking-wide uppercase transition-colors hover:text-accent xl:text-lg',
          open && 'text-accent',
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
          'absolute top-full -left-6 z-10 pt-3 transition-[opacity,translate,visibility] duration-200 ease-out',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <div className="w-max max-w-[calc(100vw-2rem)] border border-line bg-surface p-8 shadow-xl shadow-ink/10">
          <p className="inline-block border-b-2 border-accent pb-2 font-display text-sm tracking-widest text-accent uppercase">
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
                      className="font-display text-sm font-medium tracking-wider text-ink uppercase transition-colors hover:text-accent"
                    >
                      {group.title}
                    </Link>
                    <ul className="mt-2 space-y-1.5">
                      {group.items.map((link) => (
                        <li key={link.id}>
                          <Link
                            to={link.href}
                            onClick={closeMenu}
                            className="text-sm text-ink-muted transition-colors hover:text-accent"
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

          <div className="mt-7 border-t border-line pt-4">
            <Link
              to={item.href}
              onClick={closeMenu}
              className="link-underline font-display text-xs tracking-widest text-accent uppercase"
            >
              {menu.viewAllLabel}
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export default MegaMenu
