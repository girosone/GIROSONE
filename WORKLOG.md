# GIROSONE — Worklog

## Project Goal
Build a complete, fully functional GIROSONE Spices & Foods website based on the supplied reference screenshots, with React + Tailwind frontend, Node/Express backend, MongoDB, public pages, and protected admin/CMS functionality.

## Source of Truth
- `PROJECT.md` — requirements and scope
- `DESIGN.md` — visual/design system
- `PLAN.md` — milestone sequence
- `PROMPT.md` — Claude working rules
- `WORKLOG.md` — actual implementation state

## Confirmed Product Catalog
1. Chai Patti
2. Regular Hing
3. Premium Amchur Powder (Dry Mango Powder)
4. Premium Compounded Hing Powder (Asafoetida)
5. Premium Dehydrated Onion Powder
6. Premium Dehydrated Garlic Powder
7. Premium Dehydrated Ginger Powder (Sonth)

## Confirmed Decisions
| Question | Decision |
|---|---|
| Remove old unused folders? | Yes, after confirming they are unused. |
| Product CTA? | `Enquire Now` → prefilled Contact/Wholesale inquiry flow. |
| Search / Account / Cart? | Remove for current scope. |
| Inquiry destination? | MongoDB + Admin inquiry inbox. |
| Image storage? | Local Multer behind a storage abstraction; Cloudinary later if needed. |
| JWT storage? | `httpOnly` cookie. |
| Structured product fields? | Yes. |
| CMS model extensions? | Yes, when required. |
| Admin Settings? | Change password + contact/social settings. |
| Hosting? | Flexible until production phase. |
| Catalog/photo mismatch? | Follow the 7 products in `PROJECT.md`; extra package photos are imagery only. |
| Fonts? | Self-host when practical. |
| Navbar transparency? | Transparent only over Home hero; solid elsewhere. |
| Hero transition? | Fade. |
| Brochure technical claims? | Verify before publishing. |
| Unknown price/stock? | Use placeholders until confirmed. |
| MongoDB timing? | M0.3; not required for M0.1. |

## Current Status
### M0.1 — Repository & Documentation
Status: Completed (2026-10-04). First commit not yet made.

Done:
- `PROJECT.md`, `DESIGN.md`, `PLAN.md`, `PROMPT.md`, `WORKLOG.md` at root
- root `.gitignore`
- Git initialized at project root (branch `main`)

### M0.2 — Frontend Realignment
Status: Completed (2026-10-05). Not committed yet.

### M0.3 — Backend Skeleton + MongoDB
Status: Completed (2026-10-05). Not committed yet.

### Phase 1 — Design System / Shared UI
Status: Completed. M1.1 (2026-10-05), M1.2 and M1.3 (2026-10-06), M1.4 Footer (2026-10-07). M1.4 not committed yet.

### Phase 2 — Navigation / Routing
Status: In progress. M2.2, M2.3 and the navbar part of M2.4 were implemented early, in the M1.3 session (2026-10-06). M2.1 (route stubs) and the React Scroll anchors / back-to-top part of M2.4 pending.

### Phase 3 — Home Page
Status: Pending

### Phase 4 — Product & Category System
Status: Pending

### Phase 5 — Public Pages / Inquiry
Status: Pending

### Phase 6 — Admin Authentication
Status: Pending

### Phase 7 — Admin Dashboard
Status: Pending

### Phase 8 — CMS
Status: Pending

### Phase 9 — Integration / QA
Status: Pending

### Phase 10 — Production Readiness
Status: Pending

## Existing State
- Frontend exists with Vite + React.
- Tailwind v4 and React Router are present.
- Header/navigation components live in `components/` (flat), `MainLayout` in `layouts/`, nav data in `data/navigation.js`.
- `axios` and `react-scroll` are installed. `services/api.js` is the single Axios instance.
- Backend exists: Express 5 + Mongoose 9, ES modules, `GET /api/health`, JSON 404 and error handling.
- MongoDB connects through `MONGODB_URI` (local `mongodb://127.0.0.1:27017/girosone` in development). No models yet.
- Folder structure matches PROJECT.md.
- DESIGN.md tokens, self-hosted Playfair Display + Poppins and the 720 / 1140 / 1280 container are live in `index.css`. The old teal/Oswald/Jost theme is gone.
- Shared UI layer exists in `components/` (Button, Container, Section, SectionHeading, Loader, EmptyState, ErrorMessage, Modal, FormField, WeightSelector, ProductCard, CategoryCard). Dev-only preview at `/dev/components`.
- Site shell is announcement bar → sticky navbar → page → footer. The navbar is transparent over Home (route `handle: { transparentHeader: true }`) and solid elsewhere. Desktop mega menu and mobile drawer are complete. Only `/` and the 404 page exist as routes.

