import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface VMockUser {
  id: number
  email: string
  full_name?: string
  provider: string
  created_at: string
}

export interface Resume {
  id: number
  user_id: number
  filename: string
  original_filename: string
  file_size: number
  file_type: string
  upload_date: string
  status: string
}

export interface AnalysisResult {
  id: number
  resume_id: number
  user_id: number
  overall_score: number
  impact_score: number
  presentation_score: number
  competencies_score: number
  ats_score: number
  analysis_data: any
  created_at: string
}

export async function createUser(email: string, fullName?: string, provider = "email") {
  const result = await sql`
    INSERT INTO vmock_users (email, full_name, provider)
    VALUES (${email}, ${fullName}, ${provider})
    RETURNING *
  `
  return result[0] as VMockUser
}

export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM vmock_users WHERE email = ${email}
  `
  return result[0] as VMockUser | undefined
}

export async function getUserById(id: number) {
  const result = await sql`
    SELECT * FROM vmock_users WHERE id = ${id}
  `
  return result[0] as VMockUser | undefined
}

export async function createResume(
  userId: number,
  filename: string,
  originalFilename: string,
  fileSize: number,
  fileType: string,
) {
  const result = await sql`
    INSERT INTO resumes (user_id, filename, original_filename, file_size, file_type)
    VALUES (${userId}, ${filename}, ${originalFilename}, ${fileSize}, ${fileType})
    RETURNING *
  `
  return result[0] as Resume
}

export async function getResumesByUserId(userId: number) {
  const result = await sql`
    SELECT * FROM resumes WHERE user_id = ${userId} ORDER BY upload_date DESC
  `
  return result as Resume[]
}

export async function updateResumeStatus(resumeId: number, status: string) {
  await sql`
    UPDATE resumes SET status = ${status} WHERE id = ${resumeId}
  `
}

export async function createAnalysisResult(
  resumeId: number,
  userId: number,
  overallScore: number,
  impactScore: number,
  presentationScore: number,
  competenciesScore: number,
  atsScore: number,
  analysisData: any,
) {
  const result = await sql`
    INSERT INTO analysis_results (
      resume_id, user_id, overall_score, impact_score, 
      presentation_score, competencies_score, ats_score, analysis_data
    )
    VALUES (
      ${resumeId}, ${userId}, ${overallScore}, ${impactScore},
      ${presentationScore}, ${competenciesScore}, ${atsScore}, ${JSON.stringify(analysisData)}
    )
    RETURNING *
  `
  return result[0] as AnalysisResult
}

export async function getAnalysisResultsByUserId(userId: number) {
  const result = await sql`
    SELECT ar.*, r.original_filename, r.upload_date
    FROM analysis_results ar
    JOIN resumes r ON ar.resume_id = r.id
    WHERE ar.user_id = ${userId}
    ORDER BY ar.created_at DESC
  `
  return result as (AnalysisResult & { original_filename: string; upload_date: string })[]
}

export async function getAnalysisResultById(id: number) {
  const result = await sql`
    SELECT ar.*, r.original_filename, r.upload_date
    FROM analysis_results ar
    JOIN resumes r ON ar.resume_id = r.id
    WHERE ar.id = ${id}
  `
  return result[0] as (AnalysisResult & { original_filename: string; upload_date: string }) | undefined
}

export async function createSession(userId: number, sessionToken: string, expiresAt: Date) {
  await sql`
    INSERT INTO user_sessions (user_id, session_token, expires_at)
    VALUES (${userId}, ${sessionToken}, ${expiresAt.toISOString()})
  `
}

export async function getSessionByToken(sessionToken: string) {
  const result = await sql`
    SELECT us.*, u.email, u.full_name
    FROM user_sessions us
    JOIN vmock_users u ON us.user_id = u.id
    WHERE us.session_token = ${sessionToken} AND us.expires_at > NOW()
  `
  return result[0] as any | undefined
}

export async function deleteSession(sessionToken: string) {
  await sql`
    DELETE FROM user_sessions WHERE session_token = ${sessionToken}
  `
}
