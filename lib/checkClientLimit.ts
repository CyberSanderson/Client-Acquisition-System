// lib/checkClientLimit.ts
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export async function checkClientLimit() {
  const supabase = supabaseBrowser()

  // Get the logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("Must be logged in to perform this action.")
  }

  // Fetch the user’s subscription plan from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) {
    throw new Error("Could not fetch user profile.")
  }

  const plan = profile.plan as "starter" | "pro" | "agency"

  const limits: Record<string, number> = {
    starter: 500,
    pro: Infinity,
    agency: Infinity,
  }

  const { data: clients, error: clientError } = await supabase
    .from("clients")
    .select("id", { count: "exact" })
    .eq("user_id", user.id)

  if (clientError) {
    throw new Error("Error fetching client data.")
  }

  const clientCount = clients?.length ?? 0
  const maxClients = limits[plan]

  if (clientCount >= maxClients) {
    return {
      allowed: false,
      message: `You've reached your limit (${maxClients}) on the ${plan} plan. Upgrade to add more clients.`,
    }
  }

  return { allowed: true }
}
