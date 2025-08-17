// Utility functions for parsing resume content
export interface ParsedResume {
  sections: {
    contact: ContactInfo
    experience: WorkExperience[]
    education: Education[]
    skills: string[]
    summary?: string
  }
  rawText: string
  wordCount: number
}

export interface ContactInfo {
  name?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string[]
  location?: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  graduationDate: string
  gpa?: string
}

export async function parseResumeContent(file: File): Promise<ParsedResume> {
  // Simulate parsing process
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real implementation, this would use libraries like:
  // - pdf-parse for PDF files
  // - mammoth for DOCX files
  // - Natural language processing for content extraction

  const mockParsedResume: ParsedResume = {
    sections: {
      contact: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/johndoe",
      },
      experience: [
        {
          company: "Tech Corp",
          position: "Senior Software Engineer",
          startDate: "2022-01",
          endDate: "Present",
          description: [
            "Led development of microservices architecture serving 1M+ users",
            "Improved system performance by 40% through optimization",
            "Mentored 3 junior developers and conducted code reviews",
          ],
          location: "San Francisco, CA",
        },
        {
          company: "StartupXYZ",
          position: "Full Stack Developer",
          startDate: "2020-06",
          endDate: "2021-12",
          description: [
            "Built responsive web applications using React and Node.js",
            "Collaborated with design team to implement user interfaces",
            "Participated in agile development processes",
          ],
          location: "Remote",
        },
      ],
      education: [
        {
          institution: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          graduationDate: "2020-05",
          gpa: "3.7",
        },
      ],
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "PostgreSQL",
        "Git",
        "Agile/Scrum",
      ],
      summary:
        "Experienced software engineer with 4+ years developing scalable web applications and leading cross-functional teams.",
    },
    rawText: "Mock extracted text content from resume...",
    wordCount: 250,
  }

  return mockParsedResume
}
