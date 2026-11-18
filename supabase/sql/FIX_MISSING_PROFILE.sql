-- Quick fix: Check if your user has a profile and create one if missing
-- Run this in Supabase SQL Editor

-- 1. First, let's see all users and their profiles
SELECT 
  u.id,
  u.email,
  u.created_at as user_created,
  p.id as profile_id,
  p.role,
  p.is_active
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- 2. If you see a user with NULL profile_id, that's your problem!
-- Find users without profiles:
SELECT u.id, u.email
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- 3. Create profiles for any users that don't have them:
INSERT INTO profiles (id, email, full_name, role, is_active)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
  'user',
  true
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 4. Make your user an admin (replace with your actual email):
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'abishekpechiappan@gmail.com';

-- 5. Verify everything is set up:
SELECT 
  u.id,
  u.email,
  p.full_name,
  p.role,
  p.is_active
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE u.email = 'abishekpechiappan@gmail.com';
