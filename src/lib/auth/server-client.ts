/**
 * SUPABASE SERVER CLIENT
 * 
 * This file creates Supabase clients for use in Server Components and API routes.
 * 
 * WHY SEPARATE SERVER CLIENT?
 * - Server Components cannot use browser APIs
 * - Server needs access to cookies() from next/headers
 * - This client is created fresh for each request (NOT singleton)
 * 
 * WHY FRESH CLIENT PER REQUEST?
 * - Each server request has its own cookie context
 * - Sharing would cause session data to leak between users
 * - Server-side isolation is critical for security
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { UserProfile, UserRole } from "./types";

/**
 * Create a Supabase client for Server Components
 * 
 * IMPORTANT: This creates a NEW client for each call.
 * Do NOT cache or reuse between requests.
 */
export async function getSupabaseServerClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch {
                        // This will fail in Server Components (read-only)
                        // That's fine - middleware handles cookie writes
                    }
                },
            },
        }
    );
}

/**
 * Get the current authenticated user on the server
 * 
 * This is the SECURE way to check auth on the server.
 * It validates the JWT with Supabase (not just reading cookies).
 * 
 * Returns null if not authenticated or invalid session.
 */
export async function getServerUser() {
    const supabase = await getSupabaseServerClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}

/**
 * Get the current user's profile from the database
 * 
 * This validates that:
 * 1. User is authenticated
 * 2. User has a profile in the database
 * 3. Profile includes their role
 * 
 * Returns null if any step fails.
 */
export async function getServerProfile(): Promise<UserProfile | null> {
    const user = await getServerUser();

    if (!user) {
        return null;
    }

    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error || !data) {
        console.error("Failed to fetch profile:", error);
        return null;
    }

    return data as UserProfile;
}

/**
 * Check if the current user has admin role
 * 
 * This is the SECURE way to verify admin access on the server.
 * Always use this in admin pages, NEVER trust client-side role.
 */
export async function isServerAdmin(): Promise<boolean> {
    const profile = await getServerProfile();
    return profile?.role === "admin";
}
