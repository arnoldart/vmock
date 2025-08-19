# VMock - AI-Powered Resume Analysis Platform

**English** | [Bahasa Indonesia](README-id.md)

VMock is a comprehensive resume analysis platform that leverages artificial intelligence to provide instant, personalized feedback on resumes. The platform helps job seekers optimize their CVs for impact, presentation, competencies, and ATS (Applicant Tracking System) compatibility.

## 🚀 Features

- **Instant AI Analysis**: Get comprehensive resume feedback in under 90 seconds
- **ATS Optimization**: Ensure your resume passes through Applicant Tracking Systems
- **Detailed Feedback**: Receive line-by-line suggestions across multiple categories:
  - Impact (quantified achievements, results, measurable outcomes)
  - Presentation (formatting, structure, readability, organization)
  - Competencies (relevant skills, experience alignment, industry keywords)
- **File Support**: Upload resumes in PDF
- **User Authentication**: Secure login/signup system with NextAuth
- **History Tracking**: Keep track of all your resume analyses
- **Interactive Dashboard**: Visual feedback with charts and detailed breakdowns
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.2.4** - React framework for production
- **React 19** - Latest version of React
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Headless UI components library
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Backend & Database
- **Neon Database** - Serverless PostgreSQL database
- **NextAuth.js** - Authentication for Next.js
- **bcryptjs** - Password hashing

### AI & Document Processing
- **Google Gemini AI** - AI-powered resume analysis
- **ConvertAPI** - Document conversion and text extraction

### UI Components
- **shadcn/ui** - Re-usable components built using Radix UI and Tailwind CSS
- **Recharts** - Recharts for data visualization
- **Sonner** - Toast notifications
- **Next Themes** - Theme switching

### Development Tools
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
vmock/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── analysis/      # Resume analysis endpoints
│   │   ├── analyze/       # Analysis processing
│   │   ├── auth/          # Authentication endpoints
│   │   └── user/          # User-related endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── history/           # Analysis history
│   ├── upload/            # Resume upload page
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── icons/            # Custom icon components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and configurations
│   ├── ai-analysis.ts    # AI analysis logic
│   ├── database.ts       # Database connection
│   ├── resume-parser.ts  # Resume parsing utilities
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── scripts/              # Database scripts
├── styles/               # Global styles
└── public/               # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- A Neon Database account
- Google Gemini API key
- ConvertAPI key (for document processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arnoldart/vmock.git
   cd vmock
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env-sample .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   DATABASE_URL=your_neon_database_url
   GEMINI_API_KEY=your_gemini_api_key
   CONVERT_API_KEY=your_convert_api_key
   ```

4. **Set up the database**
   ```bash
   # Run the database migration script
   # Execute the SQL script in scripts/001-create-vmock-tables.sql
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 How It Works

1. **Upload Resume**: Users upload their resume in PDF or DOCX format
2. **AI Processing**: The system extracts text and sends it to Google Gemini AI for analysis
3. **Analysis Generation**: AI analyzes the resume across multiple dimensions:
   - Overall score calculation
   - Category-specific scores (Impact, Presentation, Competencies)
   - ATS compatibility assessment
   - Line-by-line feedback
   - Actionable recommendations
4. **Results Display**: Users receive a comprehensive dashboard with:
   - Visual score breakdowns
   - Detailed feedback sections
   - Specific improvement suggestions
   - ATS optimization tips

## 🎯 Core Analysis Categories

### Impact (0-100)
- Quantified achievements and results
- Measurable outcomes and metrics
- Action-oriented language

### Presentation (0-100)
- Formatting and structure
- Readability and organization
- Visual appeal and consistency

### Competencies (0-100)
- Relevant skills alignment
- Industry keyword optimization
- Experience progression

### ATS Compatibility (0-100)
- Keyword optimization
- Standard formatting compliance
- Section header recognition

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙋‍♂️ Support

If you have any questions or need help getting started, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## 🌟 Acknowledgments

- Google Gemini AI for powerful resume analysis capabilities
- Neon Database for reliable serverless PostgreSQL
- Radix UI for accessible component primitives
- The open-source community for amazing tools and libraries

---
