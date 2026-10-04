# GIROSONE – DESIGN.md

> Design system derived from the provided reference screens.

## Design Direction

The reference uses a premium, warm and minimal aesthetic.

Characteristics:

- Soft beige backgrounds
- Olive green accents
- Golden brown highlights
- Rounded cards
- Spacious layouts
- Elegant typography
- Soft shadows

## Color Palette

| Purpose | Color |
|----------|---------|
| Primary Background | #F6F1E7 |
| Secondary Background | #ECE2CC |
| Olive Green | #4B5A34 |
| Golden Brown | #8A6538 |
| Charcoal | #2A2A2A |
| White | #FFFFFF |

These colors closely match the provided reference screens.

## Typography

### Headings

Playfair Display

### Body

Poppins

## Buttons

Primary Button

- Golden Brown background
- White text
- Rounded
- Soft hover lift

Secondary Button

- Transparent
- Olive Green border
- Olive Green text

Transition

300ms ease.

## Navbar

Desktop

- Transparent initially
- Sticky while scrolling
- Mega Menu

Mobile

- Slide Drawer
- Hamburger animation

## Announcement Bar

Full-width strip above the navbar.

Admin should later edit:

- Text
- Background
- Visibility

## Hero Section

- Full-width banner
- Warm beige background
- Large product imagery
- Left-aligned text
- Smooth slide transition

Admin controls:

- Images
- Heading
- Subheading
- CTA

## Cards

### Product Cards

- Large rounded corners
- Soft shadow
- Product image
- Weight selector
- Price
- CTA

### Category Cards

- Large image
- Minimal text
- Gentle hover zoom

## Mega Menu

Desktop layout

```
SHOP BY CATEGORIES

Tea
Hing
Spice Powders
Dehydrated Powders
```

Two-column layout with generous spacing.

## Footer

- Cream background
- Logo
- Quick Links
- Categories
- Contact
- Wholesale CTA

## Spacing System

8px grid.

| Space | Use |
|---------|------|
| 8 | Tiny |
| 16 | Small |
| 24 | Medium |
| 32 | Large |
| 48 | Section |
| 64 | Hero |

## Border Radius

| Component | Radius |
|------------|---------|
| Buttons | 999px |
| Cards | 20px |
| Images | 24px |
| Inputs | 14px |

## Shadows

Use soft shadows only.

```css
0 10px 30px rgba(0,0,0,.08)
```

## Animations

| Component | Animation |
|------------|-----------|
| Navbar | Slide |
| Hero | Fade |
| Cards | Lift |
| Images | Zoom |
| Buttons | Scale |
| Drawer | Slide |

Keep animations subtle.

## Responsive Strategy

### Mobile (Primary)

- Single-column layouts
- Drawer menu
- Full-width buttons

### Tablet

- Two-column grids

### Laptop

- Expanded spacing

### Desktop

- Mega Menu
- Wider containers

## Container Widths

| Screen | Max Width |
|----------|------------|
| Mobile | 100% |
| Tablet | 720px |
| Laptop | 1140px |
| Desktop | 1280px |

## Image Strategy

- Use actual product images from `assets/images`.
- Use dummy placeholders until final assets are available.
- Hero images should maintain a premium warm tone.
- Avoid inconsistent image styles.

## Admin Editable Design Areas

Future CMS control:

- Announcement Bar
- Hero Slider
- Product Images
- Product Information
- Category Images
- About Page Content
- Wholesale Content
- Contact Information

## Design Rules

- Mobile-first always.
- Maintain consistent spacing.
- Never use flashy animations.
- Keep components reusable.
- Preserve the premium earthy identity throughout the website.