## Session Log
### Planning
Status: Completed.
PLAN.md has been created and the project decisions above are confirmed.

### M0.1 — Repository & Documentation (2026-10-04)
Status: Completed.

Changed:
- Renamed `DESIGN (1).md` → `DESIGN.md` and `PROJECT(1) (2).md` → `PROJECT.md` (content unchanged).
- Added root `.gitignore`: `node_modules/`, `.env` / `.env.*` (except `.env.example`), `dist/`, `dist-ssr/`, `build/`, `BACKEND/uploads/`, logs, editor/OS files.
- Ran `git init -b main` at the project root.
- No packages installed. No application code touched.

Verified:
- All five docs are at the root under their canonical names.
- `git check-ignore`: `node_modules`, `.env`, `FRONTEND/.env`, `BACKEND/.env.production`, `BACKEND/uploads/*` and `FRONTEND/dist/*` are ignored. `.env.example` files and the docs are not.
- `git status` lists 50 untracked files (docs + `FRONTEND/` source). No `node_modules` or build output among them.
- No nested `.git` in `FRONTEND/` or `BACKEND/`.

Issues / notes:
- Nothing is committed yet. PLAN.md makes the first commit a Phase 0 completion criterion.
- `BACKEND/` is empty, so git does not track it until M0.3 adds files.
- `FRONTEND/.gitignore` (Vite default) is kept. It overlaps with the root file and does no harm.

### M0.2 — Frontend Realignment (2026-10-05)
Status: Completed.

Changed:
- Installed `axios` ^1.20.0 and `react-scroll` ^1.9.3 (react-scroll is not used until Phase 2).
- `FRONTEND/src` now has exactly: `assets/{images,icons,logo}`, `components/`, `sections/`, `pages/`, `layouts/`, `services/`, `hooks/`, `utils/`, `data/`.
- `components/layout/MainLayout.jsx` → `layouts/MainLayout.jsx`.
- `components/layout/*` and `components/common/*` flattened into `components/` (AnnouncementBar, Header, Navbar, MegaMenu, MobileMenu, Collapsible, IconButton, Logo).
- `services/navigationData.js` → `data/navigation.js`. Categories corrected to PROJECT.md's four (Dehydrated Powders split out of Spice Powders, "Strong Hing" removed per the catalog decision). `utilityNavigation` (search/account/cart) removed.
- `assets/Images/logo.{png,webp}` → `assets/logo/`.
- New `services/api.js`: Axios instance, `baseURL` from `VITE_API_URL`, `withCredentials: true` (httpOnly-cookie JWT decision).
- New `FRONTEND/.env.example` with `VITE_API_URL=http://localhost:5000/api`.
- Navbar/Header/MobileMenu: search, account and cart controls removed (confirmed decision; all three linked to 404 routes).

Removed:
- `src/redux/`, `components/{admin,auth,cart,home,products}/`, `public/images/*` (7 subfolders): all empty, `.gitkeep` only.
- `components/layout/SearchBar.jsx`: search is a Future feature.

Verified:
- `npm run lint` and `npm run build` pass with no warnings.
- Dev server in Chrome at 360px and 1280px: home renders, logo loads, no horizontal scroll, no console errors/warnings. Mobile drawer opens/closes and its accordion lists the 4 categories. Mega menu opens, lists the 4 categories, closes on Esc. Unknown route shows the 404 page.
- `services/api.js` loaded in the browser reports `baseURL` = `VITE_API_URL` and `withCredentials` = true.
- `FRONTEND/.env` is git-ignored, `.env.example` is not.

