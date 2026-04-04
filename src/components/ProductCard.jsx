import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LazyImg from './LazyImg'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/shop/${product.slug}`} className={styles.imgLink}>
        <div className={styles.imgWrap}>
          <LazyImg src={product.images[0]} alt="" className={styles.lazy} aspect="4/5" photoTone />
          <LazyImg
            src={product.images[1] || product.images[0]}
            alt=""
            className={`${styles.lazy} ${styles.hoverImg}`}
            aspect="4/5"
            photoTone
          />
        </div>
      </Link>
      <div className={styles.body}>
        <Link to={`/shop/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.price}>${product.price}</p>
        <button type="button" className={styles.add} onClick={() => onAdd?.(product)}>
          Add to cart
        </button>
      </div>
    </motion.article>
  )
}
