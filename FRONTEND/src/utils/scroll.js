import { animateScroll, scroller } from 'react-scroll'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// react-scroll attaches its wheel / touch / key cancel listener only once, bound
// to the first animation's state. Sharing one state object keeps every
// animation cancellable by the user.
const animationState = {}

// Short hops stay quick and long ones are capped. Instant with reduced motion.
const scrollOptions = () => ({
  smooth: 'easeInOutCubic',
  duration: window.matchMedia(REDUCED_MOTION_QUERY).matches
    ? 0
    : (distance) => Math.min(700, Math.max(300, Math.abs(distance) / 3)),
  data: animationState,
})

// Moves keyboard focus to the target so the next Tab continues from there.
// Non-interactive targets get a temporary tabindex.
const moveFocus = (element) => {
  if (!element.hasAttribute('tabindex') && element.tabIndex < 0) {
    element.setAttribute('tabindex', '-1')
    element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true })
  }
  element.focus({ preventScroll: true })
}

// Scrolls to the element with this id, stopping below the sticky navbar
// (the `scroll-padding-top` on <html>). Returns false if there is no such element.
export const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (!target) return false

  const navbarOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  scroller.scrollTo(id, { ...scrollOptions(), offset: -navbarOffset })
  moveFocus(target)
  return true
}

// Focus goes to the start of the page, so the next Tab lands on the navbar.
export const scrollToTop = () => {
  animateScroll.scrollToTop(scrollOptions())
  moveFocus(document.body)
}
