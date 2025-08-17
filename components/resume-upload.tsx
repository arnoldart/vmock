"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface UploadState {
  file: File | null
  uploading: boolean
  analyzing: boolean
  progress: number
  error: string | null
  success: boolean
  analysisId?: string
}

export function ResumeUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploading: false,
    analyzing: false,
    progress: 0,
    error: null,
    success: false,
  })

  const [dragActive, setDragActive] = useState(false)

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

    if (!allowedTypes.includes(file.type)) {
      return "Please upload a PDF or DOCX file only."
    }

    if (file.size > maxSize) {
      return "File size must be less than 5MB."
    }

    return null
  }

  const handleFile = useCallback((file: File) => {
    const error = validateFile(file)
    if (error) {
      setUploadState((prev) => ({ ...prev, error, file: null }))
      return
    }

    setUploadState((prev) => ({
      ...prev,
      file,
      error: null,
      success: false,
    }))
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0])
      }
    },
    [handleFile],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0])
      }
    },
    [handleFile],
  )

  const analyzeResume = async () => {
    if (!uploadState.file) return

    setUploadState((prev) => ({ ...prev, uploading: true, progress: 0, error: null }))

    try {
      const formData = new FormData()
      formData.append("file", uploadState.file)

      // Simulate upload progress
      for (let i = 0; i <= 30; i += 5) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setUploadState((prev) => ({ ...prev, progress: i }))
      }

      setUploadState((prev) => ({ ...prev, uploading: false, analyzing: true }))

      // Call the analysis API
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const result = await response.json()

      // Simulate analysis progress
      for (let i = 30; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setUploadState((prev) => ({ ...prev, progress: i }))
      }

      setUploadState((prev) => ({
        ...prev,
        analyzing: false,
        success: true,
        progress: 100,
        analysisId: result.analysis.id,
      }))

      // Store analysis result in sessionStorage for dashboard
      sessionStorage.setItem("currentAnalysis", JSON.stringify(result.analysis))

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } catch (error) {
      console.error("Analysis error:", error)
      setUploadState((prev) => ({
        ...prev,
        uploading: false,
        analyzing: false,
        error: error instanceof Error ? error.message : "Analysis failed. Please try again.",
        progress: 0,
      }))
    }
  }

  const resetUpload = () => {
    setUploadState({
      file: null,
      uploading: false,
      analyzing: false,
      progress: 0,
      error: null,
      success: false,
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type === "application/pdf") {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      )
    }
    return (
      <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif">Resume Analysis</CardTitle>
          <CardDescription>
            Upload your resume to get detailed feedback on impact, presentation, and competencies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadState.file && !uploadState.uploading && !uploadState.analyzing && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Drop your resume here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse files</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge variant="secondary">PDF</Badge>
                    <Badge variant="secondary">DOCX</Badge>
                    <Badge variant="secondary">Max 5MB</Badge>
                  </div>
                </div>
                <input type="file" accept=".pdf,.docx" onChange={handleFileInput} className="hidden" id="file-upload" />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            </div>
          )}

          {uploadState.file && !uploadState.uploading && !uploadState.analyzing && !uploadState.success && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                {getFileIcon(uploadState.file.type)}
                <div className="flex-1">
                  <p className="font-medium">{uploadState.file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(uploadState.file.size)}</p>
                </div>
                <Button variant="outline" size="sm" onClick={resetUpload}>
                  Remove
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button onClick={analyzeResume} className="flex-1">
                  Analyze Resume
                </Button>
                <Button variant="outline" onClick={resetUpload}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {(uploadState.uploading || uploadState.analyzing) && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                {uploadState.file && getFileIcon(uploadState.file.type)}
                <div className="flex-1">
                  <p className="font-medium">{uploadState.file?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {uploadState.uploading ? "Uploading..." : "Analyzing with AI..."}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{uploadState.uploading ? "Uploading" : "Analyzing"}</span>
                  <span>{uploadState.progress}%</span>
                </div>
                <Progress value={uploadState.progress} className="w-full" />
              </div>
              {uploadState.analyzing && (
                <div className="text-center text-sm text-muted-foreground">
                  Our AI is analyzing your resume for impact, presentation, and competencies...
                </div>
              )}
            </div>
          )}

          {uploadState.success && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Analysis Complete!</h3>
                <p className="text-muted-foreground">Redirecting to your personalized feedback dashboard...</p>
              </div>
            </div>
          )}

          {uploadState.error && (
            <Alert variant="destructive">
              <AlertDescription>{uploadState.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">What We Analyze</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Impact</p>
                <p className="text-sm text-muted-foreground">Quantified achievements and strong action verbs</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Presentation</p>
                <p className="text-sm text-muted-foreground">Layout, formatting, and ATS compatibility</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Competencies</p>
                <p className="text-sm text-muted-foreground">Skills alignment and keyword optimization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Encrypted Storage</p>
                <p className="text-sm text-muted-foreground">Your data is encrypted at rest and in transit</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">No Data Sharing</p>
                <p className="text-sm text-muted-foreground">We never share your resume with third parties</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Secure Analysis</p>
                <p className="text-sm text-muted-foreground">Analysis happens in secure, isolated environments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
