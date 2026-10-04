import { useId, useRef, useState } from 'react'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import MobileMenu from '@/components/layout/MobileMenu'
import Navbar from '@/components/layout/Navbar'
import { useScrolled } from '@/hooks/useScrolled'
import { announcement, brand, mainNavigation, utilityNavigation } from '@/services/navigationData'
import { cn } from '@/utils/cn'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const menuId = useId()
  const searchTriggerRef = useRef(null)
  const scrolled = useScrolled(8)

  const openMenu = () => {
    setSearchOpen(false)
    setMenuOpen(true)
  }

  const toggleSearch = (event) => {
    searchTriggerRef.current = event.currentTarget
    setSearchOpen((isOpen) => !isOpen)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    searchTriggerRef.current?.focus()
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-surface transition-shadow duration-300',
        scrolled && 'shadow-md shadow-ink/5',
      )}
    >
      <AnnouncementBar messages={announcement.messages} />
      <Navbar
        brand={brand}
        navItems={mainNavigation}
        utilities={utilityNavigation}
        menuId={menuId}
        menuOpen={menuOpen}
        onMenuOpen={openMenu}
        searchOpen={searchOpen}
        onSearchToggle={toggleSearch}
        onSearchClose={closeSearch}
      />
      <MobileMenu
        id={menuId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        brand={brand}
        navItems={mainNavigation}
        account={utilityNavigation.account}
      />
    </header>
  )
}

export default Header
