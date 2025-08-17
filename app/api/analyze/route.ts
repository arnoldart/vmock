import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { analyzeResume } from "@/lib/ai-analysis"
import { createResume, updateResumeStatus, createAnalysisResult, getUserByEmail } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    // Get session for authenticated user
    const session = await getServerSession()
    
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type and size
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Please upload PDF or DOCX only." }, { status: 400 })
    }

    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 })
    }

    // Get user ID from session or use test user
    let userId = 1 // Default test user
    if (session?.user?.email) {
      const user = await getUserByEmail(session.user.email)
      if (user) {
        userId = user.id
      }
    }

    // Create resume record in database
    const resume = await createResume(
      userId,
      `resume_${Date.now()}.${file.type.includes("pdf") ? "pdf" : "docx"}`,
      file.name,
      file.size,
      file.type,
    )

    // Update status to processing
    await updateResumeStatus(resume.id, "processing")

    // Simulate file processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Analyze the resume (simulated AI analysis)
    const analysisResult = await analyzeResume(file)

    const savedAnalysis = await createAnalysisResult(
      resume.id,
      userId,
      analysisResult.overallScore,
      analysisResult.categoryScores.impact,
      analysisResult.categoryScores.presentation,
      analysisResult.categoryScores.competencies,
      analysisResult.atsScore,
      analysisResult,
    )

    // Update resume status to analyzed
    await updateResumeStatus(resume.id, "analyzed")

    return NextResponse.json({
      success: true,
      analysis: {
        ...analysisResult,
        id: savedAnalysis.id,
        resumeId: resume.id,
      },
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 })
  }
}
