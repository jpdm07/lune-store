import { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useMinWidth } from '../hooks/useMedia'
import styles from './Header.module.css'

export default function Header({ onOpenSearch, onOpenCart }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openAcct, setOpenAcct] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const acctRef = useRef(null)
  const { user, signOut } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const isDesktop = useMinWidth(900)

  const count = items.reduce((n, x) => n + x.qty, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDoc = (e) => {
      if (acctRef.current && !acctRef.current.contains(e.target)) setOpenAcct(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const cartClick = () => {
    if (isDesktop) onOpenCart()
    else navigate('/cart')
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.burger}
          aria-label="Open menu"
          onClick={() => setOpenMenu(true)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className={styles.brand}>
          LUNE
        </Link>

        <nav className={`${styles.nav} ${openMenu ? styles.navOpen : ''}`}>
          <button type="button" className={styles.navClose} onClick={() => setOpenMenu(false)} aria-label="Close menu">
            ×
          </button>
          <NavLink to="/shop" onClick={() => setOpenMenu(false)} className={({ isActive }) => (isActive ? styles.active : '')}>
            Shop
          </NavLink>
          <NavLink to="/collections" onClick={() => setOpenMenu(false)}>
            Collections
          </NavLink>
          <NavLink to="/reviews" onClick={() => setOpenMenu(false)}>
            Reviews
          </NavLink>
          <NavLink to="/about" onClick={() => setOpenMenu(false)}>
            About
          </NavLink>
          <NavLink to="/faq" onClick={() => setOpenMenu(false)}>
            FAQ
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpenMenu(false)}>
            Contact
          </NavLink>
        </nav>

        <div className={styles.icons}>
          <button type="button" className={styles.iconBtn} aria-label="Search" onClick={onOpenSearch}>
            ⌕
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Cart" onClick={cartClick}>
            <span className={styles.cartIc}>▢</span>
            {count > 0 && <span className={styles.badge}>{count > 99 ? '99+' : count}</span>}
          </button>
          <div className={styles.acctWrap} ref={acctRef}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Account"
              aria-expanded={openAcct}
              onClick={() => setOpenAcct((o) => !o)}
            >
              ◎
            </button>
            {openAcct && (
              <div className={styles.dropdown}>
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setOpenAcct(false)}>
                      Dashboard
                    </Link>
                    <Link to="/account/orders" onClick={() => setOpenAcct(false)}>
                      Orders
                    </Link>
                    <Link to="/account/wishlist" onClick={() => setOpenAcct(false)}>
                      Wishlist
                    </Link>
                    <button
                      type="button"
                      className={styles.signOut}
                      onClick={() => {
                        signOut()
                        setOpenAcct(false)
                        navigate('/')
                      }}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setOpenAcct(false)}>
                    Sign in
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {openMenu && <button type="button" className={styles.scrim} aria-label="Close menu" onClick={() => setOpenMenu(false)} />}
    </header>
  )
}
