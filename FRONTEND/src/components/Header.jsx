import { useId, useState } from 'react'
import AnnouncementBar from '@/components/AnnouncementBar'
import MobileMenu from '@/components/MobileMenu'
import Navbar from '@/components/Navbar'
import { announcement, brand, mainNavigation } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const scrolled = useScrolled(8)

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