Issues / notes:
- Not committed. The `src/assets` renames are staged (needed so git records the lowercase `images/` folder on Windows).
- No `FRONTEND/.env` was created. Copy `.env.example` to `.env` before M0.3's health-check call.
- Announcement text still says "Free Shipping Above ₹799", which makes no sense without a cart. Left for M1.3.
- Nav has no "Home" item and the mega menu's "Shop all spices" link points to `/shop`, which is not a planned route. Left for M2.2.
- `IconButton`'s `badge` and `to` props and `assets/logo/logo.png` (1 MB source file) are currently unused. Left in place.
- PLAN.md's "Current State" section still describes the pre-M0.2 layout.

### M0.3 — Backend Skeleton + MongoDB (2026-10-05)
Status: Completed.

Changed:
- `BACKEND/package.json`: ES modules, Node >= 22, scripts `dev` (`node --watch server.js`) and `start`.
- Installed `express` ^5.2.1, `mongoose` ^9.10.4, `cors` ^2.8.6. No dotenv, nodemon or asyncHandler.
- `config/env.js`: loads `BACKEND/.env` with `process.loadEnvFile` when the file exists, requires `MONGODB_URI` and `CLIENT_URL`, validates `PORT`, exits with a clear message otherwise. Exports a frozen `env` object; other files read config from it, not from `process.env`.
- `config/db.js`: `mongoose.connect` with a 5s server-selection timeout, logs host/database, exits on failure.
- `server.js`: CORS restricted to `CLIENT_URL` with `credentials: true`, JSON body parser, `/api/health`, 404 + error middleware, connects to MongoDB before listening, port-in-use message, graceful shutdown.
- `routes/healthRoutes.js`, `controllers/healthController.js`: `GET /api/health` → `{ success: true, data: { status, database, environment, uptime, timestamp } }` (503 if the DB connection has dropped).
- `middleware/notFound.js`, `middleware/errorHandler.js`, `utils/ApiError.js`: errors return `{ success: false, message, errors? }`. 5xx messages are hidden in production and logged on the server.
- `BACKEND/.env.example`: `NODE_ENV`, `PORT`, `MONGODB_URI`, `CLIENT_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- `models/` and `services/` hold only a `.gitkeep` until their first real file.

Verified (local MongoDB service, Node 22.14):
- No `.env` / missing variable / invalid `PORT` → named in the message, exit 1.
- Unreachable `MONGODB_URI` → `MongoDB connection failed: connect ECONNREFUSED …` after ~5s, exit 1. Malformed URI fails immediately.
- `npm run dev` logs the MongoDB connection and the listening URL, with no deprecation warnings.
- `GET /api/health` → 200 with the standard format. Unknown route → JSON 404. Malformed JSON body → JSON 400.
- A temporary async route that throws → JSON 500 without any wrapper (Express 5), generic message under `NODE_ENV=production`. The route was removed afterwards.
- CORS: `Access-Control-Allow-Origin: http://localhost:5173` + `Allow-Credentials: true`; other origins are not allowed.
- End-to-end in Chrome: `services/api.js` on the Vite dev server called `/health` (200) and an unknown route (JSON 404).
- `BACKEND/.env` is git-ignored, `.env.example` is not.

Issues / notes:
- Not committed.
- A local `BACKEND/.env` was created as a copy of `.env.example` (git-ignored, placeholder `JWT_SECRET`).
- `JWT_SECRET` / `JWT_EXPIRES_IN` are in `.env.example` but are not required at boot yet; add them to the required list in M6.1 when they are first used.
- `helmet`, rate limiting and body-size limits are Phase 10 items and were not added.

### M1.1 — Tokens & Global Styles (2026-10-05)
Status: Completed.

Changed:
- Installed `@fontsource-variable/playfair-display` ^5.3.0 and `@fontsource/poppins` (400 / 500 / 600), imported from `index.css`. Fonts are bundled by Vite; the Google Fonts `<link>`s were removed from `index.html`.
- `src/index.css` `@theme static`: colors `bg`, `bg-alt`, `olive`, `gold`, `ink`, `white`; `--font-heading`, `--font-body`; radii `button` 999px, `card` 20px, `image` 24px, `input` 14px; `--shadow-soft`; default transition 300ms ease; `--spacing-section` 48px, `--spacing-hero` 64px; containers `tablet` 720, `laptop` 1140, `desktop` 1280. `xs` breakpoint and the marquee animation are kept.
- Base styles: beige page, charcoal Poppins body text, Playfair Display h1–h4 with a mobile-first scale (h1 36 → 48 → 60px), golden-brown `:focus-visible` outline and `::selection`, reduced-motion block.
- `page-container` now follows DESIGN.md widths (100% → 720 → 1140 → 1280). `link-underline` uses the gold and transition tokens.
- Removed tokens: `brand`, `accent`, `surface`, `surface-muted`, `ink-muted`, `line`, `font-display` (Oswald), Jost.
- Existing components/pages only had class names swapped to the new tokens (`bg-bg`, `bg-olive`, `text-gold`, `text-ink/70`, `border-ink/10`, `shadow-soft`, `rounded-card`, `rounded-button`). Nav and announcement labels moved from Oswald to Poppins medium. No new components or sections.
- `index.html` `theme-color` → olive.

