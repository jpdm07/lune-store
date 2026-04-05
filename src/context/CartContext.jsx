import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, getPrimaryImageIndex } from '../data/products'

const CartContext = createContext(null)
const STORAGE = 'lune_cart_v2'

const PROMOS = { LUNE10: 0.1, WELCOME15: 0.15 }

export function cartLineId(slug, colorId = 'natural', styleId) {
  if (styleId != null && String(styleId).length > 0) return `${slug}::${colorId}::${styleId}`
  return `${slug}::${colorId}`
}

function normalizeLine(raw) {
  const p = PRODUCTS.find((x) => x.slug === raw.slug)
  if (!p) return null
  let colorId = raw.colorId || 'natural'
  if (p.colors?.length && !p.colors.some((c) => c.id === colorId)) {
    colorId = p.colors[0].id
  }
  const col = p.colors?.find((c) => c.id === colorId)
  const styleIdResolved =
    raw.styleId != null && raw.styleId !== ''
      ? raw.styleId
      : p.styles?.length
        ? p.styles[0].id
        : undefined
  const st = p.styles?.find((s) => s.id === styleIdResolved)
  const imgIdx = getPrimaryImageIndex(p, colorId, styleIdResolved)
  const image = p.images?.[imgIdx] || p.images?.[0] || ''
  return {
    id: cartLineId(p.slug, colorId, st ? styleIdResolved : undefined),
    slug: p.slug,
    colorId,
    colorLabel: col?.label || raw.colorLabel || 'Natural',
    styleId: st ? styleIdResolved : undefined,
    styleLabel: st?.label || raw.styleLabel || '',
    name: p.name,
    price: p.price,
    image,
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
    let colorId = opts.colorId || 'natural'
    if (product.colors?.length && !product.colors.some((c) => c.id === colorId)) {
      colorId = product.colors[0].id
    }
    const col = product.colors?.find((c) => c.id === colorId)
    const colorLabel = col?.label || 'Natural'
    const styleIdResolved =
      opts.styleId != null && opts.styleId !== ''
        ? opts.styleId
        : product.styles?.length
          ? product.styles[0].id
          : undefined
    const st = product.styles?.find((s) => s.id === styleIdResolved)
    const imgIdx = getPrimaryImageIndex(product, colorId, styleIdResolved)
    const image = product.images?.[imgIdx] || product.images?.[0] || ''
    const id = cartLineId(product.slug, colorId, st ? styleIdResolved : undefined)
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
          styleId: st ? styleIdResolved : undefined,
          styleLabel: st?.label || '',
          name: product.name,
          price: product.price,
          image,
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

/** Color + style summary for cart and order lines (hides lone “Natural”). */
export function cartLineVariantText(line) {
  const parts = []
  if (line.styleLabel) parts.push(line.styleLabel)
  if (line.colorLabel && line.colorId !== 'natural') parts.push(line.colorLabel)
  return parts.join(' · ')
}

export function findProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}
