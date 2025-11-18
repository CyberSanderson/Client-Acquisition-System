import '../globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import AuthProvider from '@/components/AuthProvider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geist.variable} ${geistMono.variable} font-sans bg-background text-foreground antialiased`}>
          {children}
          <Analytics />
        </body>
      </html>
    </AuthProvider>
  )
}
