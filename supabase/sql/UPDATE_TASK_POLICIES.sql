-- ============================================
-- UPDATE RLS POLICIES FOR TASK ASSIGNMENT
-- ============================================
-- This allows assigned admins to update their own tasks
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop the existing "Admins can update tasks" policy
DROP POLICY IF EXISTS "Admins can update tasks" ON tasks;
DROP POLICY IF EXISTS "Assigned admins can update tasks" ON tasks;

-- Create new policy: Allow all admins to update any task
-- AND allow assigned users to update their own tasks
CREATE POLICY "Admins and assigned users can update tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (
    -- User is an admin (can update any task)
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
    OR
    -- User is assigned to this task (can only update their own tasks)
    (assigned_to = auth.uid())
  )
  WITH CHECK (
    -- Same conditions for the updated row
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
    OR
    (assigned_to = auth.uid())
  );

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'tasks' AND policyname = 'Admins and assigned users can update tasks';
