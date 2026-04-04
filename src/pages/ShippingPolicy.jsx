import StaticPage from './StaticPage'

export default function ShippingPolicy() {
  return (
    <StaticPage title="Shipping Policy">
      <h2>Rates</h2>
      <ul>
        <li>Standard — 5–7 business days — $5.99 (free on orders over $75)</li>
        <li>Express — 2–3 business days — $14.99</li>
        <li>Overnight — 1 business day — $24.99</li>
        <li>International — 10–21 business days — calculated at checkout</li>
      </ul>
      <h2>Processing</h2>
      <p>Orders ship within 1–2 business days. We do not ship weekends or US holidays.</p>
      <h2>Tracking</h2>
      <p>You receive a confirmation email when the order ships with tracking details.</p>
    </StaticPage>
  )
}
