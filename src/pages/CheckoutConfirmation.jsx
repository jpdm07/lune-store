import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import PageFade from '../components/PageFade'
import { useCart, cartLineVariantText } from '../context/CartContext'
import { useCheckoutDraft } from '../context/CheckoutContext'
import { useOrders } from '../context/OrdersContext'
import { useAuth } from '../context/AuthContext'
import styles from './Checkout.module.css'

function randomOrderNum() {
  const a = Math.random().toString(36).slice(2, 6).toUpperCase()
  const b = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `LN-${a}-${b}`
}

export default function CheckoutConfirmation() {
  const cart = useCart()
  const { draft, reset } = useCheckoutDraft()
  const { addOrder } = useOrders()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [snap] = useState(() => {
    if (cart.items.length === 0) return null
    return {
      items: cart.items.map((x) => ({ ...x })),
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      total: cart.total,
      email: draft.guestEmail,
      fullName: draft.fullName,
      address: draft.address,
      city: draft.city,
      state: draft.state,
      zip: draft.zip,
    }
  })

  const [orderId] = useState(() => randomOrderNum())

  useEffect(() => {
    if (!snap) {
      navigate('/cart', { replace: true })
      return
    }
    addOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      items: snap.items,
      subtotal: snap.subtotal,
      shipping: snap.shipping,
      total: snap.total,
      email: user?.email || snap.email,
      address: `${snap.fullName}, ${snap.address}, ${snap.city}, ${snap.state} ${snap.zip}`,
    })
    cart.clearCart()
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-shot confirmation: snapshot cart once, record order, then clear.
  }, [])

  if (!snap) return null

  return (
    <PageFade>
      <div className={styles.confirm}>
        <motion.div
          className={styles.successMark}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          ✓
        </motion.div>
        <h1 className={styles.h1ok}>Order confirmed!</h1>
        <p className={styles.ord}>Order {orderId}</p>
        <p className={styles.thank}>Thank you. You&apos;ll receive a confirmation email shortly.</p>
        <div className={styles.summary}>
          <h2 className={styles.sideH}>Order summary</h2>
          <ul className={styles.sumList}>
            {snap.items.map((l) => {
              const v = cartLineVariantText(l)
              return (
              <li key={l.id || `${l.slug}-${l.colorId || 'natural'}`}>
                {l.name}
                {v ? ` (${v})` : ''} × {l.qty} — $
                {(l.price * l.qty).toFixed(2)}
              </li>
              )
            })}
          </ul>
          <p className={styles.totalLine}>Total paid ${snap.total.toFixed(2)}</p>
        </div>
        <Link to="/shop" className={styles.ghost}>
          Continue shopping
        </Link>
        {user && (
          <Link to="/account/orders" className={styles.link}>
            View order in account →
          </Link>
        )}
      </div>
    </PageFade>
  )
}
