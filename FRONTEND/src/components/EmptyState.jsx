import { FiInbox } from 'react-icons/fi'
import { cn } from '@/utils/cn'

// `children` is the optional action area (usually a Button).
const EmptyState = ({ icon: Icon = FiInbox, title, description, className, children }) => (
  <div className={cn('flex flex-col items-center px-4 py-12 text-center', className)}>
    <span className="flex size-16 items-center justify-center rounded-full bg-bg-alt text-olive">
      <Icon aria-hidden="true" className="size-7" />
    </span>
    <h3 className="mt-6 text-xl md:text-2xl">{title}</h3>
    {description && <p className="mt-2 max-w-md text-ink/70">{description}</p>}
    {children && <div className="mt-6 flex flex-wrap justify-center gap-4">{children}</div>}
  </div>
)

export default EmptyState
