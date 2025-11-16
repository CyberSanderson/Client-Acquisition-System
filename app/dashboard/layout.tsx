// app/dashboard/layout.tsx
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="p-4 lg:p-6 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
