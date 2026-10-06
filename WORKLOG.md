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
Status: In progress. M1.1 completed (2026-10-05). M1.2 completed (2026-10-06), not committed yet. M1.3–M1.4 pending.

### Phase 2 — Navigation / Routing
Status: Pending

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

## Update Rules
After each Claude milestone:
1. Update that milestone's status.
2. Record actual files/features changed.
3. Record testing/manual verification.
4. Record unresolved issues.
5. Record the next milestone.
6. Never mark a milestone complete based only on intention.

## Next Milestone
M1.3 — Announcement bar & navbar shell (Phase 1). Commit M1.2 first.