Verified:
- `npm run lint` and `npm run build` pass with no warnings.
- Chrome (playwright-core, dev server): all tokens resolve on `:root`; body is Poppins on `#F6F1E7`, h1 is Playfair Display 600; fonts report loaded and no request leaves localhost.
- Container width 720 at 768px, full width at 1024px, 1280 at 1440px and 1920px. No horizontal scroll at 320 / 360 / 768 / 1024 / 1280 / 1440 / 1920.
- Keyboard focus shows a 2px golden-brown outline with 2px offset.
- Mega menu opens, lists the 4 categories, closes on Esc. Mobile drawer opens/closes and its accordion works at 320px and 360px. Menu button is 44×44. 404 page renders. No console errors or warnings.
- `prefers-reduced-motion: reduce`: transitions collapse to ~0ms, smooth scroll is off, the marquee is replaced by static text, no running animations.

Issues / notes:
- Not committed.
- `logo.webp` has a white background, which now shows as a white box on the beige header. Needs a transparent logo file (M1.3).
- The golden-brown focus outline has low contrast on olive surfaces (about 1.4:1). Nothing focusable sits on olive yet; give olive bands a white outline when M1.2/M1.3 add buttons or links there.
- `₹` is only in Poppins' Devanagari subset, so the current announcement text pulls one extra 39 kB font file. It goes away if the announcement copy changes in M1.3.
- `favicon.svg` is still the Vite default.
- `--color-bg-alt`, `rounded-image`, `rounded-input`, `py-section` and `py-hero` are defined but not used until M1.2+.
- VS Code's built-in CSS linter flags `@theme` / `@apply` / `@utility` as unknown at-rules. The build is unaffected.

### M1.2 — Core Components (2026-10-06)
Status: Completed.

Changed:
- New in `components/`: `Button` (primary / secondary, sm / md / lg, `fullWidth`, renders `<button>`, router `Link` via `to`, or `<a>` via `href`), `Container` (wraps `page-container`), `Section` (48px → 64px vertical rhythm, `tone` default / alt), `SectionHeading` (title, optional subtitle, golden-brown ornamental divider, centre / left), `Loader`, `EmptyState`, `ErrorMessage`, `Modal` (native `<dialog>`), `FormField` (`as` input / textarea / select with label, hint, error, required), `WeightSelector` (radio group), `ProductCard`, `CategoryCard`.
- `ProductCard` and `CategoryCard` take objects shaped like the PLAN.md Product / Category models. `ProductCard` keeps only the selected weight as local state; the CTA is "Enquire Now" and links to the product page unless `ctaTo` (path or `(product, variant) => path`) is passed.
- New `hooks/useDialog.js` (syncs a native `<dialog>` with an `open` flag), used by `Modal` and `MobileMenu`. New `utils/formatPrice.js` (`en-IN` INR).
- `Logo`: `mix-blend-multiply` removes the white box on beige surfaces using the existing `logo.webp`; intrinsic `width`/`height` added. The logo itself is unchanged.
- `NotFoundPage` now uses `Button` and `Container`.
- `pages/ComponentShowcase.jsx` at `/dev/components`: temporary, registered only when `import.meta.env.DEV`, lazy-loaded. Remove in M9.5.
- No packages added. No new colors, fonts, radii or shadows.

