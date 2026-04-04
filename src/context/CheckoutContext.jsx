import { createContext, useContext, useState } from 'react'

const CheckoutContext = createContext(null)

export function CheckoutProvider({ children }) {
  const [draft, setDraft] = useState({
    guestEmail: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    shippingMethod: 'standard',
    payment: 'card',
    saveInfo: false,
  })

  const reset = () =>
    setDraft({
      guestEmail: '',
      fullName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      shippingMethod: 'standard',
      payment: 'card',
      saveInfo: false,
    })

  return (
    <CheckoutContext.Provider value={{ draft, setDraft, reset }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckoutDraft() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckoutDraft needs CheckoutProvider')
  return ctx
}
