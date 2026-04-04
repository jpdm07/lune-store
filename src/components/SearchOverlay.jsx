import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import LazyImg from './LazyImg'
import styles from './SearchOverlay.module.css'

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!open) {
      const id = requestAnimationFrame(() => setQ(''))
      return () => cancelAnimationFrame(id)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return []
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s),
    ).slice(0, 8)
  }, [q])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className={styles.dim} onClick={onClose} aria-label="Close search" />
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className={styles.top}>
              <input
                type="search"
                className={styles.input}
                placeholder="Search products…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus
                aria-label="Search"
              />
              <button type="button" className={styles.x} onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
            <ul className={styles.results}>
              {results.map((p) => (
                <li key={p.slug}>
                  <Link to={`/shop/${p.slug}`} className={styles.hit} onClick={onClose}>
                    <LazyImg src={p.images[0]} alt="" className={styles.th} aspect="1" photoTone />
                    <div>
                      <div className={styles.pname}>{p.name}</div>
                      <div className={styles.pprice}>${p.price}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {q && results.length === 0 && <p className={styles.none}>No matches.</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
