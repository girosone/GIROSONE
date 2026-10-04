import { NavLink } from 'react-router'
import { FiMenu } from 'react-icons/fi'
import IconButton from '@/components/IconButton'
import Logo from '@/components/Logo'
import MegaMenu from '@/components/MegaMenu'
import { cn } from '@/utils/cn'

const Navbar = ({ brand, navItems, menuId, menuOpen, onMenuOpen }) => (
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
      </div>

      <Logo brand={brand} />
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
  </div>
)

export default Navbar
