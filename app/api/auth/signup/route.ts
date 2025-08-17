import { NextResponse } from 'next/server'
import { createUserWithPassword, getUserByEmail } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Create user
    const user = await createUserWithPassword(email, password, name)
    
    return NextResponse.json({ message: 'User created successfully', userId: user.id })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}