import { AuthSection } from "@/components/auth-section"
import { Header } from "@/components/header"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
              Welcome to VMock
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to your account or create a new one to get started
            </p>
          </div>

          <AuthSection />

          <div className="text-center mt-8">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
