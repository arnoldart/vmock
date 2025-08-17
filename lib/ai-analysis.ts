export interface ResumeAnalysis {
  id: string
  fileName: string
  uploadDate: string
  overallScore: number
  categoryScores: {
    impact: number
    presentation: number
    competencies: number
  }
  scores: {
    impact: number
    presentation: number
    competencies: number
  }
  atsScore: number
  feedback: {
    impact: FeedbackSection
    presentation: FeedbackSection
    competencies: FeedbackSection
  }
  lineByLineFeedback: LineByLineFeedback[]
  atsCompatibility: ATSCompatibility
  recommendations: string[]
}

export interface FeedbackSection {
  score: number
  strengths: string[]
  improvements: string[]
  details: string
}

export interface LineByLineFeedback {
  section: string
  originalText: string
  feedback: string
  suggestion: string
  severity: "high" | "medium" | "low"
}

export interface ATSCompatibility {
  score: number
  issues: string[]
  recommendations: string[]
}

export async function analyzeResume(file: File): Promise<ResumeAnalysis> {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate realistic analysis data
  const impactScore = Math.floor(Math.random() * 30) + 65 // 65-95
  const presentationScore = Math.floor(Math.random() * 25) + 70 // 70-95
  const competenciesScore = Math.floor(Math.random() * 35) + 60 // 60-95
  const overallScore = Math.round((impactScore + presentationScore + competenciesScore) / 3)
  const atsScore = Math.floor(Math.random() * 20) + 75 // 75-95

  const analysis: ResumeAnalysis = {
    id: `analysis_${Date.now()}`,
    fileName: file.name,
    uploadDate: new Date().toISOString(),
    overallScore,
    categoryScores: {
      impact: impactScore,
      presentation: presentationScore,
      competencies: competenciesScore,
    },
    scores: {
      impact: impactScore,
      presentation: presentationScore,
      competencies: competenciesScore,
    },
    atsScore,
    feedback: {
      impact: {
        score: impactScore,
        strengths: [
          "Strong use of quantified achievements in recent roles",
          "Action verbs effectively demonstrate leadership",
          "Clear progression of responsibilities shown",
        ],
        improvements: [
          "Add more specific metrics to earlier work experiences",
          "Include percentage improvements or cost savings",
          "Strengthen impact statements with concrete numbers",
        ],
        details:
          "Your resume shows good use of quantified achievements, particularly in recent positions. However, earlier experiences could benefit from more specific metrics and measurable outcomes to strengthen overall impact.",
      },
      presentation: {
        score: presentationScore,
        strengths: [
          "Clean, professional layout with good use of whitespace",
          "Consistent formatting throughout document",
          "Appropriate font choices and sizing",
        ],
        improvements: [
          "Consider using bullet points for better readability",
          "Ensure consistent date formatting across all sections",
          "Optimize section headers for ATS scanning",
        ],
        details:
          "Your resume has a professional appearance with good visual hierarchy. Minor formatting adjustments could improve ATS compatibility and overall readability.",
      },
      competencies: {
        score: competenciesScore,
        strengths: [
          "Relevant technical skills clearly listed",
          "Good alignment with industry requirements",
          "Soft skills demonstrated through achievements",
        ],
        improvements: [
          "Include more industry-specific keywords",
          "Add certifications or training programs",
          "Highlight emerging technology skills",
        ],
        details:
          "Your competencies section shows strong technical foundation. Adding more industry keywords and recent certifications could improve keyword matching for ATS systems.",
      },
    },
    lineByLineFeedback: [
      {
        section: "Work Experience",
        originalText: "Managed team and improved processes",
        feedback: "This statement lacks specific metrics and impact details",
        suggestion:
          "Led cross-functional team of 8 members, implementing process improvements that reduced project delivery time by 25%",
        severity: "high",
      },
      {
        section: "Work Experience",
        originalText: "Responsible for customer service",
        feedback: "Passive language doesn't showcase achievements",
        suggestion:
          "Delivered exceptional customer service, maintaining 95% satisfaction rating and resolving 50+ inquiries daily",
        severity: "medium",
      },
      {
        section: "Skills",
        originalText: "Proficient in Microsoft Office",
        feedback: "Too generic for modern job market",
        suggestion:
          "Advanced Excel (pivot tables, VLOOKUP, macros), PowerPoint (data visualization), Word (document automation)",
        severity: "low",
      },
      {
        section: "Education",
        originalText: "Bachelor of Science in Computer Science",
        feedback: "Consider adding relevant coursework or GPA if strong",
        suggestion:
          "Bachelor of Science in Computer Science, GPA: 3.7/4.0, Relevant Coursework: Data Structures, Machine Learning, Database Systems",
        severity: "low",
      },
    ],
    atsCompatibility: {
      score: atsScore,
      issues: [
        "Some section headers may not be recognized by all ATS systems",
        "Consider using standard section names like 'Professional Experience'",
        "Avoid using tables or complex formatting elements",
      ],
      recommendations: [
        "Use standard section headers (Experience, Education, Skills)",
        "Save as both PDF and Word formats for different ATS systems",
        "Include keywords from job descriptions naturally in content",
        "Use simple, clean formatting without graphics or tables",
      ],
    },
    recommendations: [
      "Focus on quantifying achievements with specific metrics and percentages",
      "Optimize keyword usage for your target industry and roles",
      "Improve ATS compatibility by using standard section headers",
      "Add more recent certifications or professional development activities",
      "Consider tailoring your resume for specific job applications",
    ],
  }

  return analysis
}

// Utility function to get analysis by ID (for dashboard)
export function getAnalysisById(id: string): ResumeAnalysis | null {
  // In a real app, this would fetch from database
  // For demo purposes, return null to simulate not found
  return null
}

// Utility function to get user's analysis history
export function getUserAnalysisHistory(userId: string): ResumeAnalysis[] {
  // In a real app, this would fetch from database
  // For demo purposes, return empty array
  return []
}
