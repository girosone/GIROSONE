import { Link } from 'react-router'
import { cn } from '@/utils/cn'

const variants = {
  primary: 'border-gold bg-gold text-white hover:shadow-soft',
  secondary: 'border-olive bg-transparent text-olive hover:bg-olive hover:text-white',
}

const sizes = {
  sm: 'min-h-11 px-5 text-sm',
  md: 'min-h-12 px-7 text-base',
  lg: 'min-h-14 px-9 text-lg',
}

// Renders a router link with `to`, an anchor with `href`, otherwise a button.
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  to,
  href,
  type = 'button',
  className,
  children,
  ...props
}) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-button border text-center leading-tight font-medium transition-[color,background-color,box-shadow,translate,scale] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
