import { AuthSection } from "@/components/auth-section"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center py-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif">
              Accelerate Your Career with <span className="text-primary">AI-Powered</span> Resume Analysis
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant, personalized feedback on your resume. Our AI analyzes your CV for impact, presentation, and
              competencies to help you land your dream job.
            </p>
          </section>

          {/* Authentication Section */}
          <AuthSection />

          {/* Features Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Why Choose VMock?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">Instant Analysis</h3>
                <p className="text-muted-foreground">
                  Get comprehensive feedback in under 90 seconds with our advanced AI engine.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">ATS Optimization</h3>
                <p className="text-muted-foreground">
                  Ensure your resume passes through Applicant Tracking Systems with confidence.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">Detailed Feedback</h3>
                <p className="text-muted-foreground">
                  Get line-by-line suggestions to improve impact, presentation, and competencies.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