Verified:
- `npm run lint` and `npm run build` pass with no warnings. The showcase is not in the production bundle. No hex values in `components/`, `pages/`, `hooks/`, `utils/`.
- Chrome (playwright-core, dev server) at 320 / 360 / 768 / 1024 / 1280 / 1440: no horizontal scroll, no console errors or warnings, every link / button / field / weight pill in the showcase is at least 44px tall. Container is 720 at 768px and 1280 at 1280px+.
- Button: golden-brown / white / 999px / 300ms, hover lifts 2px with the soft shadow, secondary is transparent with olive border and text, disabled is non-interactive at 50% opacity.
- ProductCard: weight change updates the price by click and by arrow keys (₹240 → ₹1,200 → ₹240); card lifts on hover; 20px radius, soft shadow. CategoryCard image zooms to 1.05 on hover.
- FormField: 14px radius, `aria-invalid` + `aria-describedby` on error, `required` passed through.
- Modal: opens as a modal with an accessible name, focus stays inside, closes on Esc, close button and backdrop click, focus returns to the trigger.
- Reduced motion: transitions collapse to ~0ms, the spinner is replaced by its text label, no running animations.
- Existing behaviour: mobile drawer opens / closes and its accordion lists the 4 categories, mega menu opens, 404 page renders. Logo shows no white box in the header or the drawer.

Issues / notes:
- Not committed.
- The logo fix is CSS only, so it works on light surfaces. On an olive or dark band the logo would darken; that still needs a transparent logo file. `logo.webp` is 900×230 and its dark-blue wordmark is not in the DESIGN.md palette (asset question for the owner, not changed).
- DESIGN.md has no error / danger color. `FormField` and `ErrorMessage` show errors with charcoal text, a stronger border and an icon. Add a token to DESIGN.md if a red is wanted.
- `ProductCard`'s "Enquire Now" links to the product page for now. The prefilled inquiry link is wired through `ctaTo` when the Contact / Wholesale forms exist (Phase 5).
- No stock display on the card yet (`StockBadge` is Phase 4). `PriceTag` was not split out; the price is formatted inline with `formatPrice`.
- The showcase uses the logo as a stand-in image, since `assets/images` is still empty.
- Still open from M1.1: focus-ring contrast on olive surfaces, the default Vite favicon, the announcement copy.

### M1.3 — Announcement bar & navbar shell, with M2.2–M2.4 navigation implemented early (2026-10-06)
Status: M1.3 completed. M2.2, M2.3 and the navbar part of M2.4 implemented early. M1.4 (Footer) not started.

Milestone ownership (per PLAN.md; corrected 2026-10-07):
- M1.3: `AnnouncementBar`, the announcement data and copy, the announcement bar → navbar → page hierarchy in `MainLayout`, the re-themed navbar shell (logo row, link row, hamburger trigger), the transparent logo file.
- M2.2 (early): Home nav item and nav order, `MegaMenu` behaviour, removal of the `/shop` link.
- M2.3 (early): `MenuIcon` hamburger animation, `MobileMenu` changes, `IconButton` children, drawer closing at the desktop breakpoint.
- M2.4, navbar part (early): sticky `Header`, transparent over Home and solid elsewhere, `--header-height`, route `handle.transparentHeader`, the `HomePage` placeholder offset.
- M1.4 is the Footer. The request labelled this work "M1.3 + M1.4", but no Footer work was requested or done.
- Not done in Phase 2: M2.1 route stubs; M2.4 React Scroll anchors and back-to-top.

