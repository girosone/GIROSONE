import { cn } from '@/utils/cn'

// Props mirror the planned Announcement model ({ text, active, backgroundColor }),
// so the API response can be spread straight in later. Without a
// backgroundColor the bar falls back to the olive token.
const AnnouncementBar = ({ text, active = true, backgroundColor, className }) => {
  if (!active || !text?.trim()) return null

  return (
    <aside
      aria-label="Announcement"
      style={backgroundColor ? { backgroundColor } : undefined}
      className={cn('bg-olive text-white', className)}
    >
      <p className="page-container flex min-h-9 items-center justify-center py-2 text-center text-xs leading-snug font-medium tracking-wider text-balance sm:text-sm">
        {text}
      </p>
    </aside>
  )
}

export default AnnouncementBar
