# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Wolf's Honey** — a premium single-page marketing + demo e-commerce landing page for a honey brand. All honey is single-origin from the **Rhodope Mountains, Bulgaria**. Two products, both €10: `Акациев Мед` (Acacia) and `Билков Мед` (Wildflower & Herb). Frontend only; all data is in-memory (no backend).

## Stack

- React 19 + Vite 8 + TypeScript
- Tailwind CSS **v4** for styling
- Framer Motion for animation, lucide-react for icons

## Commands

- `npm run dev` — start dev server (http://localhost:5173)
- `npm run build` — type-check (`tsc -b`) + production build
- `npm run preview` — serve the production build
- `npm run lint` — oxlint (this repo uses **oxlint**, not eslint)

## Conventions & gotchas

- **Tailwind v4 is CSS-first**: there is no `tailwind.config.js`. All design tokens (the `honey-*` / `ink` / `cream` / `sand` colors, fonts, easing) live in the `@theme` block of `src/index.css`. Reusable classes (`.glass`, `.glass-strong`, `.text-gold`, `.glow-*`, `.chip`, `.animate-floaty`, etc.) and `@keyframes` are also defined there — check `src/index.css` before inventing new styling.
- **One component per section** in `src/components/`; shared primitives in `src/components/ui/`, SVG visuals in `src/components/visuals/`, static content in `src/data/`.
- **lucide-react v1 has NO brand icons** (Instagram, Twitter/X, Facebook, YouTube were removed). Use inline SVG for socials — see `src/components/Footer.tsx`.
- **Visuals are pure SVG/gradient by design** (`HoneyJar`, `Honeycomb`) — no external image URLs, so nothing 404s. Keep it that way unless adding a real asset pipeline.
- **Cart is in-memory** via `CartProvider` in `src/lib/cart.tsx`: `useCart()` exposes `items`, `count`, `subtotal`, `isOpen`, `addToCart(product, qty)`, `setQty`, `removeFromCart`, `openCart`, `closeCart`. No persistence. `addToCart` takes a `Product`, not just a quantity.
- **Cart drawer** (`CartDrawer.tsx`, rendered once in `App`) and **product quick-view modal** (`ProductModal.tsx`, rendered inside `Products`) both lock body scroll via the ref-counted `src/lib/scrollLock.ts` and close on `Esc` / backdrop click. Drawer/modal overlays use `z-[60]`–`z-[90]` (navbar is `z-50`).
- **Product names are Bulgarian (Cyrillic)** with an English `nameEn`; prices are in **euros** (`€`). See `src/data/products.ts`.
- Section anchors (`#products`, `#story`, …) drive smooth-scroll nav; keep `scroll-mt-24` on sections so the fixed navbar doesn't overlap headings.
