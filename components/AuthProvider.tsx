'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => supabaseBrowser())
  const router = useRouter()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      // refresh when auth state changes so JWT stays valid
      router.refresh()
    })
    return () => listener.subscription.unsubscribe()
  }, [supabase, router])

  return <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>
}
