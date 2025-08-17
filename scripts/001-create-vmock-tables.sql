-- Create VMock platform tables
-- Creating users table for VMock platform
CREATE TABLE IF NOT EXISTS vmock_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    provider VARCHAR(50) DEFAULT 'email', -- email, google, linkedin
    provider_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating resumes table to store uploaded files
CREATE TABLE IF NOT EXISTS resumes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES vmock_users(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_path VARCHAR(500),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'uploaded' -- uploaded, processing, analyzed, error
);

-- Creating analysis_results table to store AI analysis data
CREATE TABLE IF NOT EXISTS analysis_results (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES vmock_users(id) ON DELETE CASCADE,
    overall_score INTEGER NOT NULL,
    impact_score INTEGER NOT NULL,
    presentation_score INTEGER NOT NULL,
    competencies_score INTEGER NOT NULL,
    ats_score INTEGER NOT NULL,
    analysis_data JSONB NOT NULL, -- Store detailed feedback as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating user_sessions table for authentication
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES vmock_users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vmock_users_email ON vmock_users(email);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_user_id ON analysis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_resume_id ON analysis_results(resume_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
