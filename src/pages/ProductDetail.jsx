import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageFade from '../components/PageFade'
import LazyImg from '../components/LazyImg'
import ProductCard from '../components/ProductCard'
import { getProductBySlug, getRelated } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const p = getProductBySlug(slug)
  const [imgI, setImgI] = useState(0)
  const [qty, setQty] = useState(1)
  const [open, setOpen] = useState({ d: true, m: false, s: false })
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const { toast } = useToast()

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

  const add = () => {
    for (let i = 0; i < qty; i++) addItem(p, 1)
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
            <div className={styles.thumbs}>
              {p.images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === imgI ? styles.thOn : styles.th}
                  onClick={() => setImgI(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className={styles.name}>{p.name}</h1>
            <p className={styles.price}>${p.price}</p>
            <p className={styles.desc}>{p.description}</p>
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

            <div className={styles.reviews}>
              <h2 className={styles.revH}>Reviews</h2>
              <p className={styles.stars}>★★★★★</p>
              <p className={styles.revT}>4.9 average · 127 reviews</p>
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
