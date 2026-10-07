import { useId, useState } from 'react'
import { Link } from 'react-router'
import { FiChevronDown, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Button from '@/components/Button'
import Collapsible from '@/components/Collapsible'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import { contact, footer } from '@/data/footer'
import { brand } from '@/data/navigation'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'

const TABLET_QUERY = '(min-width: 48rem)'

const headingClasses = 'font-body text-sm font-semibold tracking-wider text-olive uppercase'
const linkClasses =
  'flex min-h-11 items-center text-sm text-ink/80 transition-colors hover:text-gold lg:min-h-9'
const iconClasses = 'size-4 shrink-0 text-olive'

// An accordion below the tablet breakpoint, an always-open column from there up.
const FooterLinkGroup = ({ group, collapsible, className }) => {
  const [open, setOpen] = useState(false)
  const headingId = useId()
  const panelId = useId()

  return (
    <nav
      aria-labelledby={headingId}
      className={cn('border-t border-ink/10 md:border-0', className)}
    >
      <h2 id={headingId} className={headingClasses}>
        {collapsible ? (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((isOpen) => !isOpen)}
            className="flex min-h-14 w-full items-center justify-between uppercase"
          >
            {group.title}
            <FiChevronDown
              aria-hidden="true"
              className={cn('size-5 transition-transform duration-300', open && 'rotate-180')}
            />
          </button>
        ) : (
          group.title
        )}
      </h2>

      <Collapsible id={panelId} open={!collapsible || open}>
        <ul className="pb-4 md:pt-2 md:pb-0">
          {group.links.map((link) => (
            <li key={link.id}>
              <Link to={link.href} className={linkClasses}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Collapsible>
    </nav>
  )
}

const Footer = () => {
  const collapsible = !useMediaQuery(TABLET_QUERY)
  const { legalName, tagline, linkGroups, wholesale } = footer
  const [quickLinks, categories] = linkGroups

  return (
    <footer className="border-t border-ink/10 bg-bg-alt">
      <Container className="grid py-section md:grid-cols-12 md:gap-x-8 md:gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-x-12 lg:py-hero">
        <div className="grid gap-8 pb-8 md:col-span-12 md:grid-cols-2 md:pb-0 lg:col-span-1 lg:grid-cols-1">
          <div>
            <Logo brand={brand} className="items-start" />
            <p className="mt-4 max-w-xs text-sm text-ink/80">{tagline}</p>
          </div>

          <div>
            <h2 className={headingClasses}>{wholesale.title}</h2>
            <p className="mt-3 max-w-xs text-sm text-ink/80">{wholesale.text}</p>
            <Button to={wholesale.buttonLink} size="sm" className="mt-5 w-full sm:w-auto">
              {wholesale.buttonText}
            </Button>
          </div>
        </div>

        <FooterLinkGroup
          group={quickLinks}
          collapsible={collapsible}
          className="md:col-span-3 lg:col-span-1"
        />
        <FooterLinkGroup
          group={categories}
          collapsible={collapsible}
          className="md:col-span-4 lg:col-span-1"
        />

        <div className="border-t border-ink/10 pt-5 md:col-span-5 md:border-0 md:pt-0 lg:col-span-1">
          <h2 className={headingClasses}>Contact</h2>
          <address className="mt-2 not-italic">
            <ul>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={cn(linkClasses, 'gap-3')}>
                  <FiPhone aria-hidden="true" className={iconClasses} />
                  <span className="sr-only">Phone:</span>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={cn(linkClasses, 'gap-3 wrap-anywhere')}>
                  <FiMail aria-hidden="true" className={iconClasses} />
                  <span className="sr-only">Email:</span>
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3 py-2.5 text-sm text-ink/80">
                <FiMapPin aria-hidden="true" className={cn(iconClasses, 'mt-1')} />
                <span>
                  <span className="sr-only">Address: </span>
                  {contact.address}
                </span>
              </li>
            </ul>
          </address>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        <Container className="py-6 text-center text-xs text-ink/80 sm:text-sm">
          © {new Date().getFullYear()} {legalName}. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}

export default Footer
