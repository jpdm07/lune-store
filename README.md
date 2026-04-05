# LUNE — Concept home & lifestyle store

**Live site:** [jpdm07.github.io/lune-store](https://jpdm07.github.io/lune-store/)  
**Portfolio case study:** [LUNE case study](https://jpdm07.github.io/portfolio-website/lune-case-study.html) (goals, Figma prototype embed, build/deploy narrative)

LUNE is a **concept e-commerce SPA** for a slow-living home brand—textiles, ceramics, and everyday objects—designed and implemented as a single cohesive product story rather than a skin on a generic template. The goal was to ship **real shopping flows** (discovery through checkout), **trust and policy content**, and a **signed-in account area** with the same editorial calm as the brand: warm neutrals, serif headlines, monospace wayfinding, and motion that supports the UI instead of competing with it.

## What I owned

- **Product & UX:** Information architecture and journeys from shop grid → product detail → cart → shipping → payment → confirmation, plus FAQ, contact, shipping/returns/legal pages, and account subflows (orders, returns, wishlist, addresses, profile).
- **UI implementation:** React components with **CSS Modules** and design tokens (CSS custom properties) kept aligned with a **Figma** prototype so layout, type scale, and hierarchy do not drift after handoff.
- **Front-end architecture:** **React Router** for public, checkout, auth, and nested account routes; **context** for cart, wishlist, checkout draft, orders, auth, toasts, and related state so screens stay mostly layout, copy, and wiring.
- **Polish:** Search overlay, cart drawer (desktop), announcement bar, toasts, empty/error states, and **Framer Motion** for route-level motion.

## Technical summary

| Area | Choices |
|------|--------|
| **Runtime** | React 19, Vite 8 |
| **Routing** | React Router 7 (`BrowserRouter` with repo `basename` for GitHub Pages) |
| **Styling** | CSS Modules + shared variables |
| **Data** | Optional **Supabase** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`); if unset, **demo mode** persists cart/account-style data in `localStorage` so the app is fully explorable without a backend |
| **Hosting** | Static build to **GitHub Pages** (`gh-pages` branch); build copies `index.html` → `404.html` so deep links and refreshes on client routes still resolve |

## What this repo demonstrates

End-to-end **e-commerce UX** and **production-minded SPA delivery**: protected routes, multi-step checkout with shared state, optional real backend vs. offline demo, and Pages-specific concerns (base path, asset URLs, SPA fallback) handled deliberately—not as an afterthought.

## License

Private portfolio project.

---

*Jane Chavez — front-end development & UI/UX. M.S. Software Engineering, University of Houston–Clear Lake.*
