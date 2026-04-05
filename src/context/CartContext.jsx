import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products'

const CartContext = createContext(null)
const STORAGE = 'lune_cart_v2'

const PROMOS = { LUNE10: 0.1, WELCOME15: 0.15 }

export function cartLineId(slug, colorId = 'natural') {
  return `${slug}::${colorId}`
}

function normalizeLine(raw) {
  const p = PRODUCTS.find((x) => x.slug === raw.slug)
  if (!p) return null
  const colorId = raw.colorId || 'natural'
  const col = p.colors?.find((c) => c.id === colorId)
  return {
    id: cartLineId(raw.slug, colorId),
    slug: p.slug,
    colorId,
    colorLabel: col?.label || raw.colorLabel || 'Natural',
    name: p.name,
    price: p.price,
    image: p.images?.[0] || '',
    qty: Math.max(1, Number(raw.qty) || 1),
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE)
    const parsed = raw ? JSON.parse(raw) : { items: [], promo: '' }
    const items = (parsed.items || []).map(normalizeLine).filter(Boolean)
    return { items, promo: parsed.promo || '' }
  } catch {
    return { items: [], promo: '' }
  }
}

export function CartProvider({ children }) {
  const initial = load()
  const [items, setItems] = useState(initial.items)
  const [promo, setPromo] = useState(initial.promo)

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ items, promo }))
  }, [items, promo])

  const addItem = (product, qty = 1, opts = {}) => {
    const colorId = opts.colorId || 'natural'
    const col = product.colors?.find((c) => c.id === colorId)
    const colorLabel = col?.label || 'Natural'
    const id = cartLineId(product.slug, colorId)
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === id)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + qty }
        return next
      }
      return [
        ...prev,
        {
          id,
          slug: product.slug,
          colorId,
          colorLabel,
          name: product.name,
          price: product.price,
          image: product.images[0],
          qty,
        },
      ]
    })
  }

  const removeItem = (lineId) => setItems((prev) => prev.filter((x) => x.id !== lineId))
  const updateQty = (lineId, qty) => {
    if (qty < 1) return removeItem(lineId)
    setItems((prev) => prev.map((x) => (x.id === lineId ? { ...x, qty } : x)))
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
