import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products'

const CartContext = createContext(null)
const STORAGE = 'lune_cart_v1'

const PROMOS = { LUNE10: 0.1, WELCOME15: 0.15 }

function load() {
  try {
    const raw = localStorage.getItem(STORAGE)
    return raw ? JSON.parse(raw) : { items: [], promo: '' }
  } catch {
    return { items: [], promo: '' }
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load().items)
  const [promo, setPromo] = useState(() => load().promo)

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ items, promo }))
  }, [items, promo])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === product.slug)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + qty }
        return next
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          qty,
        },
      ]
    })
  }

  const removeItem = (slug) => setItems((prev) => prev.filter((x) => x.slug !== slug))
  const updateQty = (slug, qty) => {
    if (qty < 1) return removeItem(slug)
    setItems((prev) => prev.map((x) => (x.slug === slug ? { ...x, qty } : x)))
  }

  const clearCart = () => {
    setItems([])
    setPromo('')
  }

  const subtotal = useMemo(
    () => items.reduce((s, x) => s + x.price * x.qty, 0),
    [items],
  )

  const discountRate = PROMOS[promo.trim().toUpperCase()] || 0
  const afterDiscount = subtotal * (1 - discountRate)
  const shipping = afterDiscount >= 75 || afterDiscount === 0 ? 0 : 5.99
  const total = afterDiscount + shipping

  const applyPromo = (code) => {
    const c = code.trim().toUpperCase()
    if (PROMOS[c]) {
      setPromo(c)
      return true
    }
    return false
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        subtotal,
        shipping,
        total,
        promo,
        applyPromo,
        setPromo,
        discountRate,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart needs CartProvider')
  return ctx
}

export function findProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}
