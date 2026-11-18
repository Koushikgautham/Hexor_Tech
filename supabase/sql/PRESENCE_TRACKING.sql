-- ============================================
-- PRESENCE TRACKING - DATABASE MIGRATION
-- ============================================
-- Adds online presence tracking fields to profiles table
-- Run this script in Supabase SQL Editor
-- ============================================

-- Add last_seen timestamp column
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ DEFAULT NULL;

-- Add is_online boolean column
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;

-- Create an index on last_seen for efficient querying
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON profiles(last_seen);

-- Create an index on is_online for filtering
CREATE INDEX IF NOT EXISTS idx_profiles_is_online ON profiles(is_online);

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Presence tracking columns added successfully!' as message;
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name IN ('last_seen', 'is_online');