Changed:
- `AnnouncementBar`: now takes `text`, `active`, `backgroundColor` (the planned Announcement model). Hidden when `active` is false or the text is empty. Default background is the olive token; a `backgroundColor` value is applied inline. Long text wraps and stays centred on mobile; the marquee and its keyframes were removed.
- `data/navigation.js`: `announcement` reshaped to `{ text, active, backgroundColor }` with new copy ("GIROSONE Spices & Foods · Quality · Trust · Excellence", no shipping claim). `Home` added as the first nav item. The `/shop` href and "Shop all spices" link were removed, since no such route is planned. Category groups are unchanged.
- `MainLayout`: renders `AnnouncementBar` → `Header` → `main`. Reads `handle.transparentHeader` from the matched routes with `useMatches`. The index route in `App.jsx` sets it.
- `Header`: only the navbar is sticky; the announcement bar scrolls away. Fixed height from `--header-height` (64px mobile, 128px from 1024px, defined in `index.css`). In overlay mode it has a negative bottom margin so the page runs underneath, is transparent at the top and turns solid beige with the soft shadow after 8px of scroll. On other routes it is solid from the start. The drawer closes if the viewport reaches the desktop breakpoint.
- `Navbar`: logo row plus centred link row (desktop), hamburger trigger (below 1024px). The bottom border was dropped so the height is exact.
- New `MenuIcon`: three bars that morph into a close icon. Used by the navbar trigger and by the drawer's close button, where the morph replays as the drawer opens. `IconButton` now accepts children as an alternative to `icon`.
- `MegaMenu`: closes on an outside pointer press (covers Safari, which does not focus a clicked button), trigger is highlighted on category / product routes, view-all link removed. Hover, click, Enter, Esc and focus-leave handling were already there.
- `MobileMenu`: uses `MenuIcon` for the close button, view-all link removed. Scroll lock, focus trap, Esc and focus return come from the native `<dialog>`.
- `Logo`: `logo.webp` regenerated from `logo.png` with a transparent background (600×153, white removed by colour-to-alpha). `mix-blend-multiply` removed: it stopped working once the logo sat inside the transparent sticky header. The link is now at least 44px tall.
- `HomePage` placeholder: beige-alt band with `pt-(--header-height)` so it sits under the transparent navbar the way the hero will.
- No packages added.

Verified:
- `npm run lint` and `npm run build` pass with no warnings. No hex values in `components/`, `layouts/`, `pages/`, `hooks/`.
- Chrome (playwright-core, dev server), 174 checks, no console errors or warnings:
  - 320 / 360 / 768 / 1024 / 1280 / 1440 on `/` and `/about`: no horizontal scroll; bar sits directly above the navbar; Home content starts under the navbar, other pages below it; navbar transparent at the top of Home and solid elsewhere; after scrolling it is stuck at the top, solid, shadowed and the same height; transparent again back at the top.
  - Desktop (1024, 1280): nav order Home · Shop by Categories · About Us · Wholesale · Contact; mega menu opens on hover, click and Enter, shows the 4 categories in two columns, stays inside the viewport, closes on mouse leave, Esc (focus back on the trigger), outside click, focus leaving and link click; golden-brown focus ring; active link follows the route; trigger highlighted on `/category/hing`.
  - Mobile / tablet (320, 360, 768, touch): 44px hamburger with `aria-expanded` / `aria-controls` / `aria-haspopup`; drawer opens as a modal, page scroll locked, focus trapped; accordion expands to the 4 categories and collapses; every drawer target is at least 44px; closes on Esc (focus back on the trigger), close button, backdrop tap, link tap and on resize to desktop; active route highlighted.
  - AnnouncementBar returns nothing when inactive or empty and applies a custom background.
  - Reduced motion: header, drawer and icon transitions collapse to ~0ms and the drawer opens instantly.

Issues / notes:
- Not committed.
- `/about`, `/wholesale`, `/contact`, `/category/:slug` and `/product/:slug` still render the 404 page until M2.1 adds the stubs.
- Footer (PLAN.md M1.4), React Scroll in-page anchors and the back-to-top button (M2.4) are not built.
- Real Hero verification is deferred: the Home placeholder is plain beige, so the transparent navbar has not been checked over real hero photography. The logo and charcoal links assume a light hero (DESIGN.md: warm beige). Verify in M3.2 before treating M2.4 as fully validated.
- A custom announcement `backgroundColor` keeps white text. A light colour would need a text colour too; decide in M8.1.
- DESIGN.md lists the navbar animation as "Slide". Implemented: background / shadow fade on scroll and a short slide on the mega menu panel. The navbar itself does not slide in or out.
- The sticky desktop navbar is 128px tall (logo row + link row). It could be reduced to the link row on scroll later if it feels heavy.
- `logo.webp` grew from 28 kB to 85 kB because of the alpha channel. The wordmark is still dark blue and still only suits light surfaces.
- Not tested in Firefox or Safari. The drawer and icon entry animations use `@starting-style` and `transition-behavior: allow-discrete`; older browsers open the drawer without the animation.
- `react-icons` `FiMenu` / `FiX` are no longer used. `IconButton`'s `badge` and `to` props and `logo.png` are still unused.
- Still open: focus-ring contrast on olive surfaces, the default Vite favicon.

### M1.4 — Footer (2026-10-07)
Status: Completed.

