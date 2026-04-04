import { Link, useParams } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'
import styles from './Account.module.css'

export default function OrderDetail() {
  const { id } = useParams()
  const { getById } = useOrders()
  const o = getById(id)

  if (!o) {
    return (
      <div>
        <h2 className={styles.h2}>Order</h2>
        <p className={styles.muted}>Order not found.</p>
        <Link to="/account/orders">Back to orders</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/account/orders" className={styles.muted}>
        ← Orders
      </Link>
      <h2 className={styles.h2}>{o.id}</h2>
      <p className={styles.muted}>{new Date(o.createdAt).toLocaleString()}</p>
      <div className={styles.card}>
        <p className={styles.badge}>{o.status}</p>
        <p className={styles.muted} style={{ marginTop: 16 }}>
          Timeline: Order placed → Processing → Shipped → Delivered (demo)
        </p>
        <ul className={styles.list} style={{ marginTop: 20 }}>
          {o.items?.map((l) => (
            <li key={l.slug} className={styles.orderRow} style={{ cursor: 'default' }}>
              <span>
                {l.name} × {l.qty}
              </span>
              <span>${(l.price * l.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p>
          <strong>Shipping to</strong>
          <br />
          {o.address}
        </p>
        <p>
          <strong>Payment</strong> Card ending 4242 (demo)
        </p>
        <p>
          <strong>Total</strong> ${o.total?.toFixed(2)}
        </p>
        <Link to="/account/returns" className={styles.btn}>
          Request return
        </Link>
      </div>
    </div>
  )
}
