import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PageFade from '../components/PageFade'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/account'

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (er) {
      setErr(er.message || 'Sign in failed')
    }
  }

  return (
    <PageFade>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.h1}>Sign in</h1>
          <form onSubmit={submit} className={styles.form}>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="current-password"
              />
            </label>
            {err && <p className={styles.err}>{err}</p>}
            <button type="submit" className={styles.btn}>
              Sign in
            </button>
          </form>
          <Link to="/forgot-password" className={styles.link}>
            Forgot password?
          </Link>
          <p className={styles.muted}>
            <Link to="/checkout/shipping">Continue as guest</Link>
          </p>
          <p className={styles.muted}>
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
          <button type="button" className={styles.social} disabled>
            Google (connect Supabase to enable)
          </button>
        </div>
      </div>
    </PageFade>
  )
}
