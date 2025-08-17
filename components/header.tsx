import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <a href="/" className="text-2xl font-bold text-foreground font-serif hover:text-primary transition-colors">
              VMock
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/upload" className="text-muted-foreground hover:text-foreground transition-colors">
              Upload Resume
            </a>
            <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="/history" className="text-muted-foreground hover:text-foreground transition-colors">
              History
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
