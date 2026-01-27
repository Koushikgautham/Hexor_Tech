/**
 * AUTH TYPES
 * 
 * This file defines all TypeScript types for the authentication system.
 * Centralizing types ensures consistency across all auth components.
 */

import { User, Session } from "@supabase/supabase-js";

/**
 * User roles in the system
 * - 'user': Regular user with limited access
 * - 'admin': Administrative user with full access
 * - 'client': Client user who can view assigned projects
 */
export type UserRole = "user" | "admin" | "client";

/**
 * User profile stored in the 'profiles' table in Supabase
 * This extends the basic Supabase user with application-specific data
 */
export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    role: UserRole;
    avatar_url: string | null;
    is_active: boolean;
    is_scrum_master?: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * The complete auth state exposed by the auth context
 */
export interface AuthState {
    // Current authenticated user (null if not logged in)
    user: User | null;

    // Current session (null if not logged in)
    session: Session | null;

    // User's profile from the database (null if not loaded)
    profile: UserProfile | null;

    // True while we're checking if user is logged in
    isLoading: boolean;

    // Convenience flag for checking admin status
    isAdmin: boolean;

    // True if user is authenticated
    isAuthenticated: boolean;
}

/**
 * Auth context methods
 */
export interface AuthActions {
    // Sign in with email and password
    signIn: (email: string, password: string) => Promise<SignInResult>;

    // Sign out the current user
    signOut: () => Promise<void>;

    // Refresh the user's profile from database
    refreshProfile: () => Promise<void>;
}

/**
 * Result of a sign-in attempt
 */
export interface SignInResult {
    success: boolean;
    error: string | null;
    redirectTo: string | null;
}

/**
 * Complete Auth Context type
 */
export interface AuthContextType extends AuthState, AuthActions { }
