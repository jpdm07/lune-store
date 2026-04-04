import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

let id = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((toastId) => {
    setToasts((t) => t.filter((x) => x.id !== toastId))
  }, [])

  const toast = useCallback((message, type = 'default') => {
    const tid = ++id
    setToasts((t) => [...t, { id: tid, message, type }])
    setTimeout(() => dismiss(tid), 3000)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ toast, dismiss, toasts }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast needs ToastProvider')
  return ctx
}
