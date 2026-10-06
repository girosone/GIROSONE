import { cn } from '@/utils/cn'

const SectionHeading = ({
  as: Tag = 'h2',
  title,
  subtitle,
  align = 'center',
  divider = true,
  className,
}) => {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'mb-8 flex flex-col lg:mb-12',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <Tag>{title}</Tag>
      {divider && (
        <span aria-hidden="true" className="mt-4 flex items-center gap-2 text-gold">
          <span className="h-px w-10 bg-current" />
          <span className="size-1.5 rotate-45 bg-current" />
          <span className="h-px w-10 bg-current" />
        </span>
      )}
      {subtitle && <p className="mt-4 max-w-2xl text-ink/70 md:text-lg">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading
