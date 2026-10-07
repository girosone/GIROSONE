import logo from '@/assets/logo/logo.webp'

// Same shape as the planned Announcement model. `backgroundColor: null` keeps
// the default olive bar.
export const announcement = {
  text: 'GIROSONE Spices & Foods · Quality · Trust · Excellence',
  active: true,
  backgroundColor: null,
}

export const brand = {
  name: 'Girosone',
  tagline: 'Spices',
  logo,
  href: '/',
}

export const mainNavigation = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'shop',
    label: 'Shop by Categories',
    menu: {
      title: 'Shop by Categories',
      groups: [
        {
          id: 'tea',
          title: 'Tea',
          href: '/category/tea',
          items: [{ id: 'chai-patti', label: 'Chai Patti', href: '/product/chai-patti' }],
        },
        {
          id: 'hing',
          title: 'Hing',
          href: '/category/hing',
          items: [
            { id: 'regular-hing', label: 'Regular Hing', href: '/product/regular-hing' },
            {
              id: 'premium-compounded-hing-powder',
              label: 'Premium Compounded Hing Powder',
              href: '/product/premium-compounded-hing-powder',
            },
          ],
        },
        {
          id: 'spice-powders',
          title: 'Spice Powders',
          href: '/category/spice-powders',
          items: [
            {
              id: 'premium-amchur-powder',
              label: 'Premium Amchur Powder (Dry Mango)',
              href: '/product/premium-amchur-powder',
            },
          ],
        },
        {
          id: 'dehydrated-powders',
          title: 'Dehydrated Powders',
          href: '/category/dehydrated-powders',
          items: [
            {
              id: 'premium-dehydrated-onion-powder',
              label: 'Premium Dehydrated Onion Powder',
              href: '/product/premium-dehydrated-onion-powder',
            },
            {
              id: 'premium-dehydrated-garlic-powder',
              label: 'Premium Dehydrated Garlic Powder',
              href: '/product/premium-dehydrated-garlic-powder',
            },
            {
              id: 'premium-dehydrated-ginger-powder',
              label: 'Premium Dehydrated Ginger Powder (Sonth)',
              href: '/product/premium-dehydrated-ginger-powder',
            },
          ],
        },
      ],
    },
  },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'wholesale', label: 'Wholesale', href: '/wholesale' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]
