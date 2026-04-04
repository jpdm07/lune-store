import { useEffect, useState } from 'react'

export function useMinWidth(px = 900) {
  const [ok, setOk] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= px : true,
  )
  useEffect(() => {
    const on = () => setOk(window.innerWidth >= px)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [px])
  return ok
}
