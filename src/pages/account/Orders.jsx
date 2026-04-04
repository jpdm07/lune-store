import { Link } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'
import styles from './Account.module.css'

export default function Orders() {
  const { orders } = useOrders()

  if (orders.length === 0) {
    return (
      <div>
        <h2 className={styles.h2}>Orders</h2>
        <p className={styles.muted}>No orders yet.</p>
        <Link to="/shop" className={styles.btn}>
          Shop
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className={styles.h2}>Orders</h2>
      <ul className={styles.list}>
        {orders.map((o) => (
          <li key={o.id}>
            <Link to={`/account/orders/${encodeURIComponent(o.id)}`} className={styles.orderRow}>
              <div>
                <strong>{o.id}</strong>
                <p className={styles.muted} style={{ margin: '6px 0 0' }}>
                  {new Date(o.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={styles.badge}>{o.status}</span>
                <p style={{ margin: '8px 0 0' }}>${o.total?.toFixed(2)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
