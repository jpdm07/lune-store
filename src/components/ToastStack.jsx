import { useToast } from '../context/ToastContext'
import styles from './ToastStack.module.css'

export default function ToastStack() {
  const { toasts, dismiss } = useToast()
  return (
    <div className={styles.stack} aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={styles.toast} role="status">
          <span>{t.message}</span>
          <button type="button" className={styles.close} onClick={() => dismiss(t.id)} aria-label="Dismiss">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
