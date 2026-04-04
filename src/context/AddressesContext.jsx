import { createContext, useContext, useEffect, useState } from 'react'

const AddressesContext = createContext(null)
const STORAGE = 'lune_addresses_v1'

export function AddressesProvider({ children }) {
  const [addresses, setAddresses] = useState(() => {
    try {
      const r = localStorage.getItem(STORAGE)
      return r ? JSON.parse(r) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(addresses))
  }, [addresses])

  const add = (a) =>
    setAddresses((prev) => {
      const next = a.isDefault ? prev.map((x) => ({ ...x, isDefault: false })) : [...prev]
      return [...next, { ...a, id: crypto.randomUUID() }]
    })

  const remove = (id) => setAddresses((p) => p.filter((x) => x.id !== id))
  const setDefault = (id) =>
    setAddresses((p) => p.map((x) => ({ ...x, isDefault: x.id === id })))

  return (
    <AddressesContext.Provider value={{ addresses, add, remove, setDefault }}>
      {children}
    </AddressesContext.Provider>
  )
}

export function useAddresses() {
  const ctx = useContext(AddressesContext)
  if (!ctx) throw new Error('useAddresses needs AddressesProvider')
  return ctx
}
