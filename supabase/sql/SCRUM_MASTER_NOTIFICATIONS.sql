-- ============================================
-- SCRUM MASTER & NOTIFICATIONS - DATABASE MIGRATION
-- ============================================
-- Run this script in Supabase SQL Editor
-- ============================================

-- Add is_scrum_master flag to profiles (only one admin can be scrum master)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_scrum_master BOOLEAN DEFAULT false;

-- Create notifications table for task assignment notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('task_assigned', 'task_updated', 'project_created')),
    title TEXT NOT NULL,
    message TEXT,
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can create notifications" ON notifications;

-- Policy: Users can view their own notifications
CREATE POLICY "Users can view own notifications" 
    ON notifications FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" 
    ON notifications FOR UPDATE 
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: Admins can create notifications
CREATE POLICY "Admins can create notifications" 
    ON notifications FOR INSERT 
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Admins can delete notifications (cleanup)
CREATE POLICY "Admins can delete notifications" 
    ON notifications FOR DELETE 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- Verification queries
-- ============================================
SELECT 'Migration complete! Checking new column:' as message;
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'is_scrum_master';

SELECT 'Notifications table created:' as message;
SELECT table_name FROM information_schema.tables WHERE table_name = 'notifications';
