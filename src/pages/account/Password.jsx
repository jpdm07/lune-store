import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './Account.module.css'

export default function Password() {
  const { updatePassword } = useAuth()
  const [cur, setCur] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setMsg('')
    if (next !== confirm) {
      setErr('New passwords do not match')
      return
    }
    if (next.length < 8 || !/\d/.test(next)) {
      setErr('Use 8+ characters and a number')
      return
    }
    try {
      await updatePassword(next)
      setMsg('Password updated.')
      setCur('')
      setNext('')
      setConfirm('')
    } catch (er) {
      setErr(er.message || 'Could not update')
    }
  }

  const strength = next.length >= 8 && /\d/.test(next) && /[A-Za-z]/.test(next)

  return (
    <div>
      <h2 className={styles.h2}>Change password</h2>
      <form className={styles.form} onSubmit={submit} style={{ maxWidth: 480 }}>
        <label>
          Current password
          <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} />
        </label>
        <label>
          New password
          <input type="password" value={next} onChange={(e) => setNext(e.target.value)} />
        </label>
        <p className={styles.muted} style={{ margin: '-4px 0 8px' }}>
          {strength ? 'Looks good' : 'Use letters, numbers, 8+ characters'}
        </p>
        <label>
          Confirm new password
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </label>
        {err && <p className={styles.err}>{err}</p>}
        {msg && <p style={{ color: 'var(--color-success)' }}>{msg}</p>}
        <button type="submit" className={styles.btn}>
          Update password
        </button>
      </form>
    </div>
  )
}
