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
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
          alt=""
          aspect="16/9"
          photoTone
        />
      </div>
      <h2>Why LUNE exists</h2>
      <p>
        LUNE began with founder <strong>Jane Chavez</strong>—a first-generation immigrant from the Philippines who
        built a life in the U.S. while carrying the memory of growing up with very little. Self-supporting from an
        early age, she learned to treat every purchase as a choice: fewer things, chosen carefully, meant to last.
        That mindset became the store: objects that earn their place in your day, not clutter that shouts for
        attention.
      </p>
      <p>
        The name <em>LUNE</em> nods to quiet light—the kind that fills a room at dawn and makes ordinary corners
        feel calm. The curation is personal: linen that softens, ceramics that feel honest in the hand, wool that
        warms without weight. Nothing is here to impress a trend cycle; it is here because it could stay with you
        for years.
      </p>
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
      <h2>Studio</h2>
      <p>
        LUNE is a small studio based in New York. We work directly with makers and mills we trust. This page stays
        minimal on purpose—the story lives in the objects, and in the care behind them.
      </p>
    </StaticPage>
  )
}
