import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Zap, Users, Target } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Client Acquisition</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance text-foreground">
              Acquire Clients with Confidence
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Streamline your client acquisition process with our intelligent lead management system. Track offers,
              manage leads, and grow your business faster.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get started free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <BarChart3 className="w-6 h-6 text-accent mb-2" />
              <CardTitle className="text-lg">Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track conversion rates and lead performance in real-time with detailed metrics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-6 h-6 text-accent mb-2" />
              <CardTitle className="text-lg">Lead Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Organize and track all your leads in one centralized, easy-to-use platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="w-6 h-6 text-accent mb-2" />
              <CardTitle className="text-lg">Offer Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create, manage, and optimize your offers to maximize conversion potential.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-6 h-6 text-accent mb-2" />
              <CardTitle className="text-lg">Smart Automation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automate repetitive tasks and focus on growing your business.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to grow your business?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Start managing your client acquisition strategy today. No credit card required.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Start your free trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Client Acquisition System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
