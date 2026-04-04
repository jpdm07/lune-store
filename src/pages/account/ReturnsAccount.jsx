import { useState } from 'react'
import { useReturns } from '../../context/ReturnsContext'
import { useOrders } from '../../context/OrdersContext'
import { useToast } from '../../context/ToastContext'
import styles from './Account.module.css'

export default function ReturnsAccount() {
  const { returns, submitReturn } = useReturns()
  const { orders } = useOrders()
  const { toast } = useToast()
  const [orderId, setOrderId] = useState('')
  const [reason, setReason] = useState('Changed mind')
  const [note, setNote] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!orderId) return
    submitReturn({ orderId, reason, note })
    toast('Return submitted — check email for instructions')
    setOrderId('')
    setNote('')
  }

  return (
    <div>
      <h2 className={styles.h2}>Returns</h2>
      <p className={styles.muted}>30-day window on eligible items. Final sale excluded.</p>

      <div className={styles.card}>
        <h3 className={styles.h2} style={{ fontSize: '1rem' }}>
          Start a return
        </h3>
        <form className={styles.form} onSubmit={submit}>
          <label>
            Order
            <select value={orderId} onChange={(e) => setOrderId(e.target.value)} required>
              <option value="">Select order</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} — {new Date(o.createdAt).toLocaleDateString()}
                </option>
              ))}
            </select>
          </label>
          <label>
            Reason
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              <option>Wrong item</option>
              <option>Damaged</option>
              <option>Changed mind</option>
              <option>Doesn&apos;t match description</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Notes (optional)
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
          </label>
          <label>
            Photo (optional)
            <input type="file" accept="image/*" />
          </label>
          <button type="submit" className={styles.btn}>
            Submit return
          </button>
        </form>
      </div>

      <h3 className={styles.h2} style={{ fontSize: '1.1rem', marginTop: 40 }}>
        Your returns
      </h3>
      {returns.length === 0 ? (
        <p className={styles.muted}>No return requests yet.</p>
      ) : (
        <ul className={styles.list}>
          {returns.map((r) => (
            <li key={r.id} className={styles.card}>
              <strong>{r.id}</strong> — {r.status}
              <p className={styles.muted}>{new Date(r.createdAt).toLocaleString()}</p>
              <p className={styles.muted}>
                Order {r.orderId} · {r.reason}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
