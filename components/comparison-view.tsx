"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { ResumeAnalysis } from "@/lib/ai-analysis"
import { ArrowUpIcon } from "@/components/icons/arrow-up-icon"
import { ArrowDownIcon } from "@/components/icons/arrow-down-icon"

interface ComparisonViewProps {
  analysis1: ResumeAnalysis
  analysis2: ResumeAnalysis
  onBack: () => void
}

export function ComparisonView({ analysis1, analysis2, onBack }: ComparisonViewProps) {
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

  const getComparisonIndicator = (score1: number, score2: number) => {
    const diff = score1 - score2
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
    return <div className="text-muted-foreground text-sm">Same</div>
  }

  // Determine which is newer based on upload date
  const newer = new Date(analysis1.uploadDate) > new Date(analysis2.uploadDate) ? analysis1 : analysis2
  const older = newer === analysis1 ? analysis2 : analysis1

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">Resume Comparison</h1>
          <p className="text-lg text-muted-foreground">Compare performance between two resume versions</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to History
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif">Overall Score Comparison</CardTitle>
          <CardDescription>Side-by-side performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {newer === analysis1 ? "Newer" : "Older"}
                </Badge>
                <h3 className="font-semibold text-lg">{analysis1.fileName}</h3>
                <p className="text-sm text-muted-foreground">{new Date(analysis1.uploadDate).toLocaleDateString()}</p>
              </div>
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreBgColor(
                  analysis1.overallScore,
                )}`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(analysis1.overallScore)}`}>
                    {analysis1.overallScore}
                  </div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {newer === analysis2 ? "Newer" : "Older"}
                </Badge>
                <h3 className="font-semibold text-lg">{analysis2.fileName}</h3>
                <p className="text-sm text-muted-foreground">{new Date(analysis2.uploadDate).toLocaleDateString()}</p>
              </div>
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreBgColor(
                  analysis2.overallScore,
                )}`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(analysis2.overallScore)}`}>
                    {analysis2.overallScore}
                  </div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="text-lg font-semibold">
              Improvement: {getComparisonIndicator(newer.overallScore, older.overallScore)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Category Breakdown</CardTitle>
          <CardDescription>Detailed comparison across all scoring categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Impact</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{analysis1.fileName}</span>
                    <span className={`font-bold ${getScoreColor(analysis1.scores.impact)}`}>
                      {analysis1.scores.impact}
                    </span>
                  </div>
                  <Progress value={analysis1.scores.impact} className="h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{analysis2.fileName}</span>
                    <span className={`font-bold ${getScoreColor(analysis2.scores.impact)}`}>
                      {analysis2.scores.impact}
                    </span>
                  </div>
                  <Progress value={analysis2.scores.impact} className="h-3" />
                </div>
              </div>
              <div className="text-center mt-2">
                {getComparisonIndicator(analysis1.scores.impact, analysis2.scores.impact)}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Presentation</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{analysis1.fileName}</span>
                    <span className={`font-bold ${getScoreColor(analysis1.scores.presentation)}`}>
                      {analysis1.scores.presentation}
                    </span>
                  </div>
                  <Progress value={analysis1.scores.presentation} className="h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{analysis2.fileName}</span>
                    <span className={`font-bold ${getScoreColor(analysis2.scores.presentation)}`}>
                      {analysis2.scores.presentation}
                    </span>
                  </div>
                  <Progress value={analysis2.scores.presentation} className="h-3" />
                </div>
              </div>
              <div className="text-center mt-2">
                {getComparisonIndicator(analysis1.scores.presentation, analysis2.scores.presentation)}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Competencies</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{analysis1.fileName}</span>
                    <span className={`font-bold ${getScoreColor(analysis1.scores.competencies)}`}>
                      {analysis1.scores.competencies}
                    </span>
                  </div>
                  <Progress value={analysis1.scores.competencies} className="h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{analysis2.fileName}</span>
                    <span className={`font-bold ${getScoreColor(analysis2.scores.competencies)}`}>
                      {analysis2.scores.competencies}
                    </span>
                  </div>
                  <Progress value={analysis2.scores.competencies} className="h-3" />
                </div>
              </div>
              <div className="text-center mt-2">
                {getComparisonIndicator(analysis1.scores.competencies, analysis2.scores.competencies)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Key Insights</CardTitle>
          <CardDescription>What changed between these versions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Improvements Made</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Overall score improved by {newer.overallScore - older.overallScore} points</li>
                <li>• Impact score increased by {newer.scores.impact - older.scores.impact} points</li>
                <li>• Better quantification of achievements</li>
                <li>• Enhanced keyword optimization</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Areas Still Needing Work</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ATS compatibility could be further improved</li>
                <li>• Consider adding more industry-specific keywords</li>
                <li>• Presentation formatting has room for enhancement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <a href="/upload">Upload New Version</a>
        </Button>
        <Button variant="outline" size="lg" onClick={onBack}>
          Back to History
        </Button>
      </div>
    </div>
  )
}
