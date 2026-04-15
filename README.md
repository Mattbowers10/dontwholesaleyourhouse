# Don't Wholesale Your House

A two-function Next.js app for DWYH, a Knoxville, TN home-buying group:

1. **Public landing page** — educates sellers about home wholesalers and routes interested homeowners to a contact form.
2. **Admin dashboard** — password-protected property tracker (under contract → rehab → listed → sold) with full CRUD. Intended to be DWYH's single source of truth for the portfolio.

Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, JSON-file persistence (swap for Postgres later), cookie session auth.

---

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then edit values
npm run dev
```

Open <http://localhost:3000>. The admin is at `/admin/login`.

### Environment variables

Create `.env.local`:

```
ADMIN_PASSWORD=pick-a-strong-password
AUTH_SECRET=at-least-32-chars-of-random-string
```

If unset in development, a dev fallback (`dwyh-admin`) is used so the app still boots — **set these before deploying**.

---

## What's where

```
src/
  app/
    page.tsx                      — Public landing page
    api/
      contact/route.ts            — Contact form handler
      auth/login/route.ts         — Login (sets session cookie)
      auth/logout/route.ts        — Logout
      properties/route.ts         — GET list, POST create
      properties/[id]/route.ts    — GET / PATCH / DELETE
    admin/
      login/page.tsx              — Password login page
      layout.tsx                  — Sidebar + main shell (protected)
      page.tsx                    — Overview: metrics + stages + recent leads
      properties/page.tsx         — Table of all properties
      properties/new/page.tsx     — New property form
      properties/[id]/page.tsx    — Detail with stage switcher
      properties/[id]/edit/page.tsx
      leads/page.tsx              — Contact form submissions
  components/
    landing/                      — Hero, Problem, HowItWorks, BetterWay, About, Contact, Footer, Nav, Logo
    admin/                        — Sidebar, PageHeader, Metric, PropertyForm, StageSwitcher
    ui/                           — Button, Input/Textarea/Select/Label, StageBadge
  lib/
    types.ts                      — Property, Lead, PropertyStage
    db.ts                         — JSON-file data layer (atomic writes, seeded)
    seed.ts                       — Seed data from MASTER LOG CSV (7 properties)
    auth.ts                       — Web Crypto HMAC session tokens (edge-compatible)
    form.ts                       — FormData → PropertyInput parser
    utils.ts                      — cn(), formatCurrency/Percent/Date, parseNumber
  middleware.ts                   — Protects /admin/* via session cookie
data/                             — JSON store (created on first run)
  properties.json
  leads.json
```

---

## Design system

- **Palette** — cream `#F5EBDC`, umber `#1F1A17`, terracotta `#C2633F`, forest `#2F3E2A`. Full scale in `tailwind.config.ts`.
- **Type** — Fraunces (display serif, warm + editorial) + Manrope (body).
- **Atmosphere** — subtle radial gradient meshes on `body`, warm shadow tokens (`shadow-warm`, `shadow-warm-lg`), optional `.grain` overlay for tactile feel.
- **Stages** — semantic color chips via `.stage-*` classes in `globals.css`.

No Inter, Roboto, or Space Grotesk anywhere. No glass morphism. No generic SaaS blue.

---

## Data model notes

### Property

- **Stages**: `under_contract` → `in_rehab` → `listed` → `sold`
- **JV Split** — omitted in this draft per spec; easy to re-add if needed (add field to `types.ts`, `seed.ts`, `property-form.tsx`, detail page).
- **Interest rate** — stored as a decimal (`0.0850`). The form takes `8.5` and divides by 100 on save. Display uses `formatPercent()`.
- **IO Payments** — stored as the total projected IO payment amount (what you'll owe through the life of the loan). When rehab progress tracking is added, this becomes `projectedIO` vs `paidToDate`.
- **Money fields** — all stored as plain USD numbers. `null` means "unknown / not yet underwritten".

### Lead

Contact form submissions are stored on the server in `data/leads.json`. View them under `/admin/leads`.

---

## Admin password

The default admin password (dev fallback) is `dwyh-admin`. **Change it** by setting `ADMIN_PASSWORD` in `.env.local`.

---

## Seeding / resetting data

On first run, `data/properties.json` is initialized from `src/lib/seed.ts`. To reset everything, delete the `data/` directory and restart the dev server.

To replace the seed data, edit `src/lib/seed.ts` and delete `data/properties.json`.

---

## Production checklist

- [ ] Set `ADMIN_PASSWORD` and `AUTH_SECRET` (min 32 chars) in production env
- [ ] Replace JSON file store with a real database (Postgres via Supabase/Neon) — swap `src/lib/db.ts`
- [ ] Add email delivery for new leads (Resend/Postmark) in `src/app/api/contact/route.ts`
- [ ] Replace placeholder email `hello@dontwholesaleyourhouse.com` in landing footer
- [ ] Add analytics (Plausible/PostHog)
- [ ] Add rehab milestone/progress tracking (deferred per spec)
- [ ] Re-introduce JV split tracking when ready

---

## Roadmap (not built yet)

- Rehab progress: milestones, % complete, photos
- Multi-user admin (roles, audit log)
- PDF exports / board reports
- Zillow/Redfin sync for listed/sold prices
