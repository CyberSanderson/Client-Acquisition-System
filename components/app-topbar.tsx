"use client"
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"

export function AppTopbar() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </Button>

          <Button variant="ghost" size="sm" className="gap-2" onClick={() => (window.location.href = "/")}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
