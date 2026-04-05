import { useState } from 'react'
import PageFade from '../components/PageFade'
import styles from './Contact.module.css'

const STUDIO_EMAIL_DISPLAY = 'hello@lunehomestudio.com'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <PageFade>
      <div className={styles.page}>
        <h1 className={styles.h1}>Contact</h1>
        <p className={styles.lead}>We typically respond within 1–2 business days.</p>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.h2}>Visit</h2>
            <p>
              14 Franklin Street
              <br />
              New York, NY 10013
            </p>
            <h2 className={styles.h2}>Hours</h2>
            <p>
              Mon–Sat 10am–7pm EST
              <br />
              Sun 12pm–5pm EST
            </p>
            <h2 className={styles.h2}>Studio inbox</h2>
            <p>
              <span className={styles.brandEmail}>{STUDIO_EMAIL_DISPLAY}</span>
              <br />
              <span className={styles.emailHint}>
                Use the form — messages route to our studio team the same way.
              </span>
            </p>
            <p>
              <a href="tel:+12125550147">(212) 555-0147</a>
            </p>
            <div className={styles.map} aria-hidden>
              <span>Map: SoHo, NYC</span>
            </div>
          </div>
          <div>
            {sent ? (
              <p className={styles.ok}>Thank you. Your message has been sent.</p>
            ) : (
              <form
                className={styles.form}
                action="https://formsubmit.co/jpdm07@yahoo.com"
                method="POST"
                onSubmit={() => setTimeout(() => setSent(true), 400)}
              >
                <input type="hidden" name="_subject" value="LUNE — Contact form" />
                <input type="hidden" name="_captcha" value="false" />
                <label>
                  Name
                  <input name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <label>
                  Subject
                  <select name="subject" required>
                    <option value="Order Help">Order Help</option>
                    <option value="Returns">Returns</option>
                    <option value="General">General</option>
                    <option value="Press">Press</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea name="message" rows={5} required />
                </label>
                <button type="submit">Send message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageFade>
  )
}
