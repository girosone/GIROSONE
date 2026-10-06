import { useState } from 'react'
import { Link } from 'react-router'
import { FiImage } from 'react-icons/fi'
import Button from '@/components/Button'
import WeightSelector from '@/components/WeightSelector'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/formatPrice'

// `product` follows the Product model: { name, slug, images, variants, category? }.
// `ctaTo` is a path or (product, variant) => path. Defaults to the product page.
const ProductCard = ({ product, to, ctaLabel = 'Enquire Now', ctaTo, className }) => {
  const { name, slug, images = [], variants = [], category } = product
  const [weight, setWeight] = useState(variants[0]?.weight)
  const variant = variants.find((item) => item.weight === weight) ?? variants[0]
  const productHref = to ?? `/product/${slug}`
  const ctaHref = (typeof ctaTo === 'function' ? ctaTo(product, variant) : ctaTo) ?? productHref

  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-card bg-white shadow-soft transition-[translate] hover:-translate-y-1',
        className,
      )}
    >
      <Link to={productHref} className="group -outline-offset-2">
        <span className="flex aspect-square items-center justify-center overflow-hidden bg-bg-alt">
          {images[0] ? (
            <img
              src={images[0]}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            <FiImage aria-hidden="true" className="size-10 text-ink/30" />
          )}
        </span>
        <span className="block px-4 pt-4 sm:px-6 sm:pt-6">
          {category?.name && (
            <span className="mb-1 block text-xs font-medium tracking-widest text-gold uppercase">
              {category.name}
            </span>
          )}
          <h3 className="text-xl transition-colors group-hover:text-gold md:text-xl">{name}</h3>
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        {variants.length > 0 && (
          <WeightSelector
            variants={variants}
            value={variant.weight}
            onChange={setWeight}
            label={`${name} weight`}
          />
        )}

        <div className="mt-auto flex flex-col gap-4">
          {variant && (
            <p aria-live="polite" className="text-xl font-semibold text-olive">
              {formatPrice(variant.price)}
              <span className="ml-2 text-sm font-normal text-ink/70">/ {variant.weight}</span>
            </p>
          )}
          <Button to={ctaHref} size="sm" fullWidth>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
