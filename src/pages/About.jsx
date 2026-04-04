import StaticPage from './StaticPage'
import LazyImg from '../components/LazyImg'
import styles from './About.module.css'

export default function About() {
  return (
    <StaticPage title="About LUNE">
      <p>
        LUNE is what you buy when you want your home to feel intentional, not decorated. We are a slow-living
        brand for people who notice light, texture, and the weight of a mug in their hands.
      </p>
      <div className={styles.img}>
        <LazyImg
          src="https://images.unsplash.com/photo-1615529182902-48bba69121e6?auto=format&fit=crop&w=1000&q=80"
          alt=""
          aspect="16/9"
        />
      </div>
      <h2>Our materials</h2>
      <p>
        <strong>Linen</strong> — breathable, relaxed, better with age.
        <br />
        <strong>Ceramic</strong> — hand-finished glazes, food-safe, quiet forms.
        <br />
        <strong>Wool & cotton</strong> — natural fibers, honest warmth.
      </p>
      <h2>Our values</h2>
      <ul>
        <li>Slow design — we release fewer things, on purpose.</li>
        <li>Natural materials — no performative “green,” just real choices.</li>
        <li>Made to last — objects you keep, not replace every season.</li>
      </ul>
      <h2>Team</h2>
      <p>
        LUNE is a small studio based in New York. We work directly with makers and mills we trust. This page stays
        minimal on purpose—the work is in the objects.
      </p>
    </StaticPage>
  )
}
