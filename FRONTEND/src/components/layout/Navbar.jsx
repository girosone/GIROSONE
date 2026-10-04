import { useId } from 'react'
import { NavLink } from 'react-router'
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import IconButton from '@/components/common/IconButton'
import Logo from '@/components/common/Logo'
import MegaMenu from '@/components/layout/MegaMenu'
import SearchBar from '@/components/layout/SearchBar'
import { cn } from '@/utils/cn'

const Navbar = ({
  brand,
  navItems,
  utilities,
  cartCount = 0,
  menuId,
  menuOpen,
  onMenuOpen,
  searchOpen,
  onSearchToggle,
  onSearchClose,
}) => {
  const searchId = useId()
  const { search, account, cart } = utilities

  const searchButtonProps = {
    icon: searchOpen ? FiX : FiSearch,
    label: searchOpen ? `Close ${search.label.toLowerCase()}` : search.label,
    'aria-expanded': searchOpen,
    'aria-controls': searchId,
    onClick: onSearchToggle,
  }

  return (
    <div className="border-b border-line bg-surface">
      <div className="page-container grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-20">
        <div className="-ml-2.5 flex items-center">
          <IconButton
            icon={FiMenu}
            label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            onClick={onMenuOpen}
            className="lg:hidden"
          />
          <IconButton {...searchButtonProps} className="hidden lg:inline-flex" />
        </div>

        <Logo brand={brand} />

        <div className="-mr-2.5 flex items-center justify-end">
          <IconButton {...searchButtonProps} className="lg:hidden" />
          <IconButton icon={FiUser} label={account.label} to={account.href} className="hidden lg:inline-flex" />
          <IconButton
            icon={FiShoppingBag}
            label={cartCount > 0 ? `${cart.label}, ${cartCount} items` : cart.label}
            to={cart.href}
            badge={cartCount}
          />
        </div>
      </div>

      <nav aria-label="Main" className="hidden lg:block">
        <ul className="page-container flex items-center justify-center gap-10 pb-3 xl:gap-16">
          {navItems.map((item) =>
            item.menu ? (
              <MegaMenu key={item.id} item={item} />
            ) : (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'link-underline flex min-h-11 items-center font-display text-base tracking-wide uppercase transition-colors hover:text-accent xl:text-lg',
                      isActive && 'text-accent',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>
      </nav>

      <SearchBar id={searchId} open={searchOpen} search={search} onClose={onSearchClose} />
    </div>
  )
}

export default Navbar
