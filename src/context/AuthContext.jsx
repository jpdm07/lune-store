import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)
const DEMO_STORAGE = 'lune_demo_user_v1'

function readDemoUser() {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    isSupabaseConfigured && supabase ? null : readDemoUser(),
  )
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured && supabase))

  useEffect(() => {
    if (!(isSupabaseConfigured && supabase)) return
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data
    }
    if (!email || password.length < 8) throw new Error('Invalid credentials')
    const u = {
      id: 'demo-' + email,
      email,
      user_metadata: { first_name: 'Guest', last_name: 'User' },
    }
    localStorage.setItem(DEMO_STORAGE, JSON.stringify(u))
    setUser(u)
    return { user: u }
  }

  const signUp = async (email, password, firstName, lastName) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName } },
      })
      if (error) throw error
      return data
    }
    const u = {
      id: 'demo-' + email,
      email,
      user_metadata: { first_name: firstName, last_name: lastName },
    }
    localStorage.setItem(DEMO_STORAGE, JSON.stringify(u))
    setUser(u)
    return { user: u }
  }

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    }
    localStorage.removeItem(DEMO_STORAGE)
    setUser(null)
  }

  const resetPassword = async (email) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/login`,
      })
      if (error) throw error
      return
    }
    // Demo: pretend success
    await new Promise((r) => setTimeout(r, 400))
  }

  const updatePassword = async (newPassword) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return
    }
    await new Promise((r) => setTimeout(r, 400))
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    isDemo: !isSupabaseConfigured,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth needs AuthProvider')
  return ctx
}
