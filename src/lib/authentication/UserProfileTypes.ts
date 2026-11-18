// Types for the `profiles` table (see 01_UserProfilesAndRoles.sql, kept out of git).

/**
 * - 'admin':  team member, full access to the admin dashboard
 * - 'client': can view the projects they are linked to
 * - 'user':   signed up but not approved yet, no dashboard access
 */
export type UserRole = "user" | "admin" | "client";

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    role: UserRole;
    avatar_url: string | null;
    is_active: boolean;
    is_scrum_master: boolean;
    is_online: boolean;
    last_seen: string | null;
    created_at: string;
    updated_at: string;
}
