import logo from '@/assets/Images/logo.webp'

export const announcement = {
  messages: ['Premium Indian Spices', 'Free Shipping Above ₹799'],
}

export const brand = {
  name: 'Girosone',
  tagline: 'Spices',
  logo,
  href: '/',
}

export const mainNavigation = [
  {
    id: 'shop',
    label: 'Shop by Categories',
    href: '/shop',
    menu: {
      title: 'Shop by Categories',
      viewAllLabel: 'Shop all spices',
      groups: [
        {
          id: 'tea',
          title: 'Tea',
          href: '/category/tea',
          items: [{ id: 'chai-patti', label: 'Chai Patti', href: '/product/chai-patti' }],
        },
        {
          id: 'hing',
          title: 'Hing (Asafoetida)',
          href: '/category/hing',
          items: [
            { id: 'regular-hing', label: 'Regular Hing', href: '/product/regular-hing' },
            {
              id: 'premium-compounded-hing-powder',
              label: 'Premium Compounded Hing Powder',
              href: '/product/premium-compounded-hing-powder',
            },
            { id: 'strong-hing', label: 'Strong Hing', href: '/product/strong-hing' },
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

export const utilityNavigation = {
  search: {
    label: 'Search',
    action: '/shop',
    placeholder: 'Search for spices, hing, tea…',
  },
  account: { label: 'Profile', href: '/account' },
  cart: { label: 'Cart', href: '/cart' },
}
