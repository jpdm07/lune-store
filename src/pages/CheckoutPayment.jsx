import { useNavigate } from 'react-router-dom'
import PageFade from '../components/PageFade'
import { useCheckoutDraft } from '../context/CheckoutContext'
import { useCart } from '../context/CartContext'
import styles from './Checkout.module.css'

export default function CheckoutPayment() {
  const { draft, setDraft } = useCheckoutDraft()
  const { items, subtotal, shipping, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const submit = (e) => {
    e.preventDefault()
    navigate('/checkout/confirmation')
  }

  return (
    <PageFade>
      <div className={styles.page}>
        <div className={styles.steps}>
          <span>1 Shipping</span>
          <span className={styles.on}>2 Payment</span>
          <span>3 Confirm</span>
        </div>
        <h1 className={styles.h1}>Payment</h1>
        <div className={styles.payGrid}>
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.pills}>
              {['card', 'paypal', 'apple'].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={draft.payment === m ? styles.pillOn : styles.pill}
                  onClick={() => setDraft((d) => ({ ...d, payment: m }))}
                >
                  {m === 'card' ? 'Card' : m === 'paypal' ? 'PayPal' : 'Apple Pay'}
                </button>
              ))}
            </div>
            {draft.payment === 'card' && (
              <>
                <label>
                  Card number
                  <input placeholder="4242 4242 4242 4242" required />
                </label>
                <div className={styles.row2}>
                  <label>
                    Expiry
                    <input placeholder="MM/YY" required />
                  </label>
                  <label>
                    CVV
                    <input placeholder="123" required />
                  </label>
                </div>
              </>
            )}
            {draft.payment !== 'card' && <p className={styles.note}>You&apos;ll confirm with {draft.payment} on the next step (demo).</p>}
            <button type="submit" className={styles.btn}>
              Review order →
            </button>
          </form>
          <aside className={styles.sumBox}>
            <h2 className={styles.sideH}>Summary</h2>
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
          </aside>
        </div>
      </div>
    </PageFade>
  )
}
