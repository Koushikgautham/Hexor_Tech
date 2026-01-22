# Hexora Admin & Authentication Portal Context

> This file provides comprehensive context for the Admin Portal and Authentication system using Supabase.

---

## Overview

The Hexora Admin Portal is a **separate, standalone authentication and administration system** that integrates with Supabase for user management. It is designed to be completely independent from the main website, allowing future integration when needed.

**Key Features:**
- 🔐 **Supabase Authentication** - Email/password authentication with secure session management
- 👑 **Admin Privileges** - Full user management capabilities for admins
- 🎨 **Matching Theme** - Uses the same Hexora red & white design system
- 📱 **Responsive Design** - Works on all device sizes
- 🌓 **Dark/Light Mode** - Theme toggle throughout

---

## File Structure

```
src/
├── app/
│   ├── (auth)/                          # Auth route group (public)
│   │   ├── layout.tsx                   # Auth pages layout with animated background
│   │   └── auth/
│   │       ├── login/page.tsx           # Login page
│   │       ├── signup/page.tsx          # Registration page
│   │       ├── forgot-password/page.tsx # Password reset request
│   │       └── reset-password/page.tsx  # Set new password
│   │
│   └── (admin)/                         # Admin route group (protected)
│       ├── layout.tsx                   # AuthProvider wrapper
│       └── admin/
│           ├── layout.tsx               # Admin dashboard layout with sidebar
│           ├── dashboard/page.tsx       # Main dashboard with stats
│           ├── users/page.tsx           # User management (CRUD)
│           └── settings/page.tsx        # Admin settings
│
├── contexts/
│   └── AuthContext.tsx                  # Auth state management & Supabase integration
│
├── lib/
│   └── supabase.ts                      # Supabase client configuration
│
└── providers/
    └── auth-provider.tsx                # Optional lazy-loaded AuthProvider
```

---

## Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/auth/login` | User login page | Public |
| `/auth/signup` | User registration | Public |
| `/auth/forgot-password` | Request password reset email | Public |
| `/auth/reset-password` | Set new password (from email link) | Public |
| `/admin/dashboard` | Admin dashboard overview | Admin only |
| `/admin/users` | User management | Admin only |
| `/admin/settings` | Admin account settings | Admin only |

---

## Supabase Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **API Keys**

### 2. Create Profiles Table
Run this SQL in the Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
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

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create initial admin user (replace with your email after signing up)
-- Run this AFTER creating an account via the signup page:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
```

### 3. Environment Variables
Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**⚠️ Important:** Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code!

---

## Authentication Context

The `AuthContext` provides:

```typescript
interface AuthContextType {
  user: User | null;              // Supabase user object
  session: Session | null;        // Current session
  profile: UserProfile | null;    // Profile from profiles table
  isLoading: boolean;             // Auth state loading
  isAdmin: boolean;               // Role check helper
  signIn: (email, password) => Promise<{error}>;
  signUp: (email, password, fullName) => Promise<{error}>;
  signOut: () => Promise<void>;
  resetPassword: (email) => Promise<{error}>;
  updatePassword: (newPassword) => Promise<{error}>;
  refreshProfile: () => Promise<void>;
}
```

### Usage Example:
```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, profile, isAdmin, signOut } = useAuth();
  
  if (!user) return <LoginPrompt />;
  
  return (
    <div>
      <p>Welcome, {profile?.full_name}</p>
      {isAdmin && <AdminPanel />}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

---

## Admin Privileges

Admins have full access to:

### User Management (`/admin/users`)
- **View all users** - See all registered users with filters
- **Reset passwords** - Send password reset emails to any user
- **Change roles** - Promote/demote users between admin and user roles
- **Activate/Deactivate** - Enable or disable user accounts
- **Delete users** - Permanently remove user accounts
- **Add new users** - Create accounts with temporary passwords

### Settings (`/admin/settings`)
- **Profile** - Update name, email, avatar
- **Security** - Change own password, enable 2FA (planned)
- **Notifications** - Manage notification preferences
- **Appearance** - Theme customization

---

## Design System Integration

The admin portal uses the **same design tokens** as the main Hexora website:

### Colors
```css
/* Primary - Hexora Red */
--primary: oklch(0.577 0.245 16.439);    /* Light: #E11D48 */
--primary: oklch(0.645 0.246 16.439);    /* Dark: #F43F5E */

/* Accent - Deep Red */
--accent: oklch(0.505 0.213 16.439);     /* #B91C1C */
```

### Components Used
- Rounded corners (`rounded-xl`, `rounded-2xl`)
- Subtle borders (`border-border`)
- Glow effects (`.glow-red` on primary buttons)
- Framer Motion animations
- Glass backgrounds on modals

---

## Security Considerations

1. **Route Protection** - Admin routes check `isAdmin` before rendering
2. **Row Level Security** - Supabase RLS policies protect data
3. **Service Role Key** - Only used server-side for admin operations
4. **Password Requirements** - 8+ chars, uppercase, lowercase, number
5. **Session Management** - Automatic token refresh via Supabase

---

## Connecting to Main Website

To add login links to the main website, add this to the header:

```tsx
// In src/components/layout/header.tsx
import Link from "next/link";

// Add to navigation or header actions:
<Link href="/auth/login">
  <Button variant="outline">Sign In</Button>
</Link>
```

To protect any page on the main site, wrap it with AuthProvider and use the `useAuth` hook to check authentication status.

---

## Future Enhancements

- [ ] OAuth providers (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Email verification on signup
- [ ] Audit logs for admin actions
- [ ] User activity tracking
- [ ] Bulk user operations
- [ ] Custom email templates
- [ ] Session management (view active sessions)
- [ ] API rate limiting

---

## Troubleshooting

### "useAuth must be used within an AuthProvider"
Make sure the component is wrapped in `AuthProvider`. Check that the layout hierarchy includes the provider.

### "Supabase URL/Key is undefined"
Ensure `.env.local` exists and contains the correct values. Restart the dev server after adding env vars.

### Admin pages redirect to login
1. Check that the user has `role: 'admin'` in the profiles table
2. Verify the profile is being fetched correctly (check console for errors)

### Password reset email not received
1. Check Supabase email settings (SMTP or built-in)
2. Verify the redirect URL is correct in the reset password call
3. Check spam folder

---

*Last Updated: January 22, 2026*
*Hexora Admin Portal Documentation*
