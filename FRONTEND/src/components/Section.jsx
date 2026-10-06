import Container from '@/components/Container'
import { cn } from '@/utils/cn'

const tones = {
  default: 'bg-bg',
  alt: 'bg-bg-alt',
}

// Vertical rhythm from DESIGN.md: 48px (section) on mobile, 64px (hero) from tablet up.
const Section = ({
  as: Tag = 'section',
  tone = 'default',
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}) => (
  <Tag className={cn('py-section md:py-hero', tones[tone], className)} {...props}>
    {contained ? <Container className={containerClassName}>{children}</Container> : children}
  </Tag>
)

export default Section
