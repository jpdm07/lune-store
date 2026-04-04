import { useState } from 'react'
import { useAddresses } from '../../context/AddressesContext'
import styles from './Account.module.css'

export default function Addresses() {
  const { addresses, add, remove, setDefault } = useAddresses()
  const [form, setForm] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    isDefault: false,
  })

  const submit = (e) => {
    e.preventDefault()
    add(form)
    setForm({ street: '', city: '', state: '', zip: '', country: 'US', isDefault: false })
  }

  return (
    <div>
      <h2 className={styles.h2}>Address book</h2>
      <div className={styles.grid2}>
        {addresses.map((a) => (
          <div key={a.id} className={styles.card}>
            {a.isDefault && <span className={styles.badge}>Default</span>}
            <p>
              {a.street}
              <br />
              {a.city}, {a.state} {a.zip}
              <br />
              {a.country}
            </p>
            <button type="button" className={styles.btn} onClick={() => setDefault(a.id)}>
              Set default
            </button>
            <button type="button" className={styles.removeWish} onClick={() => remove(a.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <h3 className={styles.h2} style={{ fontSize: '1.1rem', marginTop: 32 }}>
        Add address
      </h3>
      <form className={styles.form} onSubmit={submit} style={{ maxWidth: 480 }}>
        <label>
          Street
          <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} required />
        </label>
        <label>
          City
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
        </label>
        <label>
          State
          <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
        </label>
        <label>
          ZIP
          <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} required />
        </label>
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
          />
          Set as default
        </label>
        <button type="submit" className={styles.btn}>
          Save address
        </button>
      </form>
    </div>
  )
}
