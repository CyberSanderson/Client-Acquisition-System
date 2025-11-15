"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { supabaseBrowser } from "@/lib/supabaseBrowser"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"

export function TopNav() {
  const [menuOpen] = useState(false) // kept in case you later wire mobile menu
  const router = useRouter()
  const supabase = supabaseBrowser()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("❌ Logout error:", error)
      return
    }

    router.refresh()
    router.push("/login")
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side - Menu button (for mobile) */}
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        {/* Center - Title */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* Profile dropdown using Radix directly */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Avatar className="w-9 h-9 cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="z-50 min-w-[180px] rounded-md border border-border bg-popover p-1 text-sm shadow-md focus:outline-none"
              >
                {/* Label */}
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  My Account
                </div>
                <div className="my-1 h-px bg-border" />

                {/* Settings */}
                <DropdownMenu.Item
                  className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-foreground outline-none hover:bg-muted"
                  onClick={() => router.push("/dashboard/settings")}
                >
                  Settings
                </DropdownMenu.Item>

                <div className="my-1 h-px bg-border" />

                {/* Logout */}
                <DropdownMenu.Item
                  className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-destructive outline-none hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}

