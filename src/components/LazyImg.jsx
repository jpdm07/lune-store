import { useState } from 'react'
import styles from './LazyImg.module.css'

export default function LazyImg({ src, alt, className = '', aspect }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <span className={`${styles.wrap} ${className}`} style={aspect ? { aspectRatio: aspect } : undefined}>
      {!loaded && <span className={styles.skel} aria-hidden />}
      <img
        src={src}
        alt={alt}
        className={styles.img}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </span>
  )
}
