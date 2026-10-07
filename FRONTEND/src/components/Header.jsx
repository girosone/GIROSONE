import { useEffect, useId, useState } from 'react'
import MobileMenu from '@/components/MobileMenu'
import Navbar from '@/components/Navbar'
import { brand, mainNavigation } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'

const DESKTOP_QUERY = '(min-width: 64rem)'

// `overlay` lets the page content (the Home hero) run underneath the navbar,
// which stays transparent until the page is scrolled. Elsewhere it is solid.
const Header = ({ overlay = false }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const scrolled = useScrolled(8)
  const transparent = overlay && !scrolled

  // The drawer is mobile-only, so close it when the viewport reaches desktop.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', handleChange)
    return () => desktop.removeEventListener('change', handleChange)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-(--header-height) transition-[background-color,box-shadow]',
        overlay && '-mb-(--header-height)',
        transparent ? 'bg-transparent' : 'bg-bg',
        scrolled && 'shadow-soft',
      )}
    >
      <Navbar
        brand={brand}
        navItems={mainNavigation}
        menuId={menuId}
        menuOpen={menuOpen}
        onMenuOpen={() => setMenuOpen(true)}
      />
      <MobileMenu
        id={menuId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        brand={brand}
        navItems={mainNavigation}
      />
    </header>
  )
}

export default Header
