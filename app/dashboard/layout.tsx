// app/dashboard/layout.tsx
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      {/*
        FIX: Added 'min-w-0' here.
        This tells the flex-1 container that it's allowed to shrink,
        which prevents its children (like your charts) from overflowing
        their containers.
      */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="p-4 lg:p-6 w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}