-- CLIENT DASHBOARD SCHEMA
-- This schema enables client access to their assigned projects, invoices, and contacts.

-- ============================================
-- TABLE: project_clients
-- Links projects to client users (many-to-many)
-- ============================================
CREATE TABLE project_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, client_id)
);

-- Enable RLS
ALTER TABLE project_clients ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can view all project_clients"
  ON project_clients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can create project_clients"
  ON project_clients FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete project_clients"
  ON project_clients FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients can view their own links
CREATE POLICY "Clients can view their own project links"
  ON project_clients FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

-- ============================================
-- TABLE: project_invoices
-- Stores invoices uploaded by admins
-- ============================================
CREATE TABLE project_invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_invoices ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can view all invoices"
  ON project_invoices FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can create invoices"
  ON project_invoices FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update invoices"
  ON project_invoices FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete invoices"
  ON project_invoices FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients can view invoices for their linked projects
CREATE POLICY "Clients can view their project invoices"
  ON project_invoices FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_clients
      WHERE project_clients.project_id = project_invoices.project_id
      AND project_clients.client_id = auth.uid()
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_project_invoices_updated_at
  BEFORE UPDATE ON project_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLE: project_contacts
-- Points of contact for each project
-- ============================================
CREATE TABLE project_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_contacts ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can view all contacts"
  ON project_contacts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can create contacts"
  ON project_contacts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update contacts"
  ON project_contacts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete contacts"
  ON project_contacts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients can view contacts for their linked projects
CREATE POLICY "Clients can view their project contacts"
  ON project_contacts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_clients
      WHERE project_clients.project_id = project_contacts.project_id
      AND project_clients.client_id = auth.uid()
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_project_contacts_updated_at
  BEFORE UPDATE ON project_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ADDITIONAL POLICIES FOR EXISTING TABLES
-- Allow clients to view their linked projects
-- ============================================

-- Clients can view projects they're linked to
CREATE POLICY "Clients can view their linked projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_clients
      WHERE project_clients.project_id = projects.id
      AND project_clients.client_id = auth.uid()
    )
  );

-- Clients can view tasks for their linked projects
CREATE POLICY "Clients can view tasks for their projects"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_clients
      WHERE project_clients.project_id = tasks.project_id
      AND project_clients.client_id = auth.uid()
    )
  );

-- Clients can view milestones for their linked projects
CREATE POLICY "Clients can view milestones for their projects"
  ON milestones FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_clients
      WHERE project_clients.project_id = milestones.project_id
      AND project_clients.client_id = auth.uid()
    )
  );

-- Clients can view documents for their linked projects
CREATE POLICY "Clients can view documents for their projects"
  ON project_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_clients
      WHERE project_clients.project_id = project_documents.project_id
      AND project_clients.client_id = auth.uid()
    )
  );
