import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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
  lineByLineFeedback: any[]
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

export async function analyzeResume(extractedText:any) {
  // Simulate AI processing time
  // await new Promise((resolve) => setTimeout(resolve, 1500))

  const prompt = `
Analyze the following resume and provide a comprehensive evaluation. Return a JSON response with the exact structure specified below.

Resume Text:
${extractedText}

Please analyze this resume and provide scores (0-100) for the following categories:
1. Impact (quantified achievements, results, measurable outcomes)
2. Presentation (formatting, structure, readability, organization)  
3. Competencies (relevant skills, experience alignment, industry keywords)
4. ATS Compatibility (keyword optimization, standard formatting, section headers)

Return your analysis in this exact JSON format:
{
  "overallScore": number (0-100),
  "categoryScores": {
    "impact": number (0-100),
    "presentation": number (0-100), 
    "competencies": number (0-100)
  },
  "atsScore": number (0-100),
  "feedback": {
    "impact": {
      "score": number (0-100),
      "strengths": ["strength1", "strength2", "strength3"],
      "improvements": ["improvement1", "improvement2", "improvement3"],
      "details": "detailed explanation of impact assessment"
    },
    "presentation": {
      "score": number (0-100),
      "strengths": ["strength1", "strength2", "strength3"],
      "improvements": ["improvement1", "improvement2", "improvement3"], 
      "details": "detailed explanation of presentation assessment"
    },
    "competencies": {
      "score": number (0-100),
      "strengths": ["strength1", "strength2", "strength3"],
      "improvements": ["improvement1", "improvement2", "improvement3"],
      "details": "detailed explanation of competencies assessment"
    }
  },
  "lineByLineFeedback": [
    {
      "section": "section name",
      "originalText": "original text from resume",
      "feedback": "specific feedback",
      "suggestion": "improved version suggestion",
      "severity": "high|medium|low"
    }
  ],
  "atsCompatibility": {
    "score": number (0-100),
    "issues": ["issue1", "issue2", "issue3"],
    "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
  },
  "recommendations": ["recommendation1", "recommendation2", "recommendation3", "recommendation4", "recommendation5"]
}

Focus on:
- Quantified achievements and impact metrics
- Technical skills relevance for frontend development
- Professional experience progression
- ATS optimization and keyword usage
- Overall presentation and structure
- Specific, actionable improvement suggestions

Provide constructive, professional feedback that helps improve the resume.
`;

  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
  const response = await ai.models.generateContent({
    model: "gemma-3n-e4b-it",
    contents: prompt
  })

  const result = await response.text;
  let raw = result?.trim();
  raw = raw?.replace(/```json/, "").replace(/```/, "").trim();

  const validJson = extractValidJson(raw || "");

  let analysisData: any;
  try {
    analysisData = JSON.parse(validJson);

    console.log(analysisData)

    return analysisData
  } catch (error) {
    console.error("Error parsing AI response as JSON:", error);
    return generateFallbackAnalysis();
  }
  // } catch (error) {
  //   console.error("Error generating analysis:", error)
  //   return generateFallbackAnalysis()
  // }
}

function generateFallbackAnalysis(): ResumeAnalysis {
  return {
    id: `analysis_${Date.now()}`,
    fileName: "No Resume.pdf",
    uploadDate: new Date().toISOString(),
    overallScore: 0,
    categoryScores: {
      impact: 0,
      presentation: 0,
      competencies: 0,
    },
    scores: {
      impact: 0,
      presentation: 0,
      competencies: 0,
    },
    atsScore: 0,
    feedback: generateFallbackFeedback(),
    lineByLineFeedback: [],
    atsCompatibility: {
      score: 0,
      issues: ["Analysis temporarily unavailable"],
      recommendations: ["Please try again later"]
    },
    recommendations: [
      "Add more quantified achievements",
      "Include relevant certifications",
      "Optimize for ATS systems"
    ],
  };
}

function generateFallbackFeedback() {
  return {
    impact: {
      score: 75,
      strengths: ["Good work experience progression", "Relevant project examples"],
      improvements: ["Add more quantified results", "Include specific metrics"],
      details: "Your resume shows solid experience but could benefit from more measurable achievements."
    },
    presentation: {
      score: 80,
      strengths: ["Clean structure", "Good organization"],
      improvements: ["Consistent formatting", "Better section headers"],
      details: "Overall presentation is professional with room for formatting improvements."
    },
    competencies: {
      score: 85,
      strengths: ["Strong technical skills", "Relevant frameworks"],
      improvements: ["Add certifications", "Include soft skills"],
      details: "Technical competencies are well-aligned with frontend development roles."
    }
  };
}

function extractValidJson(raw: string): string {
  // Cari posisi kurung tutup terakhir
  const lastBrace = raw.lastIndexOf('}');
  if (lastBrace !== -1) {
    return raw.slice(0, lastBrace + 1);
  }
  return raw;
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
