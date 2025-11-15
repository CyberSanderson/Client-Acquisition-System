// /lib/supabaseServer.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookies()).get(name)?.value
        },
        async set(name: string, value: string, options: any) {
          try {
            (await cookies()).set({ name, value, ...options })
          } catch {
            // Ignore if headers already sent
          }
        },
        async remove(name: string, options: any) {
          try {
            (await cookies()).set({ name, value: '', ...options })
          } catch {
            // Ignore if headers already sent
          }
        },
      },
    }
  )

