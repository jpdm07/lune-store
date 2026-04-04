import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageFade from '../components/PageFade'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const { resetPassword } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await resetPassword(email)
      setSent(true)
    } catch (er) {
      setErr(er.message || 'Could not send reset')
    }
  }

  return (
    <PageFade>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.h1}>Reset password</h1>
          {sent ? (
            <p className={styles.ok}>If an account exists for that email, you&apos;ll receive a link shortly.</p>
          ) : (
            <form onSubmit={submit} className={styles.form}>
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              {err && <p className={styles.err}>{err}</p>}
              <button type="submit" className={styles.btn}>
                Send reset link
              </button>
            </form>
          )}
          <p className={styles.muted}>
            <Link to="/login">Back to sign in</Link>
          </p>
        </div>
      </div>
    </PageFade>
  )
}
