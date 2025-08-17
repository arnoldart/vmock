import { ResumeUpload } from "@/components/resume-upload"
import { Header } from "@/components/header"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">Upload Your Resume</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume in PDF or DOCX format and get instant AI-powered feedback to improve your chances of
              landing your dream job.
            </p>
          </div>
          <ResumeUpload />
        </div>
      </main>
    </div>
  )
}
