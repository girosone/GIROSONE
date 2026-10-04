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
Status: Pending

### M0.3 — Backend Skeleton + MongoDB
Status: Pending

### Phase 1 — Design System / Shared UI
Status: Pending

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
- Some header/navigation components already exist.
- Backend is not yet established.
- MongoDB is not yet configured.
- Existing frontend code contains design/architecture conflicts that will be handled during M0.2.

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

## Update Rules
After each Claude milestone:
1. Update that milestone's status.
2. Record actual files/features changed.
3. Record testing/manual verification.
4. Record unresolved issues.
5. Record the next milestone.
6. Never mark a milestone complete based only on intention.

## Next Milestone
M0.2 — Frontend Realignment.
