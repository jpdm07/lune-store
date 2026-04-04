import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AnnouncementBanner.module.css'

const KEY = 'lune_announce_dismissed'
const MESSAGES = [
  'Free shipping on orders over $75 — Shop now',
  'New collection: slow-living essentials',
  'Made to last. Designed to feel right.',
]

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(KEY) === '1')
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (dismissed) return
    const t = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 8000)
    return () => clearInterval(t)
  }, [dismissed])

  if (dismissed) return null

  const close = () => {
    localStorage.setItem(KEY, '1')
    setDismissed(true)
  }

  return (
    <div className={styles.bar}>
      <Link to="/shop" className={styles.msg}>
        {MESSAGES[idx]}
      </Link>
      <button type="button" className={styles.x} onClick={close} aria-label="Dismiss announcement">
        ×
      </button>
    </div>
  )
}
