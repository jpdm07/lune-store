import { Link } from 'react-router-dom'
import PageFade from '../components/PageFade'
import LazyImg from '../components/LazyImg'
import { COLLECTIONS } from '../data/products'
import styles from './Collections.module.css'

export default function Collections() {
  return (
    <PageFade>
      <div className={styles.page}>
        <h1 className={styles.title}>Collections</h1>
        <p className={styles.sub}>Everything you need. Nothing you don&apos;t.</p>
        <div className={styles.grid}>
          {COLLECTIONS.map((c) => (
            <Link key={c.slug} to={`/shop?category=${encodeURIComponent(c.filter)}`} className={styles.card}>
              <LazyImg src={c.image} alt="" className={styles.img} aspect="4/3" />
              <div className={styles.cap}>
                <h2 className={styles.name}>{c.title}</h2>
                <span className={styles.cta}>Shop →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageFade>
  )
}
