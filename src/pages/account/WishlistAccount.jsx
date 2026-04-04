import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'
import { useToast } from '../../context/ToastContext'
import ProductCard from '../../components/ProductCard'
import styles from './Account.module.css'

export default function WishlistAccount() {
  const { slugs, remove } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()
  const products = PRODUCTS.filter((p) => slugs.includes(p.slug))

  if (products.length === 0) {
    return (
      <div>
        <h2 className={styles.h2}>Wishlist</h2>
        <p className={styles.muted}>No saved items yet — start browsing.</p>
        <Link to="/shop" className={styles.btn}>
          Shop
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className={styles.h2}>Wishlist</h2>
      <div className={styles.grid2}>
        {products.map((p) => (
          <div key={p.slug} style={{ position: 'relative' }}>
            <ProductCard
              product={p}
              onAdd={(pr) => {
                addItem(pr, 1)
                toast('Added to cart')
              }}
            />
            <button type="button" className={styles.removeWish} onClick={() => remove(p.slug)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
