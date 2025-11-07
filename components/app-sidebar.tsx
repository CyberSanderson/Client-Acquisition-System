"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BarChart3, Users, Settings, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BarChart3,
    label: "My Offers",
    href: "/offers",
  },
  {
    icon: Users,
    label: "Leads",
    href: "/leads",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-sidebar h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <Target className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-sidebar-foreground text-sm">Client Acquisition</div>
          <div className="text-xs text-muted-foreground">System</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link href="/settings">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              JD
            </div>
            <div className="flex-1 text-left">
              <div className="text-xs font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">john@example.com</div>
            </div>
          </Button>
        </Link>
      </div>
    </aside>
  )
}
