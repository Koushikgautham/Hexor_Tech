/**
 * AUTH TYPES
 * 
 * This file defines all TypeScript types for the authentication system.
 * Centralizing types ensures consistency across all auth components.
 */

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
    last_seen: string | null;
    is_online: boolean;
    created_at: string;
    updated_at: string;
}
