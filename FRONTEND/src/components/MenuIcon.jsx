import { cn } from '@/utils/cn'

const barClasses =
  'absolute top-1/2 left-0 -mt-px h-0.5 w-full rounded-full bg-current transition-[translate,rotate,opacity]'

// Three bars that morph into a close icon. `animateIn` replays the morph when
// the icon first appears, e.g. inside a dialog that has just opened.
const MenuIcon = ({ open = false, animateIn = false, className }) => (
  <span aria-hidden="true" className={cn('relative block size-5.5', className)}>
    <span
      className={cn(
        barClasses,
        open ? 'rotate-45' : '-translate-y-1.5',
        open && animateIn && 'starting:-translate-y-1.5 starting:rotate-0',
      )}
    />
    <span
      className={cn(
        barClasses,
        open ? 'opacity-0' : 'opacity-100',
        open && animateIn && 'starting:opacity-100',
      )}
    />
    <span
      className={cn(
        barClasses,
        open ? '-rotate-45' : 'translate-y-1.5',
        open && animateIn && 'starting:translate-y-1.5 starting:rotate-0',
      )}
    />
  </span>
)

export default MenuIcon
