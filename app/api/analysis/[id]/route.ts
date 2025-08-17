import { type NextRequest, NextResponse } from "next/server"
import { getAnalysisResultById } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const result = await getAnalysisResultById(Number.parseInt(id))

    if (!result) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 })
    }

    const analysis = {
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
      ...result.analysis_data,
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error fetching analysis:", error)
    return NextResponse.json({ error: "Failed to fetch analysis" }, { status: 500 })
  }
}
