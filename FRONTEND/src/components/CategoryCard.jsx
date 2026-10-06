import { Link } from 'react-router'
import { FiImage } from 'react-icons/fi'
import { cn } from '@/utils/cn'

// `category` follows the Category model: { name, slug, image }.
const CategoryCard = ({ category, to, className }) => {
  const { name, slug, image } = category

  return (
    <Link
      to={to ?? `/category/${slug}`}
      className={cn('group flex flex-col gap-4 rounded-image text-center', className)}
    >
      <span className="flex aspect-4/5 items-center justify-center overflow-hidden rounded-image bg-bg-alt shadow-soft">
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-[scale] duration-500 group-hover:scale-105"
          />
        ) : (
          <FiImage aria-hidden="true" className="size-10 text-ink/30" />
        )}
      </span>
      <span className="font-heading text-xl font-semibold transition-colors group-hover:text-gold md:text-2xl">
        {name}
      </span>
    </Link>
  )
}

export default CategoryCard
