# GIROSONE – PROJECT.md

> Master blueprint for the GIROSONE Spices & Foods MERN Stack project.

## Project Vision

Build a premium, mobile-first spices website inspired by the provided reference screens with an elegant beige, olive green and golden-brown visual identity.

## Brand

**GIROSONE Spices & Foods**

## Core Principles

- Mobile-first responsive design
- Reusable React components
- Frontend and backend developed feature-by-feature
- Admin-controlled CMS sections
- Clean MERN architecture
- Smooth premium animations

## Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- React Router
- React Scroll
- React Icons
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## Product Catalog

| Category | Products |
|----------|----------|
| Tea | Chai Patti |
| Hing | Regular Hing, Premium Compounded Hing |
| Spice Powders | Premium Amchur Powder |
| Dehydrated Powders | Onion, Garlic, Ginger (Sonth) |

## Product Variant System

Every product supports multiple weight variants.

```js
variants: [
  {
    weight: "50g",
    price: 120,
    stock: 25
  }
]
```

## User Roles

### Guest

- Browse products
- View categories
- Contact business
- Wholesale inquiry

### Admin

Authenticated.

Can manage:

- Products
- Categories
- Hero banners
- Announcement bar
- Home page content
- About page
- Wholesale content

## Navigation

Home

SHOP BY CATEGORIES (Mega Menu)

- Tea
- Hing
- Spice Powders
- Dehydrated Powders

ABOUT US

WHOLESALE

CONTACT

Desktop uses a Mega Menu.

Mobile uses a Drawer Menu.

## Folder Structure

```text
GIROSONE/

├── FRONTEND/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── logo/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── data/
│
├── BACKEND/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── PROJECT.md
├── DESIGN.md
├── PLAN.md
├── PROMPT.md
└── WORKLOG.md
```

## Public Pages

- Home
- Category Listing
- Product Details
- About
- Wholesale
- Contact
- 404

## Admin Pages

- Login
- Dashboard
- Products
- Categories
- Hero Slider
- Announcement Bar
- Website Content
- Settings

## Reusable Components

- Announcement Bar
- Navbar
- Mega Menu
- Mobile Drawer
- Hero Banner
- Product Card
- Category Card
- Buttons
- Footer
- Modal
- Image Upload
- Loading Spinner

## Database Models

### Product

```js
{
 name,
 slug,
 category,
 description,
 images,
 variants,
 featured,
 active
}
```

### Category

```js
{
 name,
 slug,
 image
}
```

### Admin

```js
{
 name,
 email,
 password
}
```

### Hero Banner

```js
{
 image,
 heading,
 subHeading,
 buttonText,
 buttonLink
}
```

### Announcement

```js
{
 text,
 active
}
```

## Development Roadmap

### Phase 1

- Project setup
- Tailwind setup
- Design system
- Folder structure

### Phase 2

- Navbar
- Announcement bar
- Hero Slider

### Phase 3

- Categories
- Product Cards
- Product APIs

### Phase 4

- Product Details
- Admin Authentication

### Phase 5

- Admin Dashboard
- CMS Features

### Future Features

- Cloudinary
- Razorpay
- Wishlist
- Search
- Filters
- SEO
- Analytics

## Rules for Development

- No unnecessary folders.
- Build feature-by-feature.
- Components must remain reusable.
- API logic stays inside services.
- Admin should control website content without code changes.
- Use dummy images until final assets are available.
