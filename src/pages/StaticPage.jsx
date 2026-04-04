import PageFade from '../components/PageFade'
import styles from './StaticPage.module.css'

export default function StaticPage({ title, children }) {
  return (
    <PageFade>
      <article className={styles.article}>
        <h1 className={styles.h1}>{title}</h1>
        <div className={styles.body}>{children}</div>
      </article>
    </PageFade>
  )
}
