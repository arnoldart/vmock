"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { GoogleIcon } from "@/components/icons/google-icon"
import { LinkedinIcon } from "@/components/icons/linkedin-icon"
import { useRouter } from "next/navigation"

export function AuthSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      if (response.ok) {
        // Auto sign in after signup
        await signIn('credentials', { email, password, callbackUrl: '/' })
      } else {
        const data = await response.json()
        setError(data.message || 'Something went wrong')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/upload')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleGoogleAuth = () => {
    setIsLoading(true)
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleLinkedInAuth = () => {
    setIsLoading(true)
    // Simulate LinkedIn OAuth
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">Get Started</CardTitle>
          <CardDescription>Create your account to start analyzing your resume</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input name="name" id="name" placeholder="Enter your full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input name="password" id="password" type="password" placeholder="Create a password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input name="email" id="signin-email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input name="password" id="signin-password" type="password" placeholder="Enter your password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Separator className="my-4" />
            <p className="text-center text-sm text-muted-foreground mb-4">Or continue with</p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <GoogleIcon className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleLinkedInAuth}
                disabled={isLoading}
              >
                <LinkedinIcon className="w-4 h-4 mr-2" />
                Continue with LinkedIn
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
