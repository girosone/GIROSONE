import { FiAlertCircle } from 'react-icons/fi'
import Button from '@/components/Button'
import { cn } from '@/utils/cn'

const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  className,
}) => (
  <div
    role="alert"
    className={cn(
      'flex flex-col items-center rounded-card border border-ink/10 bg-white px-6 py-8 text-center',
      className,
    )}
  >
    <FiAlertCircle aria-hidden="true" className="size-8 text-gold" />
    <p className="mt-4 font-semibold">{title}</p>
    {message && <p className="mt-1 max-w-md text-sm text-ink/70">{message}</p>}
    {onRetry && (
      <Button variant="secondary" size="sm" onClick={onRetry} className="mt-6">
        {retryLabel}
      </Button>
    )}
  </div>
)

export default ErrorMessage
