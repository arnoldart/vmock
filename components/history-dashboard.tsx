"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ComparisonView } from "@/components/comparison-view"
import type { ResumeAnalysis } from "@/lib/ai-analysis"
import { ArrowUpIcon } from "@/components/icons/arrow-up-icon"
import { ArrowDownIcon } from "@/components/icons/arrow-down-icon"


// Mock history data for demonstration - will be replaced with API call
export function HistoryDashboard() {
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [mockHistory, setMockHistory] = useState<ResumeAnalysis[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch real data from API (commented out for now, using mock data)
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/user/history')
        if (response.ok) {
          const data = await response.json()
          // Transform API data to match ResumeAnalysis interface
          const transformedData: ResumeAnalysis[] = data.history.map((item: any) => ({
            id: item.id.toString(),
            fileName: item.filename,
            uploadDate: item.uploadDate,
            overallScore: item.overallScore,
            categoryScores: item.categoryScores,
            scores: item.categoryScores,
            atsScore: item.atsScore,
            feedback: item.analysisData?.feedback || {},
            lineByLineFeedback: item.analysisData?.lineByLineFeedback || [],
            atsCompatibility: item.analysisData?.atsCompatibility || { score: item.atsScore, issues: [], recommendations: [] },
            recommendations: item.analysisData?.recommendations || [],
          }))
          setMockHistory(transformedData)
          console.log(transformedData)
        }

      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

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
          <ArrowUpIcon className="w-4 h-4 mr-1" />+{diff}
        </div>
      )
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDownIcon className="w-4 h-4 mr-1" />
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">Resume History</h1>
          <p className="text-lg text-muted-foreground">Loading your analysis history...</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (mockHistory.length === 0) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">Resume History</h1>
          <p className="text-lg text-muted-foreground">No analysis history found</p>
        </div>
        <div className="text-center">
          <Button size="lg" asChild>
            <a href="/upload">Upload Your First Resume</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">Resume History</h1>
        <p className="text-lg text-muted-foreground">Track your progress and compare different versions</p>
      </div>

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
                +{mockHistory.length > 1 ? mockHistory[0].overallScore - mockHistory[mockHistory.length - 1].overallScore : 0}
              </div>
              <div className="text-sm text-muted-foreground">Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">{mockHistory.length > 0 ? mockHistory[0].overallScore : 0}</div>
              <div className="text-sm text-muted-foreground">Latest Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {mockHistory.length > 0 ? Math.round(mockHistory.reduce((sum, analysis) => sum + analysis.overallScore, 0) / mockHistory.length) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

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

      <div className="flex justify-center">
        <Button size="lg" asChild>
          <a href="/upload">Upload New Resume</a>
        </Button>
      </div>
    </div>
  )
}
