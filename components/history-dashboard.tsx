"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ComparisonView } from "@/components/comparison-view"
import type { ResumeAnalysis } from "@/lib/ai-analysis"

// Mock history data for demonstration
const mockHistory: ResumeAnalysis[] = [
  {
    id: "analysis_1703123456789",
    fileName: "John_Doe_Resume_v3.pdf",
    uploadDate: "2024-08-15T10:30:00Z",
    overallScore: 82,
    scores: { impact: 85, presentation: 78, competencies: 83 },
    feedback: {
      impact: {
        score: 85,
        strengths: ["Strong quantified achievements", "Clear progression shown"],
        improvements: ["Add more metrics to earlier roles"],
        details: "Good use of quantified achievements in recent positions.",
      },
      presentation: {
        score: 78,
        strengths: ["Clean layout", "Consistent formatting"],
        improvements: ["Optimize for ATS", "Better section headers"],
        details: "Professional appearance with minor ATS improvements needed.",
      },
      competencies: {
        score: 83,
        strengths: ["Relevant skills listed", "Good industry alignment"],
        improvements: ["Add more keywords", "Include certifications"],
        details: "Strong technical foundation with room for keyword optimization.",
      },
    },
    lineByLineFeedback: [],
    atsCompatibility: { score: 80, issues: [], recommendations: [] },
    recommendations: [],
  },
  {
    id: "analysis_1703023456789",
    fileName: "John_Doe_Resume_v2.pdf",
    uploadDate: "2024-08-10T14:15:00Z",
    overallScore: 75,
    scores: { impact: 72, presentation: 80, competencies: 73 },
    feedback: {
      impact: {
        score: 72,
        strengths: ["Some quantified achievements"],
        improvements: ["Need more specific metrics", "Strengthen action verbs"],
        details: "Moderate use of quantified achievements with room for improvement.",
      },
      presentation: {
        score: 80,
        strengths: ["Good visual hierarchy", "Professional fonts"],
        improvements: ["Improve spacing", "Standardize formatting"],
        details: "Well-presented with minor formatting inconsistencies.",
      },
      competencies: {
        score: 73,
        strengths: ["Core skills present"],
        improvements: ["Add industry keywords", "Include soft skills"],
        details: "Basic competencies covered but needs enhancement.",
      },
    },
    lineByLineFeedback: [],
    atsCompatibility: { score: 75, issues: [], recommendations: [] },
    recommendations: [],
  },
  {
    id: "analysis_1702923456789",
    fileName: "John_Doe_Resume_v1.pdf",
    uploadDate: "2024-08-05T09:45:00Z",
    overallScore: 68,
    scores: { impact: 65, presentation: 72, competencies: 67 },
    feedback: {
      impact: {
        score: 65,
        strengths: ["Clear job responsibilities"],
        improvements: ["Add quantified results", "Use stronger action verbs"],
        details: "Basic impact statements need quantification and strengthening.",
      },
      presentation: {
        score: 72,
        strengths: ["Readable format"],
        improvements: ["Improve layout", "Better use of whitespace"],
        details: "Decent presentation but could be more polished.",
      },
      competencies: {
        score: 67,
        strengths: ["Basic skills listed"],
        improvements: ["Expand skill set", "Add technical proficiencies"],
        details: "Limited competencies section needs expansion.",
      },
    },
    lineByLineFeedback: [],
    atsCompatibility: { score: 70, issues: [], recommendations: [] },
    recommendations: [],
  },
]