Changed:
- New `components/Footer.jsx`, rendered by `MainLayout` after `main`. Reuses `Logo`, `Button`, `Container` and `Collapsible`.
- Background is the secondary cream token (`bg-bg-alt`) with a hairline top border, so the footer reads as its own band against the primary cream page.
- Blocks: logo + brand line, Wholesale (short line + primary `Button` → `/wholesale`), Quick Links, Categories, Contact (phone as `tel:`, email as `mailto:`, address in an `<address>`), copyright bar with the current year.
- Layout: below 768px one column, with Quick Links and Categories as accordions and Contact always visible; the CTA button is full width below 640px. From 768px two rows (brand | wholesale, then Quick Links | Categories | Contact). From 1024px four columns, with the Wholesale block under the brand line in the first column.
- New `data/footer.js`: `contact` (same fields as the planned SiteSettings model) and `footer` (legal name, brand line, link groups, wholesale copy). Quick Links and Categories are derived from `mainNavigation`, so routes are defined once.
- New `hooks/useMediaQuery.js`: the footer uses it to switch the link groups between accordion and open column, because `Collapsible` marks a closed panel `inert`.
- No packages added. No new tokens. Announcement bar and navbar untouched.

Verified:
- `npm run lint` and `npm run build` pass with no warnings. No hex values in `components/`, `data/`, `hooks/`.
- Chrome (playwright-core, dev server), 423 checks at 320 / 360 / 768 / 1024 / 1280 / 1440 on `/` and `/about`, no console errors or warnings. 411 passed; the 12 failures were checked by hand and are test artefacts (see notes).
  - No horizontal scroll, nothing in the footer overflows the viewport, footer sits after `main` at the bottom of the page, announcement bar and header still present.
  - Content: logo, brand line, 4 quick links, 4 categories with `/category/:slug` hrefs, phone, email, address, CTA, copyright.
  - Mobile (320, 360, touch): accordion buttons are 56px with `aria-expanded` / `aria-controls`; panels start collapsed and `inert`, open on tap, toggle with Enter and Space; every link and button is at least 44px; CTA is full width.
  - Tablet / desktop: no accordion buttons, Quick Links / Categories / Contact share a row, no link label wraps; from 1024px the brand column sits in the same row.
  - CTA is the primary `Button` (golden brown, white text, 999px). Footer links, CTA and logo navigate, and the page returns to the top.
  - Keyboard at 1280px: tab order matches the visual order (logo, CTA, quick links, categories, phone, email); 2px golden-brown focus ring.
  - Contrast on the footer background: body text 6.4:1, olive headings 5.8:1, button label 5.3:1.
  - Resize 360 → 1280 → 360 switches between accordion and columns. Reduced motion collapses the accordion transition.
  - Mega menu and mobile drawer still open.

Issues / notes:
- Not committed.
- The 12 failed checks: Playwright's role queries still list links inside an `inert` panel (keyboard Tab does skip them, checked separately), and the scroll-to-top check sampled the page mid smooth-scroll (it reaches 0 within about 600ms).
- Footer links to `/about`, `/wholesale`, `/contact` and `/category/:slug` land on the 404 page until M2.1.
- Contact details are the ones PLAN.md M5.3 lists from the packaging. The `+91` prefix on the phone number is an addition; confirm with the owner.
- The brand line and the wholesale line are placeholder copy written for this milestone. They move to the CMS in Phase 8.
- Link hover uses golden brown, which is 4.1:1 on the footer background (resting text is 6.4:1).
- `logo.webp` has built-in transparent padding, so the footer logo sits a few pixels right of the text edge.
- No social links or newsletter: neither is in PROJECT.md (newsletter is listed under Future / not required).
- `Header` still has its own inline `matchMedia` effect; it was not moved to `useMediaQuery` to keep the navbar untouched.
- Not tested in Firefox or Safari.
- Still open: focus-ring contrast on olive surfaces, the default Vite favicon.

## Update Rules
After each Claude milestone:
1. Update that milestone's status.
2. Record actual files/features changed.
3. Record testing/manual verification.
4. Record unresolved issues.
5. Record the next milestone.
6. Never mark a milestone complete based only on intention.

## Next Milestone
M2.1 — Routes & stubs (Phase 2). Commit M1.4 first.
