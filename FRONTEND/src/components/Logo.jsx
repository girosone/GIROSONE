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
      // The logo file has a white background. Multiply blends it into the
      // beige surface behind it, so use the logo on light surfaces only.
      <img
        src={brand.logo}
        alt=""
        width={900}
        height={230}
        decoding="async"
        className="h-auto w-28 mix-blend-multiply xs:w-36 sm:w-44 lg:w-56"
      />
    ) : (
      <>
        <span className="mr-[-0.12em] font-heading text-lg font-semibold tracking-[0.12em] text-olive uppercase xs:mr-[-0.18em] xs:text-xl xs:tracking-[0.18em] sm:text-2xl lg:text-3xl">
          {brand.name}
        </span>
        <span className="mt-1 mr-[-0.45em] text-[0.625rem] font-medium tracking-[0.45em] text-gold uppercase sm:text-xs">
          {brand.tagline}
        </span>
      </>
    )}
  </Link>
)

export default Logo
