import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageFade from '../components/PageFade'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [err, setErr] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const strong = password.length >= 8 && /\d/.test(password)

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    if (password !== confirm) {
      setErr('Passwords do not match')
      return
    }
    if (!strong) {
      setErr('Password needs 8+ characters and a number')
      return
    }
    if (!agree) {
      setErr('Please agree to the terms')
      return
    }
    try {
      await signUp(email, password, firstName, lastName)
      navigate('/account')
    } catch (er) {
      setErr(er.message || 'Could not create account')
    }
  }

  return (
    <PageFade>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.h1}>Create account</h1>
          <form onSubmit={submit} className={styles.form}>
            <div className={styles.row2}>
              <label>
                First name
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </label>
              <label>
                Last name
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </label>
            </div>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <p className={styles.hint}>{strong ? 'Strong enough' : 'Min 8 characters, include a number'}</p>
            <label>
              Confirm password
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />I agree to the{' '}
              <Link to="/terms">Terms</Link>
            </label>
            {err && <p className={styles.err}>{err}</p>}
            <button type="submit" className={styles.btn}>
              Create account
            </button>
          </form>
          <p className={styles.muted}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </PageFade>
  )
}
