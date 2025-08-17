import { type NextRequest, NextResponse } from "next/server"
import { getAnalysisResultsByUserId } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from authentication
    const userId = 1 // Demo user ID - replace with actual auth
    const history = await getAnalysisResultsByUserId(userId)

    const formattedHistory = history.map((result) => ({
      id: result.id,
      resumeId: result.resume_id,
      filename: result.original_filename,
      uploadDate: result.upload_date,
      overallScore: result.overall_score,
      categoryScores: {
        impact: result.impact_score,
        presentation: result.presentation_score,
        competencies: result.competencies_score,
      },
      atsScore: result.ats_score,
      analysisData: result.analysis_data,
    }))

    return NextResponse.json({ history: formattedHistory })
  } catch (error) {
    console.error("Error fetching user history:", error)
    return NextResponse.json({ error: "Failed to fetch analysis history" }, { status: 500 })
  }
}
