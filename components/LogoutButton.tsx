"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export function LogoutButton() {
  const router = useRouter()
  const supabase = supabaseBrowser()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("❌ Logout error:", error)
      return
    }

    // Force Next.js to refresh cookies + session
    router.refresh()

    // Redirect user
    router.push("/login")
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Logout
    </Button>
  )
}

