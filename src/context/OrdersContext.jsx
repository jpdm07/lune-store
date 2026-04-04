import { createContext, useContext, useEffect, useState } from 'react'

const OrdersContext = createContext(null)
const STORAGE = 'lune_orders_v1'

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const r = localStorage.getItem(STORAGE)
      return r ? JSON.parse(r) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(orders))
  }, [orders])

  const addOrder = (order) => {
    setOrders((o) => [order, ...o])
  }

  const getById = (id) => orders.find((o) => o.id === id)

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getById }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders needs OrdersProvider')
  return ctx
}
