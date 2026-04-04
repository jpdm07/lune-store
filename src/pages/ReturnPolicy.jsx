import StaticPage from './StaticPage'
import { Link } from 'react-router-dom'

export default function ReturnPolicy() {
  return (
    <StaticPage title="Return Policy">
      <p>You have 30 days from the delivery date to initiate a return.</p>
      <h2>Eligibility</h2>
      <ul>
        <li>Items must be unused, unwashed, and in original packaging with tags attached.</li>
        <li>Final sale items are not eligible for return.</li>
      </ul>
      <h2>How to start</h2>
      <p>
        Sign in and open <Link to="/account/returns">Returns</Link> in your account, or contact us with your order
        number. We email a prepaid label when the return is approved (defects or our error—otherwise return shipping
        is paid by the customer).
      </p>
      <h2>Refunds</h2>
      <p>Refunds post to your original payment method within 5–7 business days after we receive and inspect the return.</p>
      <h2>Exchanges</h2>
      <p>Size or color exchanges are honored when stock allows. Start a return and note “exchange” in your message.</p>
      <h2>Damaged or wrong items</h2>
      <p>Email jpdm07@yahoo.com within 48 hours of delivery with photos—we cover return shipping and replacement.</p>
    </StaticPage>
  )
}
