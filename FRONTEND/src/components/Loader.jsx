import { cn } from '@/utils/cn'

const sizes = {
  sm: 'size-5',
  md: 'size-8',
  lg: 'size-12',
}

const Loader = ({ label = 'Loading…', size = 'md', showLabel = false, className }) => (
  <div
    role="status"
    className={cn('flex flex-col items-center justify-center gap-3 py-8 text-ink/70', className)}
  >
    <span
      aria-hidden="true"
      className={cn(
        'animate-spin rounded-full border-2 border-gold/25 border-t-gold motion-reduce:hidden',
        sizes[size],
      )}
    />
    <span className={cn('text-sm', !showLabel && 'sr-only motion-reduce:not-sr-only')}>{label}</span>
  </div>
)

export default Loader
