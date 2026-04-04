import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <div className={styles.logo}>LUNE</div>
          <p className={styles.tag}>Everyday objects, made beautifully.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="Pinterest">
              PI
            </a>
          </div>
          <form
            className={styles.news}
            onSubmit={(e) => {
              e.preventDefault()
              setEmail('')
            }}
          >
            <label className={styles.nl}>
              <span className={styles.sr}>Newsletter</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className={styles.col}>
          <h3 className={styles.h}>Shop</h3>
          <Link to="/shop">All Products</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/shop?sort=newest">New Arrivals</Link>
          <Link to="/shop?tag=bestseller">Bestsellers</Link>
        </div>
        <div className={styles.col}>
          <h3 className={styles.h}>Help</h3>
          <Link to="/faq">FAQ</Link>
          <Link to="/reviews">Customer Reviews</Link>
          <Link to="/shipping">Shipping Policy</Link>
          <Link to="/returns">Return Policy</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} LUNE. All rights reserved.</span>
        <div className={styles.pay} aria-hidden>
          Visa · Mastercard · Amex · PayPal · Apple Pay
        </div>
      </div>
    </footer>
  )
}
