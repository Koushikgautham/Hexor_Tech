-- ============================================
-- PROJECT DOCUMENTS & GOOGLE SHEETS - DATABASE MIGRATION
-- ============================================
-- Run this script in Supabase SQL Editor
-- ALSO: Create a storage bucket named "project-documents" in Supabase Storage
-- ============================================

-- Project documents table for file uploads
CREATE TABLE IF NOT EXISTS project_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google Sheets links table
CREATE TABLE IF NOT EXISTS project_sheets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    sheet_url TEXT NOT NULL,
    description TEXT,
    added_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sheets ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR PROJECT DOCUMENTS
-- ============================================
DROP POLICY IF EXISTS "Admins can view project documents" ON project_documents;
DROP POLICY IF EXISTS "Admins can upload documents" ON project_documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON project_documents;

CREATE POLICY "Admins can view project documents"
    ON project_documents FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can upload documents"
    ON project_documents FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete documents"
    ON project_documents FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- RLS POLICIES FOR PROJECT SHEETS
-- ============================================
DROP POLICY IF EXISTS "Admins can view project sheets" ON project_sheets;
DROP POLICY IF EXISTS "Admins can add sheets" ON project_sheets;
DROP POLICY IF EXISTS "Admins can update sheets" ON project_sheets;
DROP POLICY IF EXISTS "Admins can delete sheets" ON project_sheets;

CREATE POLICY "Admins can view project sheets"
    ON project_sheets FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can add sheets"
    ON project_sheets FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update sheets"
    ON project_sheets FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete sheets"
    ON project_sheets FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_project_documents_project_id ON project_documents(project_id);
CREATE INDEX IF NOT EXISTS idx_project_sheets_project_id ON project_sheets(project_id);

-- ============================================
-- Verification
-- ============================================
SELECT 'Migration complete! Tables created:' as message;
SELECT table_name FROM information_schema.tables 
WHERE table_name IN ('project_documents', 'project_sheets');
