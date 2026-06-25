# Tedd Grooming Companion App — Design Spec

Date: 2026-06-25

## Purpose

A mobile companion app for the Tedd Grooming brand: lets customers browse the
product catalog and reach the brand's social/marketplace channels, mirroring
content that already exists on the website (`shop/`, `Links.html`).

## Scope (v1)

In scope:
- Product catalog browsing (read-only, no cart/checkout)
- Product detail view per item
- "Connect" screen linking out to socials, WhatsApp, Shopee, Lazada, website

Out of scope (explicitly deferred):
- Cart / checkout / payments
- Backend, API, or remote CMS for product data
- Push notifications
- Appointment booking
- A physical store address/hours screen — the brand has no physical retail
  location in the existing site content; "Find Us" in `Links.html` only
  links to socials and marketplaces, so the app's third tab is "Connect"
  rather than "Store Info"

## Tech stack

- React Native via Expo (managed workflow)
- React Navigation — bottom tab navigator with 3 tabs: Home, Catalog, Connect
- TypeScript
- No backend; all data is local/static

## Project layout

New `app/` folder at the repo root, separate from the existing static HTML
site. Structure:

```
app/
  App.tsx
  app.json
  package.json
  src/
    data/
      products.ts       # static product data, typed
    screens/
      HomeScreen.tsx
      CatalogScreen.tsx
      ProductDetailScreen.tsx
      ConnectScreen.tsx
    navigation/
      RootNavigator.tsx
    theme.ts             # shared colors/fonts
  assets/
    logo.png
    products/*.png       # copied from shop/images/
```

## Data model

Derived from `shop/TEDD CATALOG.html`, one entry per product:

```ts
type ProductSize = { label: string; image: any };

type Product = {
  id: string;
  name: string;
  meta: string;       // e.g. "Firm Hold · Natural Finish"
  scent: string;       // e.g. "Vanilla Musk Scent"
  accent: string;      // hex color, e.g. "#c8a84b"
  sizes: ProductSize[];
};
```

The 9 products to include (name — meta — scent — accent — sizes):
1. Styling Clay — Firm Hold · Natural Finish — Vanilla Musk Scent — `#c8a84b` — 60g, 120g
2. Hair Mousse — Medium Hold · Wet Finish — Parfum Scent — `#1dd4c4` — 160ml
3. Grooming Fixer — Light Hold · Natural Finish — Apple Spearmint — `#27ae60` — 120ml, 250ml
4. Classic Pomade — Control Hold · High Shine — Grapeberry Scent — `#c0392b` — 60g, 150g
5. Fixing Pomade Parfum — Strong Hold · Medium Shine — Parfum Scent — `#1dd4c4` — 60g, 150g
6. Fixing Pomade Mixfruit — Medium Hold · Medium Shine — Mix Fruit Scent — `#e67e22` — 60g, 150g
7. Moisturizing Fixer — Silky · Wet Finish — Appleberry Scent — `#c4527a` — 150ml
8. Hair Spray — Strong Hold · High Shine — Parfum Scent — `#1dd4c4` — 420ml
9. Mattifying Dust — Firm Hold · Matte Finish — Vanilla Scent — `#e2d4a8` — 25g

Images are copied 1:1 from `shop/images/` (filenames already match: e.g.
`styling-clay-60g.png`, `pomade-classic-150g.png`, `tedd-logo.png`).

## Screens

**Home**: logo, "Tedd Grooming Company" tagline, two large nav buttons
("Browse Catalog", "Connect With Us").

**Catalog**: scrollable grid of product cards (image, name, meta line, scent
badge, size pills). Tapping a card navigates to Product Detail with that
product's id. Tapping a size pill within a card swaps the displayed image
size, same behavior as the web version's `cardSize()`.

**Product Detail**: larger image (updates with size selection), name, meta,
scent badge, size picker. No price/add-to-cart (no checkout in v1).

**Connect**: list of link buttons opening external apps/URLs — TikTok,
Instagram, YouTube, Facebook, WhatsApp, Shopee, Lazada, Website — same
destinations as `Links.html`. Uses React Native `Linking.openURL`; no need to
replicate the app-vs-web-fallback JS logic from the HTML version since
`Linking` already lets the OS handle installed-app vs. browser fallback.

## Visual style

Dark theme matching the existing site:
- Background `#080808`
- Gold accent `#c8a84b`
- Per-product accent colors as listed above (badges, borders)
- Fonts: Oswald (headings/labels), Inter (body) — loaded via
  `expo-font` / `@expo-google-fonts/oswald` and `@expo-google-fonts/inter`,
  falling back to system fonts if unavailable

## Error handling

- Missing/broken external link: `Linking.openURL` rejection is caught and
  silently ignored (matches current site behavior of just being a dead link
  in that edge case — no in-app error UI needed for v1)
- No network calls are made for product data, so no loading/error states are
  needed for the catalog itself

## Testing

Manual verification via Expo Go / web preview:
- Catalog renders all 9 products with correct images and size toggles
- Product Detail navigation works for each product
- Connect screen buttons open the correct destinations (verified via URL,
  not necessarily by confirming the target app installs)
- No automated test framework is being introduced for this v1; revisit if
  the app grows checkout/booking logic later
