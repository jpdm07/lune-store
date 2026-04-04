import { useState } from 'react'
import PageFade from '../components/PageFade'
import styles from './FAQ.module.css'

const ITEMS = [
  ['How long does shipping take?', 'Standard orders arrive in 5–7 business days after processing. Express and overnight options are available at checkout.'],
  ['Do you ship internationally?', 'Yes. International delivery typically takes 10–21 business days. Rates are calculated at checkout.'],
  ['What is your return policy?', 'Unused items in original packaging may be returned within 30 days of delivery. Final sale items are excluded.'],
  ['How do I track my order?', 'Once your order ships, you receive an email with tracking. You can also view status in your account under Orders.'],
  ['Are your products sustainably made?', 'We prioritize natural materials and durable construction. We partner with mills and makers we can visit and verify.'],
  ['What materials do you use?', 'Primarily linen, cotton, wool, ceramic, and beeswax—listed on each product page under Materials & care.'],
  ['Can I change or cancel my order?', 'Contact us within one hour of placing your order. After processing begins, changes may not be possible.'],
  ['Do you offer gift wrapping?', 'Complimentary minimal gift wrap is available—select it at checkout when offered.'],
  ['How do I care for my linen products?', 'Machine wash cold with like colors. Line dry or tumble low. Linen softens with wear.'],
  ['How do I care for my ceramic pieces?', 'Most tableware is dishwasher safe unless noted. Avoid sudden temperature changes.'],
  ['Do you offer wholesale or bulk orders?', 'Email press@lune.example with your business details—we review wholesale quarterly.'],
  ['How do I apply a discount code?', 'Enter your code in the cart before checkout. Codes cannot be combined unless stated.'],
  ['Is my payment information secure?', 'Payments are processed by PCI-compliant providers. We never store full card numbers on our servers.'],
  ['What payment methods do you accept?', 'Visa, Mastercard, American Express, PayPal, and Apple Pay where available.'],
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <PageFade>
      <div className={styles.page}>
        <h1 className={styles.h1}>FAQ</h1>
        <ul className={styles.list}>
          {ITEMS.map(([q, a], i) => (
            <li key={i} className={styles.item}>
              <button type="button" className={styles.q} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{q}</span>
                <span className={styles.ic}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className={styles.a}>{a}</p>}
            </li>
          ))}
        </ul>
      </div>
    </PageFade>
  )
}
