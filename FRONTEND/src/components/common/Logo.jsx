import { Link } from 'react-router'
import { cn } from '@/utils/cn'

const Logo = ({ brand, className, onClick }) => (
  <Link
    to={brand.href}
    aria-label={`${brand.name} home`}
    onClick={onClick}
    className={cn('flex flex-col items-center leading-none', className)}
  >
    {brand.logo ? (
      <img
        src={brand.logo}
        alt=""
        className="h-auto w-28 xs:w-36 sm:w-44 lg:w-56"
      />
    ) : (
      <>
        <span className="-mr-[0.12em] font-display text-lg font-semibold tracking-[0.12em] text-brand uppercase xs:-mr-[0.18em] xs:text-xl xs:tracking-[0.18em] sm:text-2xl lg:text-3xl">
          {brand.name}
        </span>
        <span className="mt-1 -mr-[0.45em] text-[0.625rem] font-medium tracking-[0.45em] text-accent uppercase sm:text-xs">
          {brand.tagline}
        </span>
      </>
    )}
  </Link>
)

export default Logo
