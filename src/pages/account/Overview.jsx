import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrdersContext'
import styles from './Account.module.css'

export default function Overview() {
  const { user, signOut } = useAuth()
  const { orders } = useOrders()
  const recent = orders[0]

  return (
    <div>
      <h2 className={styles.h2}>Hello{user?.user_metadata?.first_name ? `, ${user.user_metadata.first_name}` : ''}</h2>
      <p className={styles.muted}>Manage orders, returns, and saved pieces.</p>
      {recent && (
        <div className={styles.card}>
          <h3 className={styles.h2} style={{ fontSize: '1.1rem' }}>
            Recent order
          </h3>
          <p className={styles.muted}>
            {recent.id} · {new Date(recent.createdAt).toLocaleDateString()} · ${recent.total?.toFixed(2)}
          </p>
          <Link to={`/account/orders/${encodeURIComponent(recent.id)}`} className={styles.btn}>
            View order
          </Link>
        </div>
      )}
      <div className={styles.card}>
        <Link to="/account/orders">My orders →</Link>
        <br />
        <Link to="/account/wishlist">Wishlist →</Link>
        <br />
        <button type="button" className={styles.btn} style={{ marginTop: 16 }} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </div>
  )
}
