import { cn } from '@/utils/cn'

const Container = ({ as: Tag = 'div', className, children, ...props }) => (
  <Tag className={cn('page-container', className)} {...props}>
    {children}
  </Tag>
)

export default Container
