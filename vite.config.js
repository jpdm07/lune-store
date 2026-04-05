import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages needs `/lune-store/`; local dev uses `/` so http://localhost:5173/ works. */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/lune-store/' : '/',
}))
