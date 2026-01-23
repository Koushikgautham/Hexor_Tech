/**
 * NEW AUTH PROVIDER
 * 
 * This is the central authentication provider for the new auth system.
 * 
 * KEY DESIGN DECISIONS:
 * 
 * 1. SINGLE INITIALIZATION
 *    - Uses useRef to prevent double-init in React Strict Mode
 *    - Prevents duplicate profile fetches
 * 
 * 2. LOADING STATE MANAGEMENT
 *    - isLoading only becomes false AFTER profile is fetched
 *    - This prevents "flash of unauthenticated content"
 * 
 * 3. NO AUTO-REDIRECT
 *    - This context NEVER redirects automatically
 *    - Redirects are handled by the component that calls signIn()
 *    - This prevents the infinite redirect loops
 * 
 * 4. SINGLETON CLIENT
 *    - Uses the singleton browser client
 *    - Ensures consistent session state
 * 
 * 5. PROFILE IN SIGNRESULT
 *    - signIn returns where to redirect based on role
 *    - The component decides whether to redirect
 */

"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef,
    useMemo,
} from "react";

import { User, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client";
import type { AuthContextType, UserProfile, SignInResult } from "@/lib/auth/types";

// Create context with undefined as initial value
const NewAuthContext = createContext<AuthContextType | undefined>(undefined);

// Get singleton client at module level
const supabase = getSupabaseBrowserClient();

/**
 * Auth Provider Component
 * 
 * Wrap your app (or part of it) with this provider to enable auth.
 */
export function NewAuthProvider({ children }: { children: React.ReactNode }) {
    // Auth state
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Refs to prevent double-initialization and race conditions
    const isInitialized = useRef(false);
    const isFetchingProfile = useRef(false);

    /**
     * Fetch user profile from database
     * 
     * Uses a ref to prevent concurrent fetches
     */
    const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
        // Prevent concurrent fetches
        if (isFetchingProfile.current) {
            return null;
        }

        isFetchingProfile.current = true;

        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                console.error("[NewAuth] Error fetching profile:", error.message);
                return null;
            }

            return data as UserProfile;
        } catch (error) {
            console.error("[NewAuth] Exception fetching profile:", error);
            return null;
        } finally {
            isFetchingProfile.current = false;
        }
    }, []);

    /**
     * Initialize auth state on mount
     * 
     * This runs once to:
     * 1. Check for existing session
     * 2. Fetch profile if session exists
     * 3. Set up auth state change listener
     */
    useEffect(() => {
        // Prevent double-init in React Strict Mode
        if (isInitialized.current) {
            return;
        }
        isInitialized.current = true;

        let mounted = true;

        const initializeAuth = async () => {
            try {
                // Get existing session (from cookies)
                const { data: { session: existingSession } } = await supabase.auth.getSession();

                if (!mounted) return;

                if (existingSession?.user) {
                    setSession(existingSession);
                    setUser(existingSession.user);

                    // Fetch profile BEFORE setting loading to false
                    const userProfile = await fetchProfile(existingSession.user.id);

                    if (mounted) {
                        setProfile(userProfile);
                    }
                }

                if (mounted) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("[NewAuth] Init error:", error);
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

        // Listen for auth state changes (sign in, sign out, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                if (!mounted) return;

                console.log("[NewAuth] Auth event:", event);

                if (event === "SIGNED_IN" && newSession?.user) {
                    setSession(newSession);
                    setUser(newSession.user);

                    // Fetch profile on new sign in
                    const userProfile = await fetchProfile(newSession.user.id);
                    if (mounted) {
                        setProfile(userProfile);
                    }
                } else if (event === "SIGNED_OUT") {
                    setSession(null);
                    setUser(null);
                    setProfile(null);
                } else if (event === "TOKEN_REFRESHED" && newSession) {
                    setSession(newSession);
                    setUser(newSession.user);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [fetchProfile]);

    /**
     * Sign in with email and password
     * 
     * IMPORTANT: This function does NOT redirect.
     * It returns a result with where to redirect.
     * The calling component decides whether to redirect.
     * 
     * This prevents:
     * - Redirect loops
     * - Navigation during render
     * - Unpredictable behavior
     */
    const signIn = useCallback(async (
        email: string,
        password: string
    ): Promise<SignInResult> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return {
                    success: false,
                    error: error.message,
                    redirectTo: null,
                };
            }

            if (!data.user) {
                return {
                    success: false,
                    error: "No user returned from sign in",
                    redirectTo: null,
                };
            }

            // Update state
            setSession(data.session);
            setUser(data.user);

            // Fetch profile to determine role
            let userProfile = await fetchProfile(data.user.id);

            // Auto-create profile if missing (self-healing)
            if (!userProfile) {
                console.log("[NewAuth] Profile missing, creating default profile via API...");

                // Check if this should be an admin (Hardcoded heuristic for 'abishekpechiappan@gmail.com')
                const isRescueAdmin = email === 'abishekpechiappan@gmail.com';
                const role = isRescueAdmin ? 'admin' : 'user';

                try {
                    // Call the secure API route to create/fix profile (bypassing RLS)
                    const response = await fetch('/api/auth/fix-profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: data.user.id,
                            email: email,
                            full_name: data.user.user_metadata?.full_name,
                            role: role
                        }),
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        console.error("[NewAuth] Failed to create profile via API:", result.error);
                    } else {
                        console.log("[NewAuth] Created/Fixed profile via API:", result.message);
                        // Re-fetch profile
                        userProfile = await fetchProfile(data.user.id);
                    }
                } catch (apiErr) {
                    console.error("[NewAuth] Exception calling fix-profile API:", apiErr);
                }
            }

            setProfile(userProfile);

            // Determine redirect based on role
            let redirectTo = "/";
            if (userProfile?.role === "admin") {
                redirectTo = "/auth-admin";
            }

            console.log("[NewAuth] Sign in success, redirect to:", redirectTo);

            return {
                success: true,
                error: null,
                redirectTo,
            };
        } catch (error) {
            console.error("[NewAuth] Sign in exception:", error);
            return {
                success: false,
                error: "An unexpected error occurred",
                redirectTo: null,
            };
        }
    }, [fetchProfile]);

    /**
     * Sign out the current user
     * 
     * Like signIn, this does NOT redirect automatically.
     */
    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
    }, []);

    /**
     * Refresh profile from database
     * 
     * Use this after updating user profile
     */
    const refreshProfile = useCallback(async () => {
        if (user) {
            const userProfile = await fetchProfile(user.id);
            setProfile(userProfile);
        }
    }, [user, fetchProfile]);

    // Derived state
    const isAdmin = profile?.role === "admin";
    const isAuthenticated = !!user;

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo<AuthContextType>(() => ({
        // State
        user,
        session,
        profile,
        isLoading,
        isAdmin,
        isAuthenticated,
        // Actions
        signIn,
        signOut,
        refreshProfile,
    }), [
        user,
        session,
        profile,
        isLoading,
        isAdmin,
        isAuthenticated,
        signIn,
        signOut,
        refreshProfile,
    ]);

    return (
        <NewAuthContext.Provider value={contextValue}>
            {children}
        </NewAuthContext.Provider>
    );
}

/**
 * Hook to access auth context
 * 
 * Use this in any component that needs auth data:
 * const { user, isAdmin, signIn, signOut } = useNewAuth();
 */
export function useNewAuth(): AuthContextType {
    const context = useContext(NewAuthContext);

    if (context === undefined) {
        throw new Error(
            "useNewAuth must be used within a NewAuthProvider. " +
            "Make sure your component is wrapped with <NewAuthProvider>."
        );
    }

    return context;
}
