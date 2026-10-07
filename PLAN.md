# GIROSONE – PLAN.md

> Development roadmap for the GIROSONE Spices & Foods MERN project.
> **PROJECT.md** is the master requirement. **DESIGN.md** is the source of truth for visuals and UI behaviour.
> This file only sequences the work. Where PLAN.md and those files disagree, they win and this file gets corrected.

---

## How to Use This Plan

1. Work one **milestone** at a time, in the order given in [Overall Development Sequence](#overall-development-sequence).
2. For each milestone, follow the **feature loop** below. Do not start the next milestone until the current one meets its completion criteria.
3. Record what was actually built, and any deviation, in **WORKLOG.md**.
4. Use **PROMPT.md** for the Claude prompt for each milestone (created later).

### Feature Loop (applies to every milestone)

```
1. Re-read the relevant parts of PROJECT.md / DESIGN.md
2. Backend first when the feature needs data:
   model → controller → route → test the API with an HTTP client
3. Frontend:
   service (Axios) → reusable components → section/page → wire to service
4. Integrate end-to-end in the browser
5. Run the milestone's validation checklist (mobile → desktop)
6. Update WORKLOG.md → commit
```

### Labels

- **[MUST]**: required for the initial launch.
- **[OPTIONAL]**: nice to have. Build only if time allows, or later.
- **[DECIDE]**: blocked on an open question (see [Open Questions](#open-questions-before-implementation)). Use the stated default if no answer is given.

---

## Current State (as of 2026-10-07)

Phase 0 (M0.1–M0.3) and Phase 1 (M1.1–M1.4) are complete. In Phase 2, M2.2 (desktop navigation + mega menu), M2.3 (mobile drawer) and the navbar part of M2.4 (sticky, transparent → solid) were implemented early, in the same session as M1.3. M2.1 (route stubs) and the rest of M2.4 (React Scroll anchors, back-to-top) are still open.

| Area | Status |
|------|--------|
| `FRONTEND/` | Vite + React 19, Tailwind CSS v4, `react-router` v7, `react-icons`, `tailwind-merge`, `@` path alias, ESLint |
| Frontend structure | Aligned with PROJECT.md: `components/`, `sections/`, `pages/`, `layouts/`, `services/`, `hooks/`, `utils/`, `data/`, `assets/` |
| Layout | `MainLayout` moved to `layouts/` |
| Navigation data | Moved to `data/navigation.js` |
| Brand assets | Logo moved to `assets/logo/` |
| Shared components | Header/navigation components moved to the flat `components/` structure |
| API client | `services/api.js` created with Axios and `VITE_API_URL` |
| Environment | `FRONTEND/.env.example` created; local `.env` is git-ignored |
| Packages | `axios` and `react-scroll` installed |
| Navigation scope | Search, account and cart controls removed; four PROJECT.md categories are used |
| `BACKEND/` | Express 5 + Mongoose 9, ES modules, CORS for `CLIENT_URL`, env validation, `GET /api/health`, JSON 404/error handling |
| Database | MongoDB connection via `MONGODB_URI` (`config/db.js`). No models yet. |
| M0.3 validation | Health check, 404/500, env and bad-URI failures, and the frontend Axios call all passed |
| M0.2 validation | Lint, build, desktop/mobile browser checks passed |
| Design tokens | M1.1 done: DESIGN.md tokens in `index.css` (`@theme`), self-hosted Playfair Display + Poppins via Fontsource, 720 / 1140 / 1280 container, golden-brown focus ring, reduced-motion support |
| Core components | M1.2 done: `Button`, `Container`, `Section`, `SectionHeading`, `Loader`, `EmptyState`, `ErrorMessage`, `Modal`, `FormField`, `WeightSelector`, `ProductCard`, `CategoryCard`; `useDialog` hook; `formatPrice` util. `ProductCard`, `CategoryCard`, `WeightSelector` and `FormField` were built ahead of their P3 / P5 slots in the inventory. Dev-only showcase at `/dev/components` |

| Announcement bar | M1.3 done: `AnnouncementBar` takes `text`, `active`, `backgroundColor` (the Announcement model shape) from `data/navigation.js`. It scrolls away with the page; only the navbar is sticky |
| Navbar shell | M1.3 done: re-themed logo row, link row and mobile hamburger trigger |
| Navigation behaviour | Implemented early (Phase 2 scope). M2.2: nav order Home · SHOP BY CATEGORIES · ABOUT US · WHOLESALE · CONTACT and the desktop mega menu. M2.3: mobile slide drawer with animated hamburger and category accordion. M2.4 (navbar part): sticky navbar, transparent over the Home hero and solid elsewhere (route `handle.transparentHeader`, `--header-height`). Not yet verified over a real hero image (M3.2) |
| Footer | M1.4 done: `Footer` in `MainLayout` on the secondary cream background. Logo + brand line, Wholesale CTA (`Button`), Quick Links, Categories, Contact (phone, email, address). One column with Quick Links / Categories accordions below 768px, two rows from 768px, four columns from 1024px. Content from `data/footer.js`; links and categories are derived from `data/navigation.js` |
| Logo | `logo.webp` regenerated from `logo.png` with a transparent background |

The old teal/Oswald/Jost styling has been removed. Still open in Phase 2: M2.1 route stubs (the nav and footer links currently land on the 404 page), and the React Scroll anchors and back-to-top button from M2.4.

Next milestone: **M2.1 Routes & stubs**.

## Architecture Summary

### Frontend (`FRONTEND/src/`)

| Folder | Purpose |
|--------|---------|
| `assets/images`, `assets/icons`, `assets/logo` | Static brand assets and dummy placeholders |
| `components/` | Reusable UI building blocks (Button, ProductCard, Navbar…) |
| `sections/` | Page sections composed from components (HeroSlider, CategorySection…) |
| `pages/` | Route-level pages (public + admin) |
| `layouts/` | `MainLayout` (public) and `AdminLayout` |
| `services/` | Axios instance + one service file per resource. **All API logic lives here.** |
| `hooks/` | Custom hooks (`useScrolled`, `useAuth`, `useFetch`) |
| `utils/` | Pure helpers (`cn`, formatters) |
| `data/` | Static fallback/UI data (nav labels, default copy) until CMS/API replaces it |

State: React state + context only. No Redux unless a real need appears.

### Backend (`BACKEND/`)

| Folder | Purpose |
|--------|---------|
| `config/` | DB connection, env loading/validation |
| `models/` | Mongoose schemas |
| `controllers/` | Request handlers |
| `routes/` | Express routers. Public under `/api/*`, admin under `/api/admin/*` |
| `middleware/` | `protect` (JWT), error handler, 404, upload, validation |
| `services/` | Reusable business logic (image storage, token handling) |
| `utils/` | Helpers (slugify, ApiError), seed and create-admin scripts |
| `server.js` | App bootstrap |

### API Conventions

- Success: `{ success: true, data }`. Error: `{ success: false, message, errors? }`.
- Public routes are **read-only**. Every write route lives under `/api/admin/*` behind the `protect` middleware.
- Express 5 forwards async errors to the error handler natively, so no `asyncHandler` wrapper is needed.
- Use only current, non-deprecated APIs and config for every library.

---

## PHASE 0 – Project Foundation

**Objective:** A clean, runnable frontend and backend skeleton that matches PROJECT.md's folder structure, with a working MongoDB connection and a health check.

**Features included**
- Repository setup and git initialisation **[MUST]**
- Frontend audit and folder realignment **[MUST]**
- Backend Express skeleton **[MUST]**
- MongoDB / Mongoose connection **[MUST]**
- Environment variables for both apps **[MUST]**
- Dev scripts **[MUST]**

### Milestones

**M0.1: Repository & docs**
- `git init` at `Girosone/` root, with a root `.gitignore` (node_modules, `.env*`, build output, uploads).
- Place `PROJECT.md`, `DESIGN.md` and `PLAN.md` at the root.

**M0.2: Frontend realignment**
- Install `axios` and `react-scroll`.
- Create `layouts/`, `sections/`, `data/`, `assets/images`, `assets/icons`, `assets/logo`.
- Move `MainLayout` → `layouts/`. Move the logo → `assets/logo/`. Move `navigationData.js` → `data/navigation.js`.
- Remove folders outside PROJECT.md scope (`redux/`, `components/cart`, `components/auth`, unused `public/images/*` subfolders) **[DECIDE: Q1]**.
- `.env.example` with `VITE_API_URL`.
- `services/api.js`: a single Axios instance (base URL from env, `withCredentials` if cookie auth is used).

**M0.3: Backend skeleton**
- `npm init`, ES modules. Install `express`, `mongoose`, `cors`, plus a dev watcher (`node --watch` is built in, so no nodemon is needed).
- Env loading: Node's native `--env-file` / `process.loadEnvFile` (no extra package needed).
- `config/db.js` (connect, log, exit on failure) and `config/env.js` (validate that required vars exist).
- `server.js`: JSON body parser, CORS restricted to `CLIENT_URL`, `GET /api/health`, 404 + error middleware.
- `.env.example`: `PORT`, `MONGODB_URI`, `CLIENT_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV`.

**Frontend tasks:** M0.2.
**Backend tasks:** M0.3.
**Database/model tasks:** Connection only. No models yet.
**Reusable components involved:** None new (existing header components are kept for Phase 1/2).

**API/routes required**

| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/health` | Public |

**Dependencies:** None.

**Expected result:** `npm run dev` in each app starts cleanly. The frontend can call `/api/health` through the Axios instance.

**Validation checklist**
- [ ] Frontend dev server and build both run with no warnings (including deprecation warnings)
- [ ] `npm run lint` passes
- [ ] Backend starts, connects to MongoDB, and logs the connection
- [ ] `GET /api/health` returns `{ success: true }`
- [ ] Unknown route returns a JSON 404, and a thrown error returns a JSON 500
- [ ] Wrong `MONGODB_URI` fails with a clear message, not a hang
- [ ] `.env` files are git-ignored. `.env.example` files are committed.
- [ ] Folder tree matches PROJECT.md (no extra folders)

**Completion criteria:** Both apps run, the health check works end-to-end, and the first commit is made.

---

## PHASE 1 – Design System & Shared UI

**Objective:** Translate DESIGN.md into tokens and reusable components so that every later page is assembled, not styled from scratch.

**Features included**
- Design tokens (colors, fonts, radius, shadows, spacing, containers) **[MUST]**
- Global base styles and typography **[MUST]**
- Core UI components **[MUST]**
- Announcement bar (static data) **[MUST]**
- Navbar shell (logo + links, re-themed) **[MUST]**
- Footer **[MUST]**

### Milestones

**M1.1: Tokens & global styles** (in `index.css` via Tailwind v4 `@theme`)

| Token | Value (DESIGN.md) |
|-------|-------------------|
| `--color-bg` | `#F6F1E7` primary background |
| `--color-bg-alt` | `#ECE2CC` secondary background |
| `--color-olive` | `#4B5A34` |
| `--color-gold` | `#8A6538` golden brown |
| `--color-ink` | `#2A2A2A` charcoal |
| `--color-white` | `#FFFFFF` |
| `--font-heading` | Playfair Display |
| `--font-body` | Poppins |
| Radius | buttons `999px`, cards `20px`, images `24px`, inputs `14px` |
| Shadow | `0 10px 30px rgba(0,0,0,.08)` |
| Transition | `300ms ease` |
| Spacing | 8px grid: 8 / 16 / 24 / 32 / 48 (section) / 64 (hero) |
| Container | 100% mobile, 720 tablet, 1140 laptop, 1280 desktop |

- Load the fonts (Google Fonts or self-hosted, **[DECIDE: Q12]**).
- Headings use Playfair Display. Body uses Poppins. Set the base type scale mobile-first.
- `prefers-reduced-motion` respected. Visible focus ring in golden brown.
- Remove old teal/Oswald/Jost tokens.

**M1.2: Core components** (`components/`)
- `Button`: `primary` (golden-brown bg, white text, pill, soft lift/scale on hover) and `secondary` (transparent, olive border/text). Sizes, full-width option for mobile, renders as a `<button>` or a link.
- `Container`: applies DESIGN.md max widths and gutters.
- `SectionHeading`: centred heading plus optional subheading and decorative divider (the reference uses an ornamental underline; render it in golden brown).
- `Loader` (spinner), `EmptyState`, `ErrorMessage`.
- `Modal` (native `<dialog>`, focus trap, Esc to close).
- Keep `IconButton`, `Logo`, `Collapsible`, re-themed.

**M1.3: Announcement bar & navbar shell**
- `AnnouncementBar`: full-width strip, text from `data/` for now (API in Phase 3, admin control in Phase 8). Supports `text`, `active` (hidden when false) and a background color.
- `Navbar`: re-theme only (logo, link row, mobile hamburger trigger). Behaviour is completed in Phase 2.
- Remove cart/account icons, and remove or hide search **[DECIDE: Q3]**.

**M1.4: Footer**
- Cream background (DESIGN.md, *not* the black footer in the reference).
- Columns: Logo + short brand line, Quick Links, Categories, Contact (phone, email, address), Wholesale CTA button.
- Mobile: stacked/accordion. Desktop: multi-column.
- Content from `data/` for now (categories from API in Phase 4, contact info from CMS in Phase 8).

**Frontend tasks:** M1.1–M1.4. Build a temporary dev-only showcase route to eyeball components (remove before Phase 9).
**Backend tasks:** None.
**Database/model tasks:** None.

**Reusable components involved:** Button, Container, SectionHeading, Loader, EmptyState, ErrorMessage, Modal, IconButton, Logo, AnnouncementBar, Navbar, Footer.

**API/routes required:** None.

**Dependencies:** Phase 0.

**Expected result:** The site shell (announcement bar, navbar, empty main and footer) renders in the GIROSONE palette and fonts at every breakpoint.

**Validation checklist**
- [ ] No hard-coded hex values in components (tokens only)
- [ ] Fonts load. Headings in Playfair and body in Poppins.
- [ ] Buttons: both variants, hover lift/scale, focus ring, disabled state
- [ ] Container widths match DESIGN.md at 720 / 1140 / 1280
- [ ] No horizontal scroll at 320px
- [ ] Touch targets ≥ 44px on mobile
- [ ] Footer readable and correctly stacked on mobile
- [ ] Reduced-motion users get no animation

**Completion criteria:** All shared components exist, are used by the shell, and match DESIGN.md.

---

## PHASE 2 – Navigation

**Objective:** Complete, accessible desktop and mobile navigation with routes for every public page.

**Features included**
- Desktop nav with **SHOP BY CATEGORIES** mega menu **[MUST]**
- ABOUT US, WHOLESALE, CONTACT links **[MUST]**
- Mobile slide drawer with hamburger animation and category accordion **[MUST]**
- Sticky navbar: transparent initially, solid on scroll (DESIGN.md) **[MUST]**
- Smooth scroll for in-page anchors and back-to-top via React Scroll **[MUST]**
- Route stubs for all public pages **[MUST]**

### Milestones

**M2.1: Routes & stubs**
- Routes: `/`, `/category/:slug`, `/product/:slug`, `/about`, `/wholesale`, `/contact`, `*` (404).
- Each stub page uses `MainLayout` and a `SectionHeading` placeholder.
- Scroll restoration on route change.

**M2.2: Desktop navigation + mega menu**

> Status: implemented early, alongside M1.3 (2026-10-06). See WORKLOG.md.
- Nav order: Home · SHOP BY CATEGORIES · ABOUT US · WHOLESALE · CONTACT.
- Mega menu: two-column layout with generous spacing listing Tea, Hing, Spice Powders and Dehydrated Powders. Each links to `/category/:slug`. Whether to list products under each category is flexible.
- Opens on hover and keyboard focus/click. Closes on Esc, outside click and route change.
- Categories come from `data/navigation.js` for now. They switch to the Category API in Phase 4.

**M2.3: Mobile drawer**

> Status: implemented early, alongside M1.3 (2026-10-06). See WORKLOG.md.
- Hamburger animates to a close icon. The drawer slides in (DESIGN.md: Drawer = Slide).
- SHOP BY CATEGORIES is an accordion inside the drawer.
- Body scroll locked while open. Focus is trapped and returned to the trigger on close.

**M2.4: Scroll behaviour**

> Status: implemented early, alongside M1.3 (2026-10-06). See WORKLOG.md. Navbar part only: the React Scroll anchors and back-to-top button are still open, and the transparent state still needs checking over the real hero (M3.2).
- Navbar is transparent at the top and turns solid beige with a soft shadow once scrolled. It is sticky throughout.
- On pages without a hero, start solid **[DECIDE: Q13]**.
- React Scroll for in-page anchors (e.g. the hero CTA scrolling to the categories section) and a back-to-top button.

**Frontend tasks:** M2.1–M2.4.
**Backend tasks:** None. **Database/model tasks:** None.

**Reusable components involved:** Navbar, MegaMenu, MobileDrawer, Collapsible (accordion), IconButton, Logo, Button, BackToTop.

**API/routes required:** None (Category API replaces static data in Phase 4).

**Dependencies:** Phase 1.

**Expected result:** Every nav link reaches its route on desktop and mobile. The menus behave correctly and accessibly.

**Validation checklist**
- [ ] Mega menu opens/closes by mouse, keyboard (Tab/Enter/Esc) and touch
- [ ] Mega menu does not overflow the viewport at 1024px
- [ ] Drawer: open/close animation, scroll lock, focus trap, closes on link click
- [ ] Category accordion works inside the drawer
- [ ] Navbar transparent → solid transition is smooth, with no layout jump
- [ ] Active route is highlighted
- [ ] Smooth scroll works, and is instant with reduced motion
- [ ] 404 page shows for unknown routes
- [ ] ARIA: `aria-expanded`, `aria-controls`, labelled buttons

**Completion criteria:** Navigation is complete on all breakpoints, and the stub pages are reachable.

---

## PHASE 3 – Home Page

**Objective:** The full home page layout, with the announcement bar and hero slider served by the backend (read-only) and all other sections built from reusable components.

**Features included**
- Announcement bar from API **[MUST]**
- Hero slider from API (images, heading, subheading, CTA) **[MUST]**
- Category section **[MUST]**
- Product sections (Featured, and optionally per-category rows) **[MUST]**
- CTA sections (Wholesale CTA, brand story / About teaser) **[MUST]**
- "Why GIROSONE" section (natural, no additives, etc.: label claims already on packaging) **[OPTIONAL]**
- Usage / "How to use" section (from product PDFs: Direct Mix, Blooming, Dry Rub) **[OPTIONAL]**

### Milestones

**M3.1: Announcement (backend + frontend)**
- Model `Announcement` `{ text, active }` + `backgroundColor` (DESIGN.md: admin edits background).
- `GET /api/announcement`: returns the active announcement or `null`.
- Seed one announcement. `services/announcementService.js`. `AnnouncementBar` fetches and falls back to hidden on error.

**M3.2: Hero slider (backend + frontend)**
- Model `HeroBanner` `{ image, heading, subHeading, buttonText, buttonLink }` + `order`, `active` (needed for slider ordering and hiding).
- `GET /api/hero-banners`: active banners sorted by `order`.
- Seed 2–3 banners with placeholder/product images.
- `HeroSlider` section: full-width, warm beige background, large product imagery, left-aligned text, autoplay with pause on hover/focus, dots + swipe on mobile, smooth transition **[DECIDE: Q14, fade vs slide]**.
- Built without a slider library unless one is clearly needed.

**M3.3: Category & product sections (static data shaped like the API)**
- `CategorySection`: grid of `CategoryCard` (large image, minimal text, gentle hover zoom). The reference shows circular thumbnails. DESIGN.md says "large image", so follow DESIGN.md.
- `ProductSection`: `SectionHeading` + grid of `ProductCard` (rounded 20px, soft shadow, image, weight selector, price, CTA) + "View all" button.
- Data comes from `data/` files whose shape **exactly matches** the Phase 4 API response, so Phase 4 only swaps the data source.

**M3.4: CTA & story sections**
- `WholesaleCTA`: olive or beige band with a short B2B pitch + button → `/wholesale`.
- `AboutTeaser`: image + short story + button → `/about`.
- Section copy from `data/home.js` (moves to the CMS in Phase 8).

**Frontend tasks:** HomePage composition, all sections above, loading/error states for API-driven sections.
**Backend tasks:** Announcement and HeroBanner models, controllers, public routes, seed script (`npm run seed`).
**Database/model tasks:** `Announcement`, `HeroBanner`. Seed data.

**Reusable components involved:** AnnouncementBar, HeroSlider, SectionHeading, CategoryCard, ProductCard, WeightSelector, Button, Container, Loader.

**API/routes required**

| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/announcement` | Public |
| GET | `/api/hero-banners` | Public |

**Dependencies:** Phases 0–2.

**Expected result:** A complete, responsive home page. The announcement and hero are database-driven. Product and category rows use API-shaped static data.

**Validation checklist**
- [ ] Inactive announcement → bar hidden. API down → page still renders.
- [ ] Hero autoplays, pauses on hover/focus, swipes on mobile, dots navigate, respects reduced motion
- [ ] Hero text is legible over images at 320px and 1440px
- [ ] Hero CTA links work (internal routes and anchors)
- [ ] Category cards zoom gently on hover. Product cards lift.
- [ ] Weight selector changes the displayed price
- [ ] Single-column mobile, 2-column tablet, wider desktop grids
- [ ] Images lazy-load below the fold, with no layout shift
- [ ] Seed script is idempotent (safe to re-run)

**Completion criteria:** The home page is visually complete per DESIGN.md, and announcement + hero are served from MongoDB.

---

## PHASE 4 – Product & Category System

**Objective:** Real catalog data. Category and product models with a variant system, public read APIs, category listing and product details pages, with the home, mega menu and footer wired to live data.

**Features included**
- Category model + API **[MUST]**
- Product model with weight/price/stock variants **[MUST]**
- Seed catalog from PROJECT.md **[MUST]**
- Category listing page **[MUST]**
- Product details page with weight/price selector **[MUST]**
- Featured products on the home page **[MUST]**
- Category filtering/navigation (via category routes and links) **[MUST]**
- Related products on the details page **[OPTIONAL]**

### Data Models

**Category** (PROJECT.md: `name, slug, image`)
```js
{
  name:  String, required, unique
  slug:  String, required, unique, lowercase   // auto from name
  image: String                                // URL/path
  // timestamps
}
```
Optional additions **[DECIDE: Q8]**: `description`, `order` (menu order).

**Product** (PROJECT.md: `name, slug, category, description, images, variants, featured, active`)
```js
{
  name:        String, required
  slug:        String, required, unique         // auto from name
  category:    ObjectId → Category, required
  description: String
  images:      [String]                         // first = primary
  variants: [{
    weight: String, required                    // "50g", "1kg"
    price:  Number, required, min 0
    stock:  Number, integer, min 0, default 0
  }]                                            // at least 1; weights unique per product
  featured:    Boolean, default false
  active:      Boolean, default true
  // timestamps
}
```
- **One product, many variants.** Never one product per weight.
- Example: *Premium Amchur Powder* → `50g`, `100g`, `250g`, `500g`, `1kg`, each with its own price and stock.
- Optional structured content fields (`highlights`, `applications`, `usageTip`, `specifications`) for the rich PDF content **[DECIDE: Q7]**.
- Index: `{ category: 1, active: 1 }`, `{ featured: 1, active: 1 }`.

### Seed Catalog (from PROJECT.md)

| Category | Products |
|----------|----------|
| Tea | Chai Patti |
| Hing | Regular Hing, Premium Compounded Hing |
| Spice Powders | Premium Amchur Powder |
| Dehydrated Powders | Onion Powder, Garlic Powder, Ginger Powder (Sonth) |

- Descriptions from the supplied product PDFs.
- Known prices from the packaging images: Onion 200g ₹240, Onion 1kg ₹1200, Garlic 500g ₹600. All other prices and stock are placeholders for the admin to correct.
- Images: use the supplied product photos where they exist. Use dummy placeholders for Amchur and Ginger.

### Milestones

**M4.1: Category model + API**: model, slug util, `GET /api/categories`, `GET /api/categories/:slug`, seed 4 categories.

**M4.2: Product model + API**: model with variant validation, `GET /api/products` (`?category=<slug>`, `?featured=true`), `GET /api/products/:slug` (active only, category populated). Seed products.

**M4.3: Category listing page** (`/category/:slug`): category header + product grid. 404 state for an unknown slug. Empty state when a category has no products. Category switcher/links between categories (chips or tabs, like the reference "Shop by" tabs).

**M4.4: Product details page** (`/product/:slug`)
- Image gallery (main image + thumbnails, swipe on mobile, zoom on hover per DESIGN.md "Images: Zoom").
- Name, category breadcrumb, weight selector, price for the selected weight, stock status ("Out of stock" when 0).
- Description (and structured sections if Q7 is approved).
- CTA **[DECIDE: Q2]**. Default: **"Enquire Now"** → `/contact` (or `/wholesale`) with product + weight pre-filled.

**M4.5: Wire live data**: swap the home `CategorySection`/`ProductSection`, mega menu, mobile drawer and footer categories from `data/` to services. Remove the replaced static data.

**Frontend tasks:** `categoryService`, `productService`, `CategoryPage`, `ProductDetailsPage`, `ProductGallery`, `WeightSelector`, `PriceTag`, `StockBadge`, `Breadcrumb`. Loading/empty/error states.
**Backend tasks:** Category + Product models, controllers, public routes, slug util, seed update.
**Database/model tasks:** Category, Product (+ variant sub-schema), indexes, seed.

**Reusable components involved:** ProductCard, CategoryCard, WeightSelector, PriceTag, StockBadge, ProductGallery, Breadcrumb, SectionHeading, EmptyState, Loader, Button.

**API/routes required**

| Method | Route | Access | Notes |
|--------|-------|--------|-------|
| GET | `/api/categories` | Public | All categories |
| GET | `/api/categories/:slug` | Public | Single category |
| GET | `/api/products` | Public | Active only. `?category=`, `?featured=` |
| GET | `/api/products/:slug` | Public | Active only. Category populated. |

> **Write (create/update/delete) APIs are intentionally deferred to Phase 7.** They must never exist without auth, which arrives in Phase 6.

**Dependencies:** Phase 3 (card components, data shapes).

**Expected result:** The site browses the real catalog: categories → listing → details, with per-weight pricing.

**Validation checklist**
- [ ] Switching weight updates price and stock instantly
- [ ] Out-of-stock variant is clearly shown and the CTA is adjusted
- [ ] Inactive product is hidden from listings and 404s on its URL
- [ ] Unknown category/product slug → friendly 404
- [ ] Variant validation: rejects 0 variants, duplicate weights, negative price/stock
- [ ] Slugs are unique and URL-safe
- [ ] Mega menu, drawer and footer show categories from the DB
- [ ] Home featured products come from the DB
- [ ] Gallery works with 1 image and with many images
- [ ] All pages responsive at 320 / 768 / 1024 / 1280+

**Completion criteria:** No product or category data remains hard-coded in the frontend, and all catalog pages work against MongoDB.

---

## PHASE 5 – Public Website Pages

**Objective:** Complete the remaining public pages, including the wholesale inquiry and contact flows.

**Features included**
- About Us page **[MUST]**
- Wholesale page **[MUST]**
- Contact page **[MUST]**
- Wholesale inquiry form (Guest role in PROJECT.md) **[MUST]**, with submission handling **[DECIDE: Q4]**
- Contact form **[MUST]** (same mechanism as the inquiry form)
- Polished 404 page **[MUST]**
- Map embed on Contact **[OPTIONAL]**

### Milestones

**M5.1: About page**: brand story, values (Quality · Trust · Excellence from the logo), image + text blocks. Copy from `data/about.js` until Phase 8.

**M5.2: Wholesale page**
- B2B pitch using the supplied B2B brochure: technical specifications, key USPs, commercial packaging options table (product, pack sizes, target industries), quality assurance note.
- Wholesale inquiry form: name, business name, phone, email, city, products of interest, quantity, message.
- Copy from `data/wholesale.js` until Phase 8.

**M5.3: Contact page**: phone, email, address (from the packaging: 646, Chanakyapuri, Near Sai Temple, Sehore (M.P.) 466001; 9993499020; girosone10@gmail.com), contact form, optional map.

**M5.4: Inquiry backend** (default if Q4 is unanswered)
- Model `Inquiry` `{ type: 'wholesale'|'contact', name, businessName?, phone, email?, message, productInterest?, quantity?, status: 'new'|'read', timestamps }`.
- `POST /api/inquiries`: server-side validation, basic spam protection (honeypot field).
- Admin viewing is added in Phase 7.

**Frontend tasks:** three pages, `InquiryForm` (reused for wholesale and contact via props), `inquiryService`, client validation, success/error feedback.
**Backend tasks:** Inquiry model/controller/route (pending Q4).
**Database/model tasks:** `Inquiry` (pending Q4).

**Reusable components involved:** SectionHeading, Container, Button, InquiryForm, FormField (Input, Textarea, Select), ContactInfo, Modal/Toast feedback.

**API/routes required**

| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/inquiries` | Public **[DECIDE: Q4]** |

**Dependencies:** Phases 1–2 (layout, nav). Phase 4 (product list for "products of interest").

**Expected result:** All public pages from PROJECT.md exist and are responsive. Visitors can send a wholesale or contact inquiry.

**Validation checklist**
- [ ] Required fields validated on client and server. Phone/email formats checked.
- [ ] Clear success and failure messages. Double-submit prevented.
- [ ] Honeypot submission is silently rejected
- [ ] "Enquire Now" from a product pre-fills the form
- [ ] Tables (packaging options) scroll or stack on mobile
- [ ] All pages responsive. No placeholder lorem ipsum in shipped copy.

**Completion criteria:** Home, Category Listing, Product Details, About, Wholesale, Contact and 404 are all complete.

---

## PHASE 6 – Admin Authentication

**Objective:** Secure, admin-only authentication. Visitors can never modify content.

**Features included**
- Admin model with hashed password **[MUST]**
- Admin creation via a CLI script (no public registration) **[MUST]**
- Login / logout / current-admin endpoints **[MUST]**
- JWT strategy **[MUST]**, storage method **[DECIDE: Q6]**
- `protect` middleware for `/api/admin/*` **[MUST]**
- Frontend protected routes + unauthorized handling **[MUST]**
- Login rate limiting **[MUST]** (can be done here or in Phase 10)

### Data Model

**Admin** (PROJECT.md: `name, email, password`)
```js
{
  name:     String, required
  email:    String, required, unique, lowercase
  password: String, required, select: false     // bcrypt hash
  // timestamps
}
```

### Milestones

**M6.1: Backend auth**
- Install `bcrypt`, `jsonwebtoken` (+ `cookie-parser` if cookies are used).
- Hash on save (pre-save hook). Add a `comparePassword` method.
- `npm run create-admin`: creates an admin from CLI args/env. Refuses duplicates.
- `POST /api/auth/login`: generic "Invalid email or password" on any failure.
- `POST /api/auth/logout`, `GET /api/auth/me`.
- `protect` middleware: verifies the token, loads the admin, 401 on missing/invalid/expired token.
- **Default strategy:** JWT in an `httpOnly`, `secure` (production), `sameSite` cookie. This avoids exposing the token to JavaScript.

**M6.2: Frontend auth**
- `authService` (login, logout, me).
- `AuthProvider` + `useAuth` (context: `admin`, `loading`, `login`, `logout`). Checks `/me` on load.
- `/admin/login` page (separate from the public layout).
- `ProtectedRoute`: redirects to `/admin/login` and returns to the intended page after login.
- Axios interceptor: on 401 from an admin call → clear auth and redirect to login.

**Frontend tasks:** M6.2.
**Backend tasks:** M6.1.
**Database/model tasks:** Admin model, unique email index.

**Reusable components involved:** FormField, Button, Loader, ErrorMessage, ProtectedRoute.

**API/routes required**

| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Admin |
| GET | `/api/auth/me` | Admin |

**Dependencies:** Phase 0 (backend). Independent of Phases 3–5, so it can run in parallel if needed.

**Expected result:** An admin can log in and out. `/admin/*` pages and `/api/admin/*` routes are inaccessible without a valid session.

**Validation checklist**
- [ ] Passwords stored only as bcrypt hashes. Password is never returned by any API.
- [ ] Wrong email and wrong password return the same message
- [ ] Expired/tampered token → 401 → redirected to login
- [ ] Logout clears the session, and Back does not reveal admin data
- [ ] Refreshing an admin page keeps the session
- [ ] No public registration endpoint exists
- [ ] Login rate limit triggers after repeated failures
- [ ] Cookie flags correct (`httpOnly`; `secure` + correct `sameSite` in production)

**Completion criteria:** Auth works end-to-end, and the `protect` middleware is ready for all admin routes.

---

## PHASE 7 – Admin Dashboard (Catalog Management)

**Objective:** Admin UI and protected write APIs to manage products, variants, product images and categories.

**Features included**
- Admin layout with sidebar navigation **[MUST]**
- Dashboard overview (counts: products, categories, out-of-stock variants, new inquiries) **[MUST]**
- Category management: add / edit / delete **[MUST]**
- Product management: add / edit / delete, activate/deactivate, feature toggle **[MUST]**
- Variant management inside the product form **[MUST]**
- Product and category image upload **[MUST]**, storage strategy **[DECIDE: Q5]**
- Inquiry inbox (list, mark as read) **[MUST if Q4 = store in DB]**

### Milestones

**M7.1: Admin layout**: `AdminLayout` with sidebar (Dashboard, Products, Categories, Hero Slider, Announcement, Website Content, Inquiries, Settings). The sidebar collapses to a drawer on mobile. Header shows the admin name and a logout button.

**M7.2: Image upload**
- **Default:** `multer` → local `BACKEND/uploads/`, served statically, behind an `imageStorage` service so Cloudinary (Future) is a one-file swap.
- Validation: image MIME types only, size limit (e.g. 2 MB), safe generated filenames.
- `ImageUpload` component: preview, replace, remove, multiple images for products, reorder **[OPTIONAL]**.

**M7.3: Category management**: list table, create/edit form (name, image), delete with a guard (**block delete while products reference it**).

**M7.4: Product management**
- List: search by name, filter by category/active **[OPTIONAL]**, show status and featured flags.
- Form: name, category select, description, images, featured, active, and a **variant editor** (add/remove rows of weight + price + stock, at least one row, unique weights).
- Delete with confirmation modal. Removes the product's uploaded images.

**M7.5: Dashboard & inquiries**: stats endpoint and cards. Inquiries list with status toggle.

**Frontend tasks:** admin pages for Dashboard, Products (list + form), Categories (list + form), Inquiries. Admin services. Confirm dialogs. Toasts.
**Backend tasks:** admin CRUD controllers/routes, upload middleware, imageStorage service, stats endpoint. All mounted under `protect`.
**Database/model tasks:** No new models (Inquiry from Phase 5). Admin list queries include inactive products.

**Reusable components involved:** AdminLayout, AdminSidebar, DataTable, FormField, ImageUpload, VariantEditor, ConfirmDialog (Modal), StatusBadge, Toast, Button, Loader, EmptyState.

**API/routes required** (all **Admin only**)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/admin/stats` | Dashboard counts |
| GET / POST | `/api/admin/categories` | List / create |
| PUT / DELETE | `/api/admin/categories/:id` | Update / delete (guarded) |
| GET / POST | `/api/admin/products` | List (incl. inactive) / create |
| GET / PUT / DELETE | `/api/admin/products/:id` | Read / update / delete |
| POST | `/api/admin/uploads` | Upload image(s) → URL(s) |
| DELETE | `/api/admin/uploads` | Remove an image |
| GET | `/api/admin/inquiries` | List inquiries **[DECIDE: Q4]** |
| PATCH | `/api/admin/inquiries/:id` | Mark read **[DECIDE: Q4]** |

**Dependencies:** Phase 4 (models), Phase 6 (auth), Phase 5 (Inquiry, if used).

**Expected result:** The admin manages the full catalog in the browser, and the changes appear on the public site immediately.

**Validation checklist**
- [ ] Every `/api/admin/*` route returns 401 without auth (test each one)
- [ ] Create product with 1 and with 5 variants → correct on the details page
- [ ] Edit variant price/stock → public price/stock updates
- [ ] Deactivate product → disappears publicly but stays in the admin list
- [ ] Featured toggle → home featured section updates
- [ ] Delete category with products → blocked with a clear message
- [ ] Upload rejects non-images and oversized files
- [ ] Deleting a product cleans up its images
- [ ] Forms show field-level server validation errors
- [ ] Admin UI usable on tablet and mobile

**Completion criteria:** Catalog CRUD is fully admin-controlled, and no code change is needed to add or edit a product.

---

## PHASE 8 – Website CMS Management

**Objective:** The admin controls all editable website content without code changes (PROJECT.md: "Admin should control website content without code changes").

**Features included** (DESIGN.md "Admin Editable Design Areas")
- Announcement bar: text, background, visibility **[MUST]**
- Hero slider: add / edit / delete / reorder slides. Image, heading, subheading, CTA text + link, active. **[MUST]**
- Home page editable content (section headings, CTA copy, About teaser) **[MUST]**
- About page content **[MUST]**
- Wholesale page content (pitch, specs, packaging table, QA note) **[MUST]**
- Contact information (phone, email, address, social links) **[MUST]**
- Settings: admin profile + change password **[MUST]**, other settings **[DECIDE: Q9]**
- Product info/images and category info/images are already covered in Phase 7.

### Data Models (extensions beyond PROJECT.md, **[DECIDE: Q8]**)

```js
// PageContent: one document per page
{
  key:  'home' | 'about' | 'wholesale' | 'contact', unique
  // explicit, validated fields per page, e.g.
  // home:      { wholesaleCta: {heading, text, buttonText}, aboutTeaser: {...} }
  // about:     { heading, story, image, values: [{title, text}] }
  // wholesale: { heading, intro, specs: [...], packaging: [{product, packs, industries}], qualityNote }
}

// SiteSettings: singleton
{ phone, email, address, socialLinks: [{platform, url}], footerText }
```
Prefer explicit fields per page over a free-form `Mixed` blob, so validation and the admin forms stay simple.

### Milestones

**M8.1: Announcement admin**: `PUT /api/admin/announcement`, a form with a live preview of the bar.

**M8.2: Hero slider admin**: CRUD + reorder, image upload (reuses Phase 7), active toggle, preview card.

**M8.3: Page content admin**: `PageContent` model, `GET /api/content/:key`, `PUT /api/admin/content/:key`. Forms for Home, About and Wholesale. Public pages switch from `data/` to the API, keeping `data/` defaults as fallback.

**M8.4: Contact info & settings**: `SiteSettings` model, public `GET /api/settings`, admin `PUT /api/admin/settings`. Footer + Contact page read from it. Change-password endpoint.

**Frontend tasks:** admin pages Hero Slider, Announcement, Website Content (tabs per page), Settings. Public components read from `contentService` / `settingsService`.
**Backend tasks:** controllers/routes for announcement, hero, content, settings, change password. Seed defaults.
**Database/model tasks:** `PageContent`, `SiteSettings`. Extend the seed.

**Reusable components involved:** AdminLayout, FormField, ImageUpload, ListEditor (repeatable rows: values, specs, packaging), ConfirmDialog, Toast, live preview using the public components (AnnouncementBar, HeroSlide).

**API/routes required**

| Method | Route | Access |
|--------|-------|--------|
| PUT | `/api/admin/announcement` | Admin |
| GET / POST | `/api/admin/hero-banners` | Admin |
| PUT / DELETE | `/api/admin/hero-banners/:id` | Admin |
| PATCH | `/api/admin/hero-banners/reorder` | Admin |
| GET | `/api/content/:key` | Public |
| PUT | `/api/admin/content/:key` | Admin |
| GET | `/api/settings` | Public |
| PUT | `/api/admin/settings` | Admin |
| PATCH | `/api/auth/password` | Admin |

**Dependencies:** Phase 3 (announcement/hero read APIs), Phase 5 (pages), Phase 6 (auth), Phase 7 (upload + admin layout).

**Expected result:** Every item in DESIGN.md's "Admin Editable Design Areas" is editable from the admin panel.

**Validation checklist**
- [ ] Each editable area: edit → save → visible on the public site after refresh
- [ ] Announcement hide/show and background color work
- [ ] Hero: add, reorder, deactivate, delete. An empty slider hides gracefully.
- [ ] Public pages fall back to defaults if the content API fails
- [ ] Change password requires the current password, and the old password stops working
- [ ] No content area still requires a code change (grep `data/` for leftover live copy)
- [ ] All content write routes reject unauthenticated requests

**Completion criteria:** PROJECT.md's admin capability list (products, categories, hero banners, announcement bar, home content, about page, wholesale content) is fully delivered.

---

## PHASE 9 – Integration & Refinement

**Objective:** Harden the whole system as one product: consistent states, errors, validation, responsiveness and permissions.

**Features included** (all **[MUST]**)
- Consistent API error handling and messages
- Loading, empty and error states on every data-driven view
- Form validation parity (client mirrors server)
- Auth edge cases (expiry mid-session, multiple tabs)
- Full responsive pass
- Navigation and link audit
- Admin permission audit
- Animation polish per DESIGN.md (subtle only)
- Accessibility pass (keyboard, contrast, alt text, labels)

### Milestones

**M9.1: States & errors**: shared `useFetch` (or equivalent) pattern. Every page has Loader / EmptyState / ErrorMessage. Toasts for admin actions.

**M9.2: Validation parity**: one set of rules per form, enforced on both sides. Server returns field-level `errors`.

**M9.3: Responsive & animation pass**: test at 320, 360, 768, 1024, 1280 and 1440. Check DESIGN.md's animation table (Navbar slide, Hero fade, Cards lift, Images zoom, Buttons scale, Drawer slide).

**M9.4: Permission audit**: script or HTTP-client collection hitting every admin route unauthenticated (expect 401) and every public route (expect no inactive data leaks).

**M9.5: Cleanup**: remove the dev showcase route, unused components, leftover static data, console logs and dead folders.

**Frontend tasks / Backend tasks:** as listed in the milestones.
**Database/model tasks:** Review indexes and seed. Verify that public queries never return inactive items.

**Reusable components involved:** Loader, EmptyState, ErrorMessage, Toast, all forms.

**API/routes required:** No new routes.

**Dependencies:** Phases 0–8.

**Expected result:** A stable, consistent, fully integrated site and admin panel.

**Validation checklist:** see the [Testing Checklist](#testing-checklist) at the end of this document. All of it must pass.

**Completion criteria:** The full testing checklist passes, with no known bugs above "cosmetic".

---

## PHASE 10 – Production Readiness

**Objective:** Make the project safe and ready to deploy.

**Features included**
- Environment configuration per environment **[MUST]**
- Security basics **[MUST]**: `helmet`, strict CORS, rate limiting (login + inquiry), body size limits, NoSQL-injection-safe queries (Mongoose `sanitizeFilter` / strict query)
- API input validation reviewed on every write route **[MUST]**
- Image handling strategy finalised (local uploads need persistent disk on the host; otherwise move to Cloudinary) **[MUST]**
- Centralised error handling with no stack traces in production **[MUST]**
- Production build testing **[MUST]**
- Deployment preparation and README **[MUST]**
- Basic SEO meta per page (title/description) **[OPTIONAL]**. Full SEO is a Future item.

### Milestones

**M10.1: Config & security**: env validation on boot, security middleware, rate limits, cookie flags, CORS whitelist from env.

**M10.2: Image strategy**: confirm hosting supports persistent uploads. If not, implement Cloudinary in the `imageStorage` service (planned swap point).

**M10.3: Build & smoke test**: `vite build` + `vite preview` against a production-mode backend. Smoke-test every page and admin flow.

**M10.4: Deployment prep**: SPA fallback routing on the frontend host, `VITE_API_URL` per environment, MongoDB Atlas network access, seed + create-admin run against production, root README with setup/run/deploy steps. Hosting choice **[DECIDE: Q10]**.

**Dependencies:** Phase 9.

**Expected result:** Deployable builds with documented setup, and no secrets in the repo.

**Validation checklist**
- [ ] Production build has no warnings or errors. Bundle size is reasonable. No source maps exposed (unless intended).
- [ ] Missing env var → backend refuses to start with a clear message
- [ ] Error responses contain no stack traces in production
- [ ] Security headers present. CORS rejects unknown origins.
- [ ] Login and inquiry rate limits work
- [ ] Deep links (`/product/x`, `/admin/products`) work after a refresh on the host
- [ ] Uploaded images persist across a server restart/redeploy
- [ ] `git grep` finds no secrets. `.env.example` files are complete.

**Completion criteria:** The site can be deployed by following the README alone.

---

## Overall Development Sequence

| # | Milestone | Phase |
|---|-----------|-------|
| 1 | M0.1 → M0.3 Foundation + backend health check | 0 |
| 2 | M1.1 Tokens → M1.2 Components → M1.3 Announcement/Navbar shell → M1.4 Footer | 1 |
| 3 | M2.1 Routes → M2.2 Mega menu → M2.3 Drawer → M2.4 Scroll behaviour | 2 |
| 4 | M3.1 Announcement API → M3.2 Hero API + slider → M3.3 Cards/sections → M3.4 CTAs | 3 |
| 5 | M4.1 Category → M4.2 Product → M4.3 Listing → M4.4 Details → M4.5 Live wiring | 4 |
| 6 | M5.1 About → M5.2 Wholesale → M5.3 Contact → M5.4 Inquiry API | 5 |
| 7 | M6.1 Backend auth → M6.2 Frontend auth | 6 |
| 8 | M7.1 Admin layout → M7.2 Uploads → M7.3 Categories → M7.4 Products → M7.5 Dashboard/Inquiries | 7 |
| 9 | M8.1 Announcement → M8.2 Hero → M8.3 Page content → M8.4 Settings | 8 |
| 10 | M9.1 → M9.5 Integration & refinement | 9 |
| 11 | M10.1 → M10.4 Production readiness | 10 |

**Key sequencing decisions**
- **Read before write.** Public read APIs arrive with the public feature (Phases 3–5). Write APIs arrive with the admin UI that uses them (Phases 7–8), always behind auth (Phase 6). No unprotected write route ever exists.
- **API-shaped static data.** Phase 3 home sections use static data in the exact API shape, so Phase 4 only swaps the data source (no component rewrites).
- **CMS fallback.** Pages built before Phase 8 read copy from `data/`. Phase 8 moves it to the DB and keeps `data/` values as a fallback only.
- **Auth can be pulled forward.** Phase 6 depends only on Phase 0, so it may be built earlier if admin work needs to start sooner.

---

## Dependency Map

```
Phase 0  Foundation
   │
   ▼
Phase 1  Design System & Shared UI
   │
   ▼
Phase 2  Navigation
   │
   ▼
Phase 3  Home Page ───────────────┐  (Announcement + Hero read APIs)
   │                              │
   ▼                              │
Phase 4  Product & Category ──┐   │  (Category + Product read APIs)
   │                          │   │
   ▼                          │   │
Phase 5  Public Pages ─────┐  │   │  (Inquiry API)
                           │  │   │
Phase 0 ──► Phase 6  Admin Auth   │
                 │         │  │   │
                 ▼         ▼  ▼   │
            Phase 7  Admin Dashboard (catalog write APIs, uploads)
                 │                │
                 ▼                ▼
            Phase 8  CMS Management (content write APIs)
                 │
                 ▼
            Phase 9  Integration & Refinement
                 │
                 ▼
            Phase 10 Production Readiness
```

---

## Reusable Component Inventory

Identify components here before building them. Do not create duplicates.

| Component | Type | First built | Reused in |
|-----------|------|-------------|-----------|
| Button | component | P1 | everywhere |
| Container | component | P1 | everywhere |
| SectionHeading | component | P1 | home, listing, pages |
| Loader / EmptyState / ErrorMessage | component | P1 | all data views |
| Modal (ConfirmDialog) | component | P1 | admin, feedback |
| Logo, IconButton, Collapsible | component | existing → P1 | nav, footer, drawer |
| AnnouncementBar | component | P1 | public layout, admin preview |
| Navbar, MegaMenu, MobileDrawer, BackToTop | component | P1–P2 | public layout |
| Footer | component | P1 | public layout |
| HeroSlider (HeroSlide) | section | P3 | home, admin preview |
| CategoryCard | component | P3 | home, listing |
| ProductCard | component | P3 | home, listing, related |
| WeightSelector, PriceTag, StockBadge | component | P3–P4 | card, details |
| ProductGallery, Breadcrumb | component | P4 | details |
| FormField (Input/Textarea/Select) | component | P5 | public + admin forms |
| InquiryForm | component | P5 | wholesale, contact |
| ProtectedRoute | component | P6 | admin routes |
| AdminLayout, AdminSidebar | layout | P7 | all admin pages |
| DataTable, StatusBadge, Toast | component | P7 | admin |
| ImageUpload | component | P7 | products, categories, hero, content |
| VariantEditor, ListEditor | component | P7–P8 | product form, content forms |

---

## Definition of Done

A milestone is **done** only when all of these are true:

1. It meets its phase's completion criteria and its validation checklist passes.
2. It works end-to-end (UI ↔ API ↔ DB) where a backend is involved.
3. It was tested mobile-first at 320 / 768 / 1024 / 1280+ with no horizontal scroll.
4. It has loading, empty and error states.
5. It uses design tokens only, it is consistent with DESIGN.md, and its animations are subtle.
6. It reuses existing components. No duplicates were created.
7. API logic lives only in `services/` (frontend). Write routes are protected (backend).
8. Lint passes, with no console errors and no deprecation warnings.
9. WORKLOG.md is updated and the work is committed.

---

## Testing Checklist

No automated test framework is in the stack, so testing is manual browser testing plus HTTP-client checks. Adding automated tests is listed under Future Enhancements.

**Public site**
- [ ] Announcement bar shows/hides per admin setting
- [ ] Hero: autoplay, controls, swipe, CTA links, reduced motion
- [ ] Mega menu and mobile drawer: mouse, keyboard, touch
- [ ] Category → listing → product details flow
- [ ] Weight selector updates price and stock on cards and the details page
- [ ] Inactive products/categories never appear publicly
- [ ] Wholesale and contact forms: validation, success, failure, spam guard
- [ ] 404 for unknown routes and slugs
- [ ] Footer links and contact info correct

**Admin**
- [ ] Login, logout, session persistence, expiry handling
- [ ] Product CRUD incl. variants and images
- [ ] Category CRUD incl. delete guard
- [ ] Hero CRUD + reorder. Announcement edit.
- [ ] Page content + settings edits reflect publicly
- [ ] Change password

**Security & API**
- [ ] Every `/api/admin/*` route returns 401 when unauthenticated
- [ ] No password/hash in any response
- [ ] Server validation rejects bad input with field errors
- [ ] Upload accepts only images within the size limit
- [ ] Rate limits on login and inquiries

**Cross-cutting**
- [ ] Breakpoints: 320, 360, 768, 1024, 1280, 1440
- [ ] Browsers: Chrome, Firefox, Safari/iOS, Android Chrome
- [ ] Keyboard-only navigation, visible focus, alt text, form labels
- [ ] Images lazy-loaded, no layout shift, no console errors
- [ ] Production build + preview smoke test

---

## Future Enhancements

Not in the initial build. From PROJECT.md "Future Features":

- Cloudinary image hosting (the swap point is prepared in `imageStorage`)
- Razorpay payments
- Wishlist
- Search (navbar search UI, product search API)
- Filters (nutrition/preference style filters like the reference)
- SEO (meta management, sitemap, structured data)
- Analytics

Seen in the reference screenshots but **not required** by PROJECT.md:

- Cart, checkout and customer accounts
- Product ratings/reviews
- Testimonials section (only with real customer quotes)
- "As featured in" press logos and "Also available on" marketplace logos (only if real)
- Video/reel product carousel
- Newsletter subscription
- Floating WhatsApp chat button
- "Bestseller" / "% OFF" badges (would need MRP + sale price fields)

Engineering:

- Automated tests (API integration tests, component tests)
- Pagination for admin lists once the catalog grows
- Multiple admin accounts / roles

---

## Documentation Workflow

| File | Role | Updated when |
|------|------|--------------|
| **PROJECT.md** | Master requirements | Only when the owner changes scope |
| **DESIGN.md** | Design system (colors, type, spacing, UI behaviour) | Only when the visual direction changes |
| **PLAN.md** | Development roadmap (this file) | When a phase is re-scoped or an open question is answered |
| **PROMPT.md** | Feature-by-feature Claude prompts, one per milestone | Before starting each milestone |
| **WORKLOG.md** | What was actually built: date, milestone, files, decisions, deviations, follow-ups | After each milestone |

Flow per milestone: **PROJECT/DESIGN → PLAN (milestone) → PROMPT (write prompt) → build → test → WORKLOG → commit.**

If implementation reveals a conflict, fix the source document first (PROJECT/DESIGN with the owner's approval), then PLAN, then continue.

---

## Open Questions Before Implementation

Each question has a default that the plan will use if no answer is given.

| # | Question | Default used by this plan |
|---|----------|---------------------------|
| Q1 | Remove the existing out-of-scope folders (`redux/`, `components/cart`, `components/auth`, `public/images/*`) and realign to PROJECT.md's structure? | Yes, realign in Phase 0 |
| Q2 | With no cart in scope, what is the product CTA? | "Enquire Now" → pre-filled contact/wholesale form |
| Q3 | Search is a Future feature, but the current navbar has search, account and cart icons. Remove them? | Remove all three for now |
| Q4 | Where do wholesale/contact inquiries go? (stored in DB + admin inbox, emailed, or WhatsApp/mailto only) | Store in MongoDB + admin inbox (adds an `Inquiry` model) |
| Q5 | Image upload storage before Cloudinary? | `multer` → local `BACKEND/uploads/` behind a swappable service |
| Q6 | JWT storage? | `httpOnly` cookie |
| Q7 | Product model has only `description`, but the PDFs have highlights, applications, usage tips and B2B specs. Add structured fields? | Add optional `highlights`, `applications`, `usageTip`, `specifications` |
| Q8 | Accept these model extensions beyond PROJECT.md: `HeroBanner.order/active`, `Announcement.backgroundColor`, `Category.description/order`, `PageContent`, `SiteSettings`? | Yes. They are needed for the CMS requirements. |
| Q9 | What belongs on the admin "Settings" page? | Change password + contact info/social links |
| Q10 | Hosting target (the earlier session noted Vercel + Render + Atlas)? | Keep flexible until Phase 10 |
| Q11 | Catalog: the photos include **Strong Hing** and **Hing Dana (Premium Asafoetida)** jars, and **two Chai Patti packs** (gold and red). PROJECT.md lists Regular Hing + Premium Compounded Hing and one Chai Patti. Are these extra products, variants, or packaging only? | Follow PROJECT.md's list. Treat extras as images of the listed products. |
| Q12 | Fonts from Google Fonts CDN or self-hosted? | Self-hosted (performance, no third-party request) |
| Q13 | "Transparent navbar initially": over the hero only, or on every page? | Transparent over the home hero only. Solid elsewhere. |
| Q14 | DESIGN.md says the hero has a "smooth slide transition" but the animation table says "Fade". | Fade (the animation table is more specific) |
| Q15 | The B2B brochure text (moisture < 8%, 12/18-month shelf life, microbiological screening per batch) reads like a drafted template. Are these claims verified before they are published? | Publish only after owner confirmation |
| Q16 | Prices and stock for most variants are unknown (only Onion 200g/1kg and Garlic 500g are printed on packs). | Seed placeholders. The admin enters real values in Phase 7. |
