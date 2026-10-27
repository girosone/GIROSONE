import { FiArrowUp } from 'react-icons/fi'
import IconButton from '@/components/IconButton'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'
import { scrollToTop } from '@/utils/scroll'

// Roughly one mobile screen. Short pages never show the button.
const SHOW_AFTER = 600

const BackToTop = () => {
  const visible = useScrolled(SHOW_AFTER)

  return (
    <IconButton
      icon={FiArrowUp}
      label="Back to top"
      onClick={() => scrollToTop()}
      className={cn(
        'fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 size-12 bg-gold text-white shadow-soft transition-[opacity,translate,scale,visibility] hover:-translate-y-0.5 hover:text-white active:scale-95 lg:right-8 lg:bottom-8',
        !visible && 'invisible translate-y-4 opacity-0',
      )}
    />
  )
}

export default BackToTop
