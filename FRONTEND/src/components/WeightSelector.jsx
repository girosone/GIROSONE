import { useId } from 'react'
import { cn } from '@/utils/cn'

// Controlled radio group over a product's variants. `value` is the selected weight.
const WeightSelector = ({ variants, value, onChange, label = 'Weight', className }) => {
  const name = useId()

  return (
    <fieldset className={className}>
      <legend className="sr-only">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <label
            key={variant.weight}
            className={cn(
              'flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-button border px-3 text-sm font-medium transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold',
              variant.weight === value
                ? 'border-olive bg-olive text-white'
                : 'border-ink/20 text-ink hover:border-olive hover:text-olive',
            )}
          >
            <input
              type="radio"
              name={name}
              value={variant.weight}
              checked={variant.weight === value}
              onChange={() => onChange(variant.weight)}
              className="sr-only"
            />
            {variant.weight}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default WeightSelector
