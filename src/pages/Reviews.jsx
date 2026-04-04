import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageFade from '../components/PageFade'
import { REVIEWS, formatReviewDate } from '../data/reviews'
import { getProductBySlug } from '../data/products'
import styles from './Reviews.module.css'

function Stars({ n }) {
  const full = '★'.repeat(n)
  const empty = '☆'.repeat(5 - n)
  return (
    <span className={styles.stars} aria-label={`${n} out of 5 stars`}>
      {full}
      {empty}
    </span>
  )
}

export default function Reviews() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [hash])

  return (
    <PageFade>
      <div className={styles.page}>
        <h1 className={styles.h1}>Customer reviews</h1>
        <p className={styles.lead}>
          Verified purchases from LUNE shoppers. Select a review to see the product it belongs to, or{' '}
          <Link to="/shop">continue shopping</Link>.
        </p>
        <p className={styles.meta}>
          {REVIEWS.length} reviews across the catalog · All ratings from verified orders (demo data for this concept
          store)
        </p>

        <ul className={styles.list}>
          {REVIEWS.map((r) => {
            const product = getProductBySlug(r.slug)
            return (
              <li key={r.id} id={r.id} className={styles.item}>
                <article className={styles.card}>
                  <div className={styles.cardTop}>
                    <Stars n={r.rating} />
                    {r.verified && <span className={styles.badge}>Verified purchase</span>}
                  </div>
                  <h2 className={styles.title}>{r.title}</h2>
                  <p className={styles.body}>{r.body}</p>
                  <footer className={styles.footer}>
                    <span className={styles.who}>
                      {r.author} · {r.location} · {formatReviewDate(r.date)}
                    </span>
                    {product && (
                      <Link to={`/shop/${r.slug}`} className={styles.productLink}>
                        Purchased: {product.name} →
                      </Link>
                    )}
                  </footer>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </PageFade>
  )
}
