import { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext(null)
const STORAGE = 'lune_wishlist_v1'

export function WishlistProvider({ children }) {
  const [slugs, setSlugs] = useState(() => {
    try {
      const r = localStorage.getItem(STORAGE)
      return r ? JSON.parse(r) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(slugs))
  }, [slugs])

  const toggle = (slug) => {
    setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))
  }

  const has = (slug) => slugs.includes(slug)
  const remove = (slug) => setSlugs((s) => s.filter((x) => x !== slug))

  return (
    <WishlistContext.Provider value={{ slugs, toggle, has, remove }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist needs WishlistProvider')
  return ctx
}
