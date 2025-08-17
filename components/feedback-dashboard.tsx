"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { ResumeAnalysis } from "@/lib/ai-analysis"

export function FeedbackDashboard() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get analysis from sessionStorage (set during upload)
    const storedAnalysis = sessionStorage.getItem("currentAnalysis")
    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your analysis...</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert>
          <AlertDescription>
            No analysis found. Please{" "}
            <a href="/upload" className="text-primary hover:underline">
              upload a resume
            </a>{" "}
            to get started.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

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

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">Your Resume Analysis</h1>
        <p className="text-lg text-muted-foreground mb-2">Analysis for: {analysis.fileName}</p>
        <p className="text-sm text-muted-foreground">
          Analyzed on {new Date(analysis.uploadDate).toLocaleDateString()}
        </p>
      </div>

      {/* Overall Score Section */}
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-serif">Overall Score</CardTitle>
          <CardDescription>Your resume's overall performance across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center ${getScoreBgColor(
                analysis.overallScore,
              )}`}
            >
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}
                </div>
                <div className="text-sm text-muted-foreground">out of 100</div>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mb-2">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.scores.impact)}`}>
                  {analysis.scores.impact}
                </div>
                <div className="text-sm font-medium">Impact</div>
              </div>
              <Progress value={analysis.scores.impact} className="h-2" />
            </div>
            <div className="text-center">
              <div className="mb-2">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.scores.presentation)}`}>
                  {analysis.scores.presentation}
                </div>
                <div className="text-sm font-medium">Presentation</div>
              </div>
              <Progress value={analysis.scores.presentation} className="h-2" />
            </div>
            <div className="text-center">
              <div className="mb-2">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.scores.competencies)}`}>
                  {analysis.scores.competencies}
                </div>
                <div className="text-sm font-medium">Competencies</div>
              </div>
              <Progress value={analysis.scores.competencies} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Feedback Tabs */}
      <Tabs defaultValue="impact" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="presentation">Presentation</TabsTrigger>
          <TabsTrigger value="competencies">Competencies</TabsTrigger>
          <TabsTrigger value="line-by-line">Line-by-Line</TabsTrigger>
        </TabsList>

        {/* Impact Tab */}
        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between font-serif">
                Impact Analysis
                <Badge variant="secondary" className={getScoreColor(analysis.scores.impact)}>
                  {analysis.scores.impact}/100
                </Badge>
              </CardTitle>
              <CardDescription>{analysis.feedback.impact.details}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysis.feedback.impact.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysis.feedback.impact.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Presentation Tab */}
        <TabsContent value="presentation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between font-serif">
                Presentation Analysis
                <Badge variant="secondary" className={getScoreColor(analysis.scores.presentation)}>
                  {analysis.scores.presentation}/100
                </Badge>
              </CardTitle>
              <CardDescription>{analysis.feedback.presentation.details}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysis.feedback.presentation.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysis.feedback.presentation.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competencies Tab */}
        <TabsContent value="competencies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between font-serif">
                Competencies Analysis
                <Badge variant="secondary" className={getScoreColor(analysis.scores.competencies)}>
                  {analysis.scores.competencies}/100
                </Badge>
              </CardTitle>
              <CardDescription>{analysis.feedback.competencies.details}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysis.feedback.competencies.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysis.feedback.competencies.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Line-by-Line Tab */}
        <TabsContent value="line-by-line">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Line-by-Line Feedback</CardTitle>
              <CardDescription>Detailed suggestions for specific sections of your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analysis.lineByLineFeedback.map((feedback, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{feedback.section}</Badge>
                      <Badge className={getSeverityColor(feedback.severity)}>{feedback.severity} priority</Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h5 className="font-medium text-sm text-muted-foreground mb-1">Original:</h5>
                        <p className="text-sm bg-red-50 p-2 rounded border-l-4 border-red-200">
                          {feedback.originalText}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-muted-foreground mb-1">Feedback:</h5>
                        <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-muted-foreground mb-1">Suggested Improvement:</h5>
                        <p className="text-sm bg-green-50 p-2 rounded border-l-4 border-green-200">
                          {feedback.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ATS Compatibility & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ATS Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-serif">
              ATS Compatibility
              <Badge variant="secondary" className={getScoreColor(analysis.atsCompatibility.score)}>
                {analysis.atsCompatibility.score}/100
              </Badge>
            </CardTitle>
            <CardDescription>How well your resume works with Applicant Tracking Systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={analysis.atsCompatibility.score} className="h-3" />
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">Issues Found:</h4>
              <ul className="space-y-1">
                {analysis.atsCompatibility.issues.map((issue, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Recommendations:</h4>
              <ul className="space-y-1">
                {analysis.atsCompatibility.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Overall Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Key Recommendations</CardTitle>
            <CardDescription>Priority actions to improve your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{recommendation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <a href="/upload">Analyze Another Resume</a>
        </Button>
        <Button variant="outline" size="lg">
          Download Report
        </Button>
        <Button variant="outline" size="lg">
          Share Results
        </Button>
      </div>
    </div>
  )
}
