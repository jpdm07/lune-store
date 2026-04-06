import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageFade from '../components/PageFade'
import LazyImg from '../components/LazyImg'
import ProductCard from '../components/ProductCard'
import {
  getProductBySlug,
  getRelated,
  getPrimaryImageIndex,
  getColorIdForImageIndex,
} from '../data/products'
import { getReviewsByProductSlug, getReviewStatsForProduct, formatReviewDate } from '../data/reviews'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const p = getProductBySlug(slug)
  const [imgI, setImgI] = useState(0)
  const [qty, setQty] = useState(1)
  const [colorId, setColorId] = useState('natural')
  const [styleId, setStyleId] = useState(null)
  const [open, setOpen] = useState({ d: true, m: false, s: false })
  /** When true, main image follows thumbnail clicks even if no `colorToImage` entry (until swatch/style changes). */
  const imageLockedByThumb = useRef(false)
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const { toast } = useToast()

  useEffect(() => {
    const prod = getProductBySlug(slug)
    setQty(1)
    if (!prod) return
    const c0 = prod.colors?.[0]?.id ?? 'natural'
    const s0 = prod.styles?.[0]?.id ?? null
    imageLockedByThumb.current = false
    setColorId(c0)
    setStyleId(s0)
    setImgI(getPrimaryImageIndex(prod, c0, s0))
  }, [slug])

  useEffect(() => {
    const prod = getProductBySlug(slug)
    if (!prod) return
    if (!imageLockedByThumb.current) {
      setImgI(getPrimaryImageIndex(prod, colorId, styleId))
    }
  }, [slug, colorId, styleId])

  if (!p) {
    return (
      <PageFade>
        <div className={styles.miss}>
          <h1>Product not found</h1>
          <Link to="/shop">Back to shop</Link>
        </div>
      </PageFade>
    )
  }

  const related = getRelated(slug, 4)
  const productReviews = getReviewsByProductSlug(p.slug)
  const { avg, count } = getReviewStatsForProduct(p.slug)
  const selectedStyleId = p.styles?.length ? styleId ?? p.styles[0].id : null

  const add = () => {
    const sid = p.styles?.length ? selectedStyleId : undefined
    for (let i = 0; i < qty; i++)
      addItem(p, 1, { colorId: p.colors ? colorId : 'natural', styleId: sid })
    toast('Added to cart')
  }

  const wish = () => {
    toggle(p.slug)
    toast(has(p.slug) ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  return (
    <PageFade>
      <div className={styles.page}>
        <div className={styles.grid}>
          <div>
            <LazyImg src={p.images[imgI]} alt="" className={styles.mainImg} aspect="4/5" photoTone />
            {p.images.length > 1 && (
              <div className={styles.thumbs}>
                {p.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === imgI ? styles.thOn : styles.th}
                    onClick={() => {
                      setImgI(i)
                      let matchedVariant = false
                      if (p.styles?.length) {
                        const st = p.styles.find((s) => s.imageIndex === i)
                        if (st) {
                          imageLockedByThumb.current = false
                          setStyleId(st.id)
                          matchedVariant = true
                        }
                      }
                      const mappedColor = getColorIdForImageIndex(p, i)
                      if (mappedColor != null) {
                        imageLockedByThumb.current = false
                        setColorId(mappedColor)
                        matchedVariant = true
                      }
                      if (!matchedVariant) {
                        imageLockedByThumb.current = true
                      }
                    }}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className={styles.name}>{p.name}</h1>
            <p className={styles.price}>${p.price}</p>
            <p className={styles.desc}>{p.description}</p>
            {p.stock != null && (
              <p className={p.stock > 0 ? styles.stock : styles.stockOut}>
                {p.stock > 0
                  ? p.stock <= 10
                    ? `In stock — only ${p.stock} left`
                    : 'In stock'
                  : 'Currently out of stock'}
              </p>
            )}
            {Array.isArray(p.specs) && p.specs.length > 0 && (
              <dl className={styles.specs} aria-label="Product details">
                {p.specs.map((row) => (
                  <div key={row.label} className={styles.specRow}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {p.styles && p.styles.length > 0 && (
              <div className={styles.styleBlock}>
                <span className={styles.colorLabel}>Style</span>
                <div className={styles.styleChips} role="listbox" aria-label="Style">
                  {p.styles.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      role="option"
                      aria-selected={selectedStyleId === s.id}
                      className={selectedStyleId === s.id ? styles.styleChipOn : styles.styleChip}
                      onClick={() => {
                        imageLockedByThumb.current = false
                        setStyleId(s.id)
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {p.colors && p.colors.length > 0 && (
              <div className={styles.colorBlock}>
                <span className={styles.colorLabel}>Color</span>
                <div className={styles.colorSwatches} role="listbox" aria-label="Color">
                  {p.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      role="option"
                      aria-selected={colorId === c.id}
                      title={c.label}
                      aria-label={c.label}
                      className={colorId === c.id ? styles.colorSwatchOn : styles.colorSwatch}
                      onClick={() => {
                        imageLockedByThumb.current = false
                        setColorId(c.id)
                      }}
                    >
                      <span
                        className={styles.swatchFill}
                        style={
                          c.hex2
                            ? {
                                background: `linear-gradient(90deg, ${c.hex ?? '#d6d3d1'} 50%, ${c.hex2} 50%)`,
                              }
                            : { backgroundColor: c.hex ?? '#d6d3d1' }
                        }
                      />
                    </button>
                  ))}
                </div>
                <span className={styles.colorPicked} aria-live="polite">
                  {p.colors.find((c) => c.id === colorId)?.label}
                </span>
              </div>
            )}
            <div className={styles.qty}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <button type="button" className={styles.add} onClick={add}>
              Add to cart
            </button>
            <button type="button" className={styles.wish} onClick={wish}>
              {has(p.slug) ? 'Remove from wishlist' : 'Add to wishlist'}
            </button>

            <div className={styles.acc}>
              <button type="button" className={styles.accBtn} onClick={() => setOpen((o) => ({ ...o, d: !o.d }))}>
                Description {open.d ? '−' : '+'}
              </button>
              {open.d && <p className={styles.accBody}>{p.description}</p>}
              <button type="button" className={styles.accBtn} onClick={() => setOpen((o) => ({ ...o, m: !o.m }))}>
                Materials & care {open.m ? '−' : '+'}
              </button>
              {open.m && <p className={styles.accBody}>{p.materials}</p>}
              <button type="button" className={styles.accBtn} onClick={() => setOpen((o) => ({ ...o, s: !o.s }))}>
                Shipping & returns {open.s ? '−' : '+'}
              </button>
              {open.s && (
                <p className={styles.accBody}>
                  Standard 5–7 business days. Free over $75. 30-day returns on unused items in original packaging.
                  See <Link to="/shipping">shipping</Link> and <Link to="/returns">returns</Link>.
                </p>
              )}
            </div>

            <div className={styles.reviews} id="reviews">
              <h2 className={styles.revH}>Reviews</h2>
              {avg != null && count > 0 && (
                <>
                  <p className={styles.stars} aria-hidden="true">
                    ★★★★★
                  </p>
                  <p className={styles.revT}>
                    {avg} average · {count} verified {count === 1 ? 'review' : 'reviews'}
                  </p>
                </>
              )}
              {productReviews.length > 0 && (
                <>
                  <ul className={styles.revList}>
                    {productReviews.map((r) => (
                      <li key={r.id} className={styles.revLi}>
                        <Link to={`/reviews#${r.id}`} className={styles.revCard}>
                          <span className={styles.revCardStars} aria-hidden="true">
                            {'★'.repeat(r.rating)}
                            {'☆'.repeat(5 - r.rating)}
                          </span>
                          <span className={styles.revCardTitle}>{r.title}</span>
                          <span className={styles.revCardExcerpt}>{r.body}</span>
                          <span className={styles.revCardMeta}>
                            {r.author} · {formatReviewDate(r.date)}
                            {r.verified ? ' · Verified purchase' : ''}
                          </span>
                          <span className={styles.revCardHint}>Read full review →</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/reviews" className={styles.revAll}>
                    See all customer reviews →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <section className={styles.more}>
          <h2 className={styles.moreH}>You may also like</h2>
          <div className={styles.moreG}>
            {related.map((x) => (
              <ProductCard
                key={x.slug}
                product={x}
                onAdd={(pr) => {
                  addItem(pr, 1)
                  toast('Added to cart')
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </PageFade>
  )
}
