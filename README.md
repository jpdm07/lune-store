# LUNE — concept skincare store

Calm, editorial e-commerce UI built with **React 19**, **Vite 8**, **React Router 7**, **CSS Modules**, and **Framer Motion**. Deployed to GitHub Pages at [jpdm07.github.io/lune-store](https://jpdm07.github.io/lune-store/) (subpath `/lune-store/`).

## Run locally

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

`build` runs `vite build` and copies `dist/index.html` → `dist/404.html` for SPA routing on GitHub Pages.

## Deploy

1. Create a GitHub repo (e.g. `jpdm07/lune-store`) and add it as `origin`.
2. Push `main`.
3. From this directory:

```bash
npm run deploy
```

That uses [gh-pages](https://github.com/tschaub/gh-pages) to publish the contents of `dist/` to the `gh-pages` branch. Enable **GitHub Pages** from that branch in the repo settings.

## Optional Supabase

Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. If they are missing, the app runs in **demo mode** with data in `localStorage`. Schema starter: `supabase/schema.sql`.

## License

Private portfolio project.
