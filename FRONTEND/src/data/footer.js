import { mainNavigation } from '@/data/navigation'

const pageLinks = mainNavigation.filter((item) => !item.menu)
const categoryLinks = mainNavigation
  .flatMap((item) => item.menu?.groups ?? [])
  .map(({ id, title, href }) => ({ id, label: title, href }))

// Same fields as the planned SiteSettings model ({ phone, email, address }).
// Details are the ones printed on the packaging.
export const contact = {
  phone: '+91 99934 99020',
  email: 'girosone10@gmail.com',
  address: '646, Chanakyapuri, Near Sai Temple, Sehore (M.P.) 466001',
}

export const footer = {
  legalName: 'GIROSONE Spices & Foods',
  tagline: 'Premium tea, hing and spice powders for everyday cooking. Quality · Trust · Excellence.',
  linkGroups: [
    { id: 'quick-links', title: 'Quick Links', links: pageLinks },
    { id: 'categories', title: 'Categories', links: categoryLinks },
  ],
  wholesale: {
    title: 'Wholesale',
    text: 'Buying in bulk for your store, kitchen or business? Talk to us about wholesale supply.',
    buttonText: 'Wholesale Enquiry',
    buttonLink: '/wholesale',
  },
}
