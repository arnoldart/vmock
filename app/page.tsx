import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center py-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif">
              Accelerate Your Career with <span className="text-primary">AI-Powered</span> Resume Analysis
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant, personalized feedback on your resume. Our AI analyzes your CV for impact, presentation, and
              competencies to help you land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" asChild>
                <Link href="/auth">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Trusted by 10,000+ job seekers worldwide</p>
            </div>
          </section>

          <section id="features" className="py-16">
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

          <section id="how-it-works" className="py-16 bg-muted/30 rounded-2xl">
            <div className="px-8">
              <h2 className="text-3xl font-bold text-center mb-12 font-serif">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Upload Resume</h3>
                  <p className="text-muted-foreground">
                    Upload your resume in PDF or DOCX format. Our system supports all major file types.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes your resume for impact, presentation, competencies, and ATS compatibility.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Get Feedback</h3>
                  <p className="text-muted-foreground">
                    Receive detailed feedback with actionable suggestions to improve your resume.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="font-serif">Free</CardTitle>
                  <CardDescription>Perfect to get started</CardDescription>
                  <div className="text-3xl font-bold">$0</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">✓ 1 resume analysis</li>
                    <li className="flex items-center">✓ Basic feedback</li>
                    <li className="flex items-center">✓ ATS compatibility check</li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <Link href="/auth">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-primary">
                <CardHeader className="text-center">
                  <CardTitle className="font-serif">Pro</CardTitle>
                  <CardDescription>For serious job seekers</CardDescription>
                  <div className="text-3xl font-bold">$9.99</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">✓ Unlimited analyses</li>
                    <li className="flex items-center">✓ Detailed line-by-line feedback</li>
                    <li className="flex items-center">✓ Progress tracking</li>
                    <li className="flex items-center">✓ Resume comparison</li>
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/auth">Upgrade to Pro</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of job seekers who have improved their resumes with VMock
            </p>
            <Button size="lg" asChild>
              <Link href="/auth">Start Analyzing Your Resume</Link>
            </Button>
          </section>
        </div>
      </main>
    </div>
  )
}
