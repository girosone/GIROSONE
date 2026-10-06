import { useId } from 'react'
import { FiAlertCircle, FiChevronDown } from 'react-icons/fi'
import { cn } from '@/utils/cn'

const fieldClasses =
  'w-full rounded-input border border-ink/20 bg-white px-4 text-base text-ink transition-colors placeholder:text-ink/50 hover:border-ink/40 focus:border-gold disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-ink aria-invalid:ring-1 aria-invalid:ring-ink'

const fieldTypes = {
  input: 'min-h-12',
  textarea: 'min-h-32 resize-y py-3',
  select: 'min-h-12 appearance-none pr-11',
}

// Label + control + hint/error. `as` is 'input' (default), 'textarea' or 'select';
// every other prop goes to the control. For a select, pass <option>s as children.
const FormField = ({
  as: Field = 'input',
  label,
  id,
  hint,
  error,
  required = false,
  className,
  fieldClassName,
  children,
  ...props
}) => {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const hintId = `${fieldId}-hint`
  const errorId = `${fieldId}-error`
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined

  const control = (
    <Field
      id={fieldId}
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      className={cn(fieldClasses, fieldTypes[Field], fieldClassName)}
      {...props}
    >
      {children}
    </Field>
  )

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={fieldId} className="text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden="true" className="text-gold">
            {' '}
            *
          </span>
        )}
      </label>

      {Field === 'select' ? (
        <div className="relative">
          {control}
          <FiChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink/70"
          />
        </div>
      ) : (
        control
      )}

      {hint && (
        <p id={hintId} className="text-sm text-ink/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-medium">
          <FiAlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
