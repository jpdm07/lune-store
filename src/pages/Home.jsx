import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageFade from '../components/PageFade'
import LazyImg from '../components/LazyImg'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import styles from './Home.module.css'

const heroImg =
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80'

const ig = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
]

export default function Home() {
  const featured = PRODUCTS.slice(0, 4)
  const bestsellers = PRODUCTS.slice(4, 9)
  const { addItem } = useCart()
  const { toast } = useToast()

  const onAdd = (p) => {
    addItem(p, 1)
    toast('Added to cart')
  }

  return (
    <PageFade>
      <section className={styles.hero}>
        <LazyImg src={heroImg} alt="" className={styles.heroImg} photoTone eager />
        <div className={styles.heroInner}>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Everyday objects, made beautifully.
          </motion.p>
          <motion.h1
            className={styles.h1}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Made to last.
            <br />
            Designed to feel right.
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <Link to="/shop" className={styles.cta}>
              Shop now
            </Link>
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Featured</h2>
        <div className={styles.grid4}>
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <section className={styles.story}>
        <LazyImg
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
          alt=""
          className={styles.storyImg}
          aspect="4/3"
          photoTone
        />
        <div>
          <h2 className={styles.h2}>Our story</h2>
          <p className={styles.p}>
            LUNE is a slow-living home brand. We make the mug you reach for every morning, the blanket on your
            sofa, the tote you carry everywhere—objects that ask for nothing loud, only presence.
          </p>
          <Link to="/about" className={styles.link}>
            Read more →
          </Link>
        </div>
      </section>

      <section className={styles.why}>
        <h2 className={styles.h2center}>Why LUNE</h2>
        <div className={styles.cols3}>
          <div>
            <h3 className={styles.h3}>Natural materials</h3>
            <p className={styles.p}>Linen, cotton, wool, ceramic—chosen for hand and longevity.</p>
          </div>
          <div>
            <h3 className={styles.h3}>Made to last</h3>
            <p className={styles.p}>We design out waste. Fewer pieces, built for years of use.</p>
          </div>
          <div>
            <h3 className={styles.h3}>Slow design</h3>
            <p className={styles.p}>Nothing rushed. Calm shapes, quiet palettes, honest craft.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.rowHead}>
          <h2 className={styles.h2}>Bestsellers</h2>
          <Link to="/shop" className={styles.link}>
            Shop all →
          </Link>
        </div>
        <div className={styles.hscroll}>
          {bestsellers.map((p) => (
            <div key={p.slug} className={styles.hcard}>
              <ProductCard product={p} onAdd={onAdd} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ig}>
        {ig.map((src, i) => (
          <LazyImg key={i} src={src} alt="" className={styles.igCell} aspect="1" photoTone />
        ))}
      </section>

      <section className={styles.news}>
        <h2 className={styles.h2center}>Join the LUNE community</h2>
        <p className={styles.pcenter}>Notes on new pieces, care, and slow living—no noise.</p>
        <form
          className={styles.newsForm}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <input type="email" required placeholder="Email address" aria-label="Email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </PageFade>
  )
}
