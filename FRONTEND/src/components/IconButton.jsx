import { Link } from 'react-router'
import { cn } from '@/utils/cn'

const IconButton = ({ icon: Icon, label, to, badge = 0, className, ...props }) => {
  const classes = cn(
    'relative inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:text-gold',
    className,
  )

  const content = (
    <>
      <Icon aria-hidden="true" className="size-5.5" />
      {badge > 0 && (
        <span className="absolute top-1 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-[0.625rem] leading-none font-semibold text-white">
          {badge}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} aria-label={label} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" aria-label={label} className={classes} {...props}>
      {content}
    </button>
  )
}

export default IconButton
