import { useEffect, useRef } from 'react'
import { Form } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import Collapsible from '@/components/common/Collapsible'

const SearchBar = ({ id, open, search, onClose }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose()
  }

  return (
    <Collapsible id={id} open={open}>
      <div className="border-t border-line bg-surface-muted">
        <Form
          role="search"
          action={search.action}
          onSubmit={onClose}
          onKeyDown={handleKeyDown}
          className="page-container flex gap-2 py-3"
        >
          <label htmlFor={`${id}-input`} className="sr-only">
            {search.label}
          </label>
          <input
            ref={inputRef}
            id={`${id}-input`}
            name="search"
            type="search"
            required
            placeholder={search.placeholder}
            className="min-h-11 min-w-0 flex-1 border border-line bg-surface px-4 text-base outline-none placeholder:text-ink-muted focus:border-brand"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 bg-brand px-4 font-display tracking-wider text-white uppercase transition-colors hover:bg-ink sm:px-6"
          >
            <FiSearch aria-hidden="true" className="size-5" />
            <span className="sr-only sm:not-sr-only">{search.label}</span>
          </button>
        </Form>
      </div>
    </Collapsible>
  )
}

export default SearchBar
