import { createContext, useContext, useEffect, useState } from 'react'

const ReturnsContext = createContext(null)
const STORAGE = 'lune_returns_v1'

export function ReturnsProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const r = localStorage.getItem(STORAGE)
      return r ? JSON.parse(r) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(items))
  }, [items])

  const submitReturn = (payload) => {
    const row = {
      id: 'RET-' + Math.random().toString(36).slice(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'Received',
      ...payload,
    }
    setItems((x) => [row, ...x])
    return row
  }

  return (
    <ReturnsContext.Provider value={{ returns: items, submitReturn }}>
      {children}
    </ReturnsContext.Provider>
  )
}

export function useReturns() {
  const ctx = useContext(ReturnsContext)
  if (!ctx) throw new Error('useReturns needs ReturnsProvider')
  return ctx
}
