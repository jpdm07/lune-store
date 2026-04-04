import { Link } from 'react-router-dom'
import PageFade from '../components/PageFade'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <PageFade>
      <div className={styles.wrap}>
        <p className={styles.code}>404</p>
        <h1 className={styles.h1}>This page doesn&apos;t exist.</h1>
        <Link to="/" className={styles.btn}>
          Go back home
        </Link>
      </div>
    </PageFade>
  )
}
