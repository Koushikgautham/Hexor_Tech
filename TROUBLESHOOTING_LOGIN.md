# Troubleshooting Login Issues

## Common Causes & Solutions

### 1. **Profile Table Not Created**
**Symptom:** Login button shows "loading" forever, no error message

**Solution:** Run the database schema in Supabase
1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `PROJECTS_SCHEMA.sql` OR the SQL below
3. Click "Run"

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Policy: Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can update all profiles
CREATE POLICY "Admins can update all profiles" 
  ON profiles FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Allow inserting new profiles
CREATE POLICY "Enable insert for authenticated users only" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);
```

### 2. **No Profile Created for User**
**Symptom:** Can't login after signup, profile fetch fails

**Solution:** 
1. First, sign up at `/auth/signup`
2. Then in Supabase SQL Editor, run:
```sql
-- Check if your profile exists
SELECT * FROM profiles WHERE email = 'your-email@example.com';

-- If it doesn't exist, the signup didn't create it
-- This means the auth trigger isn't set up
```

3. If profile doesn't exist, create it manually:
```sql
-- Get your user ID first
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then insert profile (replace the UUID with your user ID from above)
INSERT INTO profiles (id, email, full_name, role, is_active)
VALUES (
  'your-user-id-here',
  'your-email@example.com',
  'Your Name',
  'admin',
  true
);
```

### 3. **Check Database Setup**
Visit `http://localhost:3000/debug` to see:
- Supabase connection status
- Whether profiles table exists
- Whether projects table exists
- Current session info

### 4. **Environment Variables Not Set**
**Symptom:** Nothing happens, or "Supabase not configured" error

**Solution:** Check `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

After adding/changing env vars, restart dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### 5. **RLS Policies Blocking Access**
**Symptom:** Login works but dashboard shows errors

**Solution:** Check RLS policies in Supabase:
1. Go to Database → Tables → profiles
2. Check "Policies" tab
3. Make sure the policies from step 1 are there

### 6. **Browser Console Errors**
Open browser DevTools (F12) and check Console tab for errors like:
- "relation 'profiles' does not exist" → Run the SQL from step 1
- "Profile not found" → Run the SQL from step 2
- Network errors → Check Supabase URL/keys

## Quick Test Steps

1. **Visit Debug Page:**
   ```
   http://localhost:3000/debug
   ```
   Click "Test Connection" and check results

2. **Try Signup:**
   ```
   http://localhost:3000/auth/signup
   ```
   Create a new account

3. **Make User Admin:**
   In Supabase SQL Editor:
   ```sql
   UPDATE profiles 
   SET role = 'admin' 
   WHERE email = 'your-email@example.com';
   ```

4. **Try Login:**
   ```
   http://localhost:3000/auth/login
   ```

## Still Not Working?

Check browser console and look for these messages:
- ✅ "Sign in error: ..." → Shows the specific error
- ✅ "Error fetching profile: ..." → Shows profile fetch error
- ✅ "User ID: ..." → Shows if user authenticated

Then:
1. Copy the error message
2. Check which step above matches your error
3. Follow that solution
