import { cn } from '@/utils/cn'

const Collapsible = ({ id, open, className, children }) => (
  <div
    id={id}
    inert={!open}
    className={cn(
      'grid transition-[grid-template-rows] duration-300 ease-out',
      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      className,
    )}
  >
    <div className="min-h-0 overflow-hidden">{children}</div>
  </div>
)

export default Collapsible
