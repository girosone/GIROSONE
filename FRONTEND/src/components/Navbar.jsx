import { NavLink } from 'react-router'
import IconButton from '@/components/IconButton'
import Logo from '@/components/Logo'
import MegaMenu from '@/components/MegaMenu'
import MenuIcon from '@/components/MenuIcon'
import { cn } from '@/utils/cn'

const Navbar = ({ brand, navItems, menuId, menuOpen, onMenuOpen }) => (
  <>
    <div className="page-container grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-20">
      <div className="-ml-2.5 flex items-center">
        <IconButton
          label="Open menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-haspopup="dialog"
          onClick={onMenuOpen}
          className="lg:hidden"
        >
          <MenuIcon open={menuOpen} />
        </IconButton>
      </div>

      <Logo brand={brand} />
    </div>

    <nav aria-label="Main" className="hidden lg:block">
      <ul className="page-container flex h-12 items-start justify-center gap-10 xl:gap-16">
        {navItems.map((item) =>
          item.menu ? (
            <MegaMenu key={item.id} item={item} />
          ) : (
            <li key={item.id}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'link-underline flex min-h-11 items-center text-sm font-medium tracking-wider uppercase transition-colors hover:text-gold xl:text-base',
                    isActive && 'text-gold',
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
  </>
)

export default Navbar
