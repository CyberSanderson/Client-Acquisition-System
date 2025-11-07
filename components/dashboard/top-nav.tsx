"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"
import { useState } from "react"

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)

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

          <Avatar className="w-9 h-9 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
