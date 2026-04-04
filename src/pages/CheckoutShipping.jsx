import { Link, useNavigate } from 'react-router-dom'
import PageFade from '../components/PageFade'
import { useCheckoutDraft } from '../context/CheckoutContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import styles from './Checkout.module.css'

const SHIPPING = [
  { id: 'standard', label: 'Standard — 5–7 business days', price: 5.99 },
  { id: 'express', label: 'Express — 2–3 business days', price: 14.99 },
  { id: 'overnight', label: 'Overnight — 1 business day', price: 24.99 },
]

export default function CheckoutShipping() {
  const { draft, setDraft } = useCheckoutDraft()
  const { items } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <PageFade>
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Link to="/shop">Shop</Link>
        </div>
      </PageFade>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    navigate('/checkout/payment')
  }

  const shipPrice =
    draft.shippingMethod === 'express'
      ? 14.99
      : draft.shippingMethod === 'overnight'
        ? 24.99
        : 5.99

  return (
    <PageFade>
      <div className={styles.page}>
        <div className={styles.steps}>
          <span className={styles.on}>1 Shipping</span>
          <span>2 Payment</span>
          <span>3 Confirm</span>
        </div>
        <h1 className={styles.h1}>Shipping</h1>
        <p className={styles.guest}>
          {user ? `Signed in as ${user.email}` : (
            <>
              Guest checkout — or <Link to="/login">sign in</Link>
            </>
          )}
        </p>
        <form className={styles.form} onSubmit={submit}>
          {!user && (
            <label>
              Email
              <input
                type="email"
                required
                value={draft.guestEmail}
                onChange={(e) => setDraft((d) => ({ ...d, guestEmail: e.target.value }))}
              />
            </label>
          )}
          <label>
            Full name
            <input
              required
              value={draft.fullName}
              onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
            />
          </label>
          <label>
            Address
            <input
              required
              value={draft.address}
              onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
            />
          </label>
          <div className={styles.row2}>
            <label>
              City
              <input required value={draft.city} onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))} />
            </label>
            <label>
              State
              <input required value={draft.state} onChange={(e) => setDraft((d) => ({ ...d, state: e.target.value }))} />
            </label>
            <label>
              ZIP
              <input required value={draft.zip} onChange={(e) => setDraft((d) => ({ ...d, zip: e.target.value }))} />
            </label>
          </div>
          <fieldset className={styles.fieldset}>
            <legend>Shipping method</legend>
            {SHIPPING.map((s) => (
              <label key={s.id} className={styles.radio}>
                <input
                  type="radio"
                  name="ship"
                  checked={draft.shippingMethod === s.id}
                  onChange={() => setDraft((d) => ({ ...d, shippingMethod: s.id }))}
                />
                {s.label} — ${s.price.toFixed(2)}
              </label>
            ))}
          </fieldset>
          {!user && (
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={draft.saveInfo}
                onChange={(e) => setDraft((d) => ({ ...d, saveInfo: e.target.checked }))}
              />
              Save my info — we&apos;ll invite you to create an account after checkout
            </label>
          )}
          <button type="submit" className={styles.btn}>
            Continue to payment →
          </button>
        </form>
        <aside className={styles.side}>
          <h2 className={styles.sideH}>Order summary</h2>
          <p className={styles.small}>{items.length} items · shipping from ${shipPrice.toFixed(2)}</p>
        </aside>
      </div>
    </PageFade>
  )
}
