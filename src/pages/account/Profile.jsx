import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './Account.module.css'

export default function Profile() {
  const { user } = useAuth()
  const [fn, setFn] = useState(user?.user_metadata?.first_name || '')
  const [ln, setLn] = useState(user?.user_metadata?.last_name || '')
  const [phone, setPhone] = useState('')
  const [ok, setOk] = useState(false)

  const save = (e) => {
    e.preventDefault()
    setOk(true)
    setTimeout(() => setOk(false), 3000)
  }

  return (
    <div>
      <h2 className={styles.h2}>Profile</h2>
      {ok && <p className={styles.muted} style={{ color: 'var(--color-success)' }}>Saved.</p>}
      <form className={styles.form} onSubmit={save} style={{ maxWidth: 480 }}>
        <label>
          First name
          <input value={fn} onChange={(e) => setFn(e.target.value)} />
        </label>
        <label>
          Last name
          <input value={ln} onChange={(e) => setLn(e.target.value)} />
        </label>
        <label>
          Email
          <input type="email" value={user?.email || ''} disabled />
        </label>
        <label>
          Phone
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Profile photo (optional)
          <input type="file" accept="image/*" />
        </label>
        <button type="submit" className={styles.btn}>
          Save changes
        </button>
      </form>
    </div>
  )
}
