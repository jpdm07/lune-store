import { Link } from 'react-router-dom'
import PageFade from '../components/PageFade'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import styles from './Cart.module.css'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, shipping, total, applyPromo, promo } = useCart()
  const [code, setCode] = useState('')
  const [promoErr, setPromoErr] = useState(false)

  if (items.length === 0) {
    return (
      <PageFade>
        <div className={styles.empty}>
          <h1 className={styles.h1}>Cart</h1>
          <p>Your cart is empty.</p>
          <Link to="/shop" className={styles.cta}>
            Start shopping
          </Link>
        </div>
      </PageFade>
    )
  }

  const tryPromo = (e) => {
    e.preventDefault()
    if (applyPromo(code)) {
      setPromoErr(false)
      setCode('')
    } else setPromoErr(true)
  }

  return (
    <PageFade>
      <div className={styles.page}>
        <h1 className={styles.h1}>Cart</h1>
        <div className={styles.layout}>
          <ul className={styles.list}>
            {items.map((line) => (
              <li key={line.slug} className={styles.row}>
                <img src={line.image} alt="" className={styles.thumb} />
                <div className={styles.meta}>
                  <Link to={`/shop/${line.slug}`} className={styles.name}>
                    {line.name}
                  </Link>
                  <p className={styles.price}>${line.price}</p>
                  <div className={styles.qty}>
                    <button type="button" onClick={() => updateQty(line.slug, line.qty - 1)}>
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button type="button" onClick={() => updateQty(line.slug, line.qty + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button type="button" className={styles.rm} onClick={() => removeItem(line.slug)} aria-label="Remove">
                  ×
                </button>
              </li>
            ))}
          </ul>
          <aside className={styles.sum}>
            <form onSubmit={tryPromo} className={styles.promo}>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Promo code"
                aria-label="Promo code"
              />
              <button type="submit">Apply</button>
            </form>
            {promo && <p className={styles.applied}>Code {promo} applied</p>}
            {promoErr && <p className={styles.err}>Invalid code</p>}
            <div className={styles.line}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.line}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className={`${styles.line} ${styles.total}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout/shipping" className={styles.checkout}>
              Proceed to checkout →
            </Link>
            <Link to="/shop" className={styles.cont}>
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </PageFade>
  )
}
