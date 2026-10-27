import { scrollToSection } from '@/utils/scroll'

// In-page anchor: `to="#section-id"` smooth-scrolls to that section.
// Modified clicks (new tab, new window) keep the browser default.
const ScrollLink = ({ to, onClick, children, ...props }) => {
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (scrollToSection(to.slice(1))) event.preventDefault()
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export default ScrollLink