export function HistoryDashboard() {
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return "bg-green-100"
    if (score >= 70) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getImprovementIndicator = (current: number, previous: number) => {
    const diff = current - previous
    if (diff > 0) {
      return (
        <div className="flex items-center text-green-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          +{diff}
        </div>
      )
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-red-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {diff}
        </div>
      )
    }
    return <div className="text-muted-foreground">No change</div>
  }

  const handleAnalysisSelect = (analysisId: string) => {
    setSelectedAnalyses((prev) => {
      if (prev.includes(analysisId)) {
        return prev.filter((id) => id !== analysisId)
      } else if (prev.length < 2) {
        return [...prev, analysisId]
      } else {
        return [prev[1], analysisId]
      }
    })
  }

  const handleCompare = () => {
    if (selectedAnalyses.length === 2) {
      setShowComparison(true)
    }
  }

  if (showComparison && selectedAnalyses.length === 2) {
    const analysis1 = mockHistory.find((a) => a.id === selectedAnalyses[0])!
    const analysis2 = mockHistory.find((a) => a.id === selectedAnalyses[1])!
    return <ComparisonView analysis1={analysis1} analysis2={analysis2} onBack={() => setShowComparison(false)} />
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">Resume History</h1>
        <p className="text-lg text-muted-foreground">Track your progress and compare different versions</p>
      </div>

      {/* Progress Overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif">Progress Overview</CardTitle>
          <CardDescription>Your improvement journey over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{mockHistory.length}</div>
              <div className="text-sm text-muted-foreground">Total Analyses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                +{mockHistory[0].overallScore - mockHistory[mockHistory.length - 1].overallScore}
              </div>
              <div className="text-sm text-muted-foreground">Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">{mockHistory[0].overallScore}</div>
              <div className="text-sm text-muted-foreground">Latest Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {Math.round(mockHistory.reduce((sum, analysis) => sum + analysis.overallScore, 0) / mockHistory.length)}
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Compare Resumes</CardTitle>
          <CardDescription>Select up to 2 resumes to compare their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedAnalyses.length === 0 && "Select resumes to compare"}
              {selectedAnalyses.length === 1 && "Select one more resume to compare"}
              {selectedAnalyses.length === 2 && "Ready to compare selected resumes"}
            </div>
            <div className="flex space-x-2">
              {selectedAnalyses.length > 0 && (
                <Button variant="outline" onClick={() => setSelectedAnalyses([])}>
                  Clear Selection
                </Button>
              )}
              <Button onClick={handleCompare} disabled={selectedAnalyses.length !== 2}>
                Compare Selected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-serif">Analysis History</h2>
        <div className="space-y-4">
          {mockHistory.map((analysis, index) => {
            const previousAnalysis = mockHistory[index + 1]
            const isSelected = selectedAnalyses.includes(analysis.id)

            return (
              <Card
                key={analysis.id}
                className={`cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
                }`}
                onClick={() => handleAnalysisSelect(analysis.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleAnalysisSelect(analysis.id)}
                          className="rounded border-border"
                        />
                        <div>
                          <h3 className="font-semibold">{analysis.fileName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(analysis.uploadDate).toLocaleDateString()} at{" "}
                            {new Date(analysis.uploadDate).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {previousAnalysis && (
                        <div className="text-sm">
                          {getImprovementIndicator(analysis.overallScore, previousAnalysis.overallScore)}
                        </div>
                      )}
                      <Badge
                        className={`${getScoreBgColor(analysis.overallScore)} ${getScoreColor(analysis.overallScore)}`}
                      >
                        {analysis.overallScore}/100
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Impact</span>
                        <span className={`text-sm font-bold ${getScoreColor(analysis.scores.impact)}`}>
                          {analysis.scores.impact}
                        </span>
                      </div>
                      <Progress value={analysis.scores.impact} className="h-2" />
                      {previousAnalysis && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {getImprovementIndicator(analysis.scores.impact, previousAnalysis.scores.impact)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Presentation</span>
                        <span className={`text-sm font-bold ${getScoreColor(analysis.scores.presentation)}`}>
                          {analysis.scores.presentation}
                        </span>
                      </div>
                      <Progress value={analysis.scores.presentation} className="h-2" />
                      {previousAnalysis && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {getImprovementIndicator(analysis.scores.presentation, previousAnalysis.scores.presentation)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Competencies</span>
                        <span className={`text-sm font-bold ${getScoreColor(analysis.scores.competencies)}`}>
                          {analysis.scores.competencies}
                        </span>
                      </div>
                      <Progress value={analysis.scores.competencies} className="h-2" />
                      {previousAnalysis && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {getImprovementIndicator(analysis.scores.competencies, previousAnalysis.scores.competencies)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Store analysis in sessionStorage and redirect to dashboard
                          sessionStorage.setItem("currentAnalysis", JSON.stringify(analysis))
                          window.location.href = "/dashboard"
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                    {index === 0 && <Badge variant="secondary">Latest</Badge>}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <Button size="lg" asChild>
          <a href="/upload">Upload New Resume</a>
        </Button>
      </div>
    </div>
  )
}
