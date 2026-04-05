import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import styles from './CartDrawer.module.css'

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, subtotal, shipping, total } = useCart()
  const navigate = useNavigate()

  const checkout = () => {
    onClose()
    navigate('/checkout/shipping')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close cart"
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32 }}
          >
            <div className={styles.head}>
              <h2 className={styles.title}>Cart</h2>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
            {items.length === 0 ? (
              <p className={styles.empty}>Your cart is empty.</p>
            ) : (
              <ul className={styles.list}>
                {items.map((line) => (
                  <li key={line.id} className={styles.row}>
                    <Link
                      to={`/shop/${line.slug}`}
                      className={styles.thumbLink}
                      onClick={onClose}
                      aria-label={`View ${line.name}`}
                    >
                      <img src={line.image} alt="" className={styles.thumb} />
                    </Link>
                    <div className={styles.meta}>
                      <Link to={`/shop/${line.slug}`} className={styles.lineName} onClick={onClose}>
                        {line.name}
                      </Link>
                      {line.colorLabel && line.colorLabel !== 'Natural' && (
                        <span className={styles.variant}>{line.colorLabel}</span>
                      )}
                      <span className={styles.linePrice}>${line.price}</span>
                      <div className={styles.qty}>
                        <button type="button" onClick={() => updateQty(line.id, line.qty - 1)}>
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button type="button" onClick={() => updateQty(line.id, line.qty + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(line.id)}
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {items.length > 0 && (
              <div className={styles.summary}>
                <div className={styles.row2}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.row2}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className={`${styles.row2} ${styles.total}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button type="button" className={styles.cta} onClick={checkout}>
                  Proceed to checkout →
                </button>
                <Link to="/cart" className={styles.full} onClick={onClose}>
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
