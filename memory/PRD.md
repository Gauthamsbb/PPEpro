# PPE Pro Solutions — Product Requirements Document

## Original Problem Statement
Build a complete responsive premium e-commerce website for PPE Pro Solutions, a disposable
protective glove supplier (nitrile, latex, chloroprene — brands: Adenna, GloveWorks, SkinTx,
PlastCare USA, AMMEX, ProWorks, Verdant, Blackwork, Medline). Primary customers: tattoo/piercing
studios, medical/dental practices, beauty/nail salons, expanding into food service, laboratory,
and industrial markets. Goal: drive checkout completions and bulk/quote phone inquiries. Design
direction: "Product as Hero" + "Premium Sensory Minimalism" — near-black/charcoal anchors, warm
off-white surfaces, safety orange/signal yellow accent. Full page architecture: Home, All Gloves
catalog with filtering, 6 industry pages, 3 material pages, product pages with specs/size/pack/
quantity pricing, cart & checkout, bulk quote request, sizing guide, glove selection guide, About,
Contact, policy pages (Shipping, Returns, Privacy, Terms, Accessibility).

**Explicit user instruction: all form submissions and order placement are PLACEHOLDERS. No real
Shopify, payment gateway, or outbound email integration required** — built as a custom React +
FastAPI + MongoDB app with a mock cart/checkout flow instead.

## User Choices Confirmed at Kickoff
1. Tech approach: full custom app (React/FastAPI/MongoDB) with mock checkout, not real Shopify.
2. Product catalog: seeded from real brands/products found on the live ppeprosolutions.com site.
3. Product images: AI-generated (kept simple/cheap), no real photography available.
4. Reviews: none included (no fabricated reviews, no review capture UI in this pass).
5. Scope: build all pages/features in the first pass (not phased).

## Architecture
- **Backend**: FastAPI (`/app/backend/server.py`), MongoDB via Motor (`database.py`), Pydantic
  models with `BaseDocument`/`PyObjectId` pattern (`models.py`), 20 products auto-seeded on
  startup if collection empty (`seed_data.py`).
- **Frontend**: React + React Router, Tailwind (custom tokens: `ink`, `charcoal`, `cream`,
  `safety.orange`, `safety.yellow`, `stock.in/low/out`), shadcn/ui components, Framer Motion,
  Space Grotesk (headlines) + Inter (body) + JetBrains Mono (specs/prices/tabular data).
- **Cart**: React Context (`CartContext.jsx`) persisted to `localStorage` (key `ppe_cart_v1`)
  with a lazy `useState` initializer (fixed a read/write race condition found in testing).
- **API endpoints**: `GET/POST /api/products`, `/api/products/meta`, `/api/products/{slug}`,
  `POST /api/quotes`, `POST /api/contact`, `POST /api/orders` (mock checkout with tiered case
  pricing math + shipping cost logic), `GET /api/orders/{order_number}`.

## Core Requirements (static)
- Full specs on every product (material, mil thickness, texture, powder status, ASTM standard,
  gloves/box, boxes/case) — all copy rewritten, not copied from manufacturers.
- Transparent case-quantity pricing (3 tiers) visible without login/account.
- Size + pack-size selectors, live per-size stock status, sticky mobile add-to-cart.
- Bulk quote form (name, business, email, phone*, industry, products of interest, monthly volume)
  reused on Home hero/mid-page/footer, all 6 industry pages, /quote, and About.
- 3 "thin stock" industries (Food Service, Laboratory & Cleanroom, Industrial & Automotive) show
  "Request Sourcing Quote" as the primary CTA instead of "Shop Gloves".
- WCAG-conscious basics: semantic HTML, visible focus states, reduced-motion support.
- No returns policy stated plainly (hygiene-sensitive consumable); no fabricated proof/reviews.

## What's Been Implemented (2026-07)
- 20-product catalog seeded across all 3 materials and 6 industries with real brand names,
  rewritten descriptions, computed 3-tier case pricing, per-size stock counts.
- Full page set: Home, All Gloves (filterable), 6 dynamic industry pages, 3 dynamic material
  pages, Product Detail (spec table, price breaks, size/pack/qty, sticky mobile bar), Cart,
  Checkout (mock order creation), Order Confirmation, Quote Request, Sizing Guide, Glove Guide,
  About, Contact, 5 policy pages.
- AI-generated product photography (5 colorways + hero shot) + curated industry/about imagery.
- Cart persistence bug (race condition on localStorage read/write) found and fixed in testing;
  full add-to-cart → cart → checkout → order confirmation flow verified end-to-end by testing agent.
- Backend: 22/22 automated tests passing (product filters/sort, quote/contact/order creation,
  case-tier pricing math, shipping cost tiers, out-of-stock validation, 404s).

## Backlog / Not Yet Built
- P1: Real review capture UI (explicitly deferred by user — "No reviews at the moment").
- P1: Printable spec sheet PDF export per product.
- P2: Wholesale/account-based pricing tier for repeat B2B buyers.
- P2: Wix→Shopify 301 redirect map (not applicable — this build is not on Shopify).
- P2: Real Shopify Payments / GA4 / Search Console integration if this moves beyond demo stage.

## Next Steps
- Gather user feedback on catalog depth, pricing, and design before adding real payment/email
  integrations or expanding the product catalog further.
