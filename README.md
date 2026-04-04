# LUNE — concept home & lifestyle store

Calm, editorial e-commerce UI for a **slow-living home** brand (everyday objects—textiles, ceramics, and similar goods). Built with **React 19**, **Vite 8**, **React Router 7**, **CSS Modules**, and **Framer Motion**. Deployed to GitHub Pages at [jpdm07.github.io/lune-store](https://jpdm07.github.io/lune-store/) (subpath `/lune-store/`).

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

## Deploy (first time)

1. Create the repo on GitHub (empty: **no** README, **no** .gitignore, **no** license):  
   **[github.com/new → name it `lune-store`](https://github.com/new?name=lune-store)**  
   Then confirm the remote matches: `https://github.com/jpdm07/lune-store.git`
2. Push `main`:
   ```bash
   git push -u origin main
   ```
3. After the first push, open the repo on GitHub → **Actions** and confirm the **Deploy to GitHub Pages** workflow succeeds (it builds and pushes the `gh-pages` branch).
4. **Settings → Pages** → **Build and deployment** → Source: **Deploy from a branch** → Branch **`gh-pages`** → folder **`/ (root)`** → Save.

The live URL is [https://jpdm07.github.io/lune-store/](https://jpdm07.github.io/lune-store/) (Vite `base` is `/lune-store/`).

### Optional: deploy from your machine

If you prefer not to use Actions:

```bash
npm run deploy
```

That uses [gh-pages](https://github.com/tschaub/gh-pages) to publish `dist/` to the `gh-pages` branch (same Pages settings as above).

## Optional Supabase

Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. If they are missing, the app runs in **demo mode** with data in `localStorage`. Schema starter: `supabase/schema.sql`.

## License

Private portfolio project.
