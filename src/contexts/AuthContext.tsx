"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { User, Session, AuthError, AuthChangeEvent } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserProfile, UserRole } from "@/lib/auth/types";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    isLoading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
    updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get singleton supabase client
const supabase = createClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Track initialization to prevent double-fetching
    const isInitialized = useRef(false);
    // Fetch user profile from database
    const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
        try {
            let timeoutId: ReturnType<typeof setTimeout>;

            const fetchPromise = supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single()
                .then((result) => {
                    clearTimeout(timeoutId);
                    return result;
                });

            const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) => {
                timeoutId = setTimeout(() => {
                    resolve({ data: null, error: { message: 'Profile fetch timeout after 15s' } });
                }, 15000);
            });

            const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

            if (error) {
                console.warn("Profile fetch issue:", error.message || error);
                return null;
            }

            return data as UserProfile;
        } catch (error) {
            console.error("Exception fetching profile:", error);
            return null;
        }
    }, []);

    // SAFETY VALVE: Force loading to stop after 15 seconds max
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                console.warn("⚠️ Auth loading took too long, forcing completion");
                setIsLoading(false);
            }
        }, 15000);
        return () => clearTimeout(timer);
    }, [isLoading]);

    // Refresh profile data
    const refreshProfile = useCallback(async () => {
        if (user) {
            const profileData = await fetchProfile(user.id);
            if (profileData) {
                setProfile(profileData);
            }
        }
    }, [user, fetchProfile]);

    useEffect(() => {
        // Prevent double initialization in strict mode
        if (isInitialized.current) {
            return;
        }
        isInitialized.current = true;

        let mounted = true;

        const initializeAuth = async () => {
            try {
                // Get initial session
                const { data: { session: initialSession } } = await supabase.auth.getSession();

                if (!mounted) return;

                if (initialSession?.user) {
                    setSession(initialSession);
                    setUser(initialSession.user);

                    // Fetch profile and wait for it before setting loading to false
                    const profileData = await fetchProfile(initialSession.user.id);
                    if (mounted) {
                        setProfile(profileData);
                    }
                }

                if (mounted) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, newSession: Session | null) => {
            if (!mounted) return;

            // Only handle actual changes
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                if (newSession?.user) {
                    setSession(newSession);
                    setUser(newSession.user);

                    // Only fetch profile if we don't have one or user changed
                    if (!profile || profile.id !== newSession.user.id) {
                        const profileData = await fetchProfile(newSession.user.id);
                        if (mounted) {
                            setProfile(profileData);
                        }
                    }
                }
            } else if (event === 'SIGNED_OUT') {
                setSession(null);
                setUser(null);
                setProfile(null);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [fetchProfile]);

    // Heartbeat for online presence tracking
    useEffect(() => {
        if (!user) return;

        let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

        const sendHeartbeat = async () => {
            try {
                await fetch('/api/auth/heartbeat', { method: 'POST' });
            } catch (error) {
                console.error('Heartbeat failed:', error);
            }
        };

        const setOffline = () => {
            if (navigator.sendBeacon) {
                const blob = new Blob(
                    [JSON.stringify({ is_online: false })],
                    { type: 'application/json' }
                );
                navigator.sendBeacon('/api/auth/presence', blob);
            } else {
                fetch('/api/auth/presence', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_online: false }),
                    keepalive: true,
                }).catch(() => {});
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                sendHeartbeat();
                if (heartbeatInterval) clearInterval(heartbeatInterval);
                heartbeatInterval = setInterval(sendHeartbeat, 60000);
            } else {
                if (heartbeatInterval) {
                    clearInterval(heartbeatInterval);
                    heartbeatInterval = null;
                }
            }
        };

        // Send initial heartbeat immediately
        sendHeartbeat();

        // Start interval (every 60 seconds)
        heartbeatInterval = setInterval(sendHeartbeat, 60000);

        // Listen for tab visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Listen for page unload (tab close, browser close)
        window.addEventListener('beforeunload', setOffline);

        return () => {
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', setOffline);
        };
    }, [user]);

    // Sign in with email and password
    const signIn = useCallback(async (email: string, password: string) => {
        const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (!error && data.user) {
            // Update state immediately
            setSession(data.session);
            setUser(data.user);

            // Fetch profile
            console.log("🔐 Login successful for user:", data.user.id);
            let userProfile = await fetchProfile(data.user.id);

            // Auto-create profile if missing, or fix role if it's the admin user (self-healing)
            const isRescueAdmin = email === 'abishekpechiappan@gmail.com';

            if (!userProfile || (isRescueAdmin && userProfile?.role !== 'admin')) {
                console.log("Profile missing or role incorrect, fixing via API...");

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
                        console.error("Failed to fix profile via API:", result.error);
                    } else {
                        console.log("Created/Fixed profile via API:", result.message);
                        // Re-fetch profile
                        userProfile = await fetchProfile(data.user.id);
                    }
                } catch (apiErr) {
                    console.error("Exception calling fix-profile API:", apiErr);
                }
            }

            console.log("👤 Profile fetched:", userProfile);
            console.log("🎭 Role:", userProfile?.role);
            setProfile(userProfile);

            // Small delay to ensure cookies are set, then redirect
            await new Promise(resolve => setTimeout(resolve, 100));

            // Redirect based on role - use hard redirect to ensure proper cookie sync
            if (userProfile?.role === "admin") {
                console.log("✅ Redirecting to ADMIN dashboard");
                window.location.href = "/admin/dashboard";
            } else if (userProfile?.role === "client") {
                console.log("✅ Redirecting to CLIENT dashboard");
                window.location.href = "/client/dashboard";
            } else {
                console.log("❌ Not admin or client, redirecting to UNAUTHORIZED page");
                console.log("   Profile was:", userProfile);
                window.location.href = "/auth/login";
            }
        }

        return { error };
    }, [fetchProfile]);

    // Sign up with email and password
    const signUp = useCallback(async (email: string, password: string, fullName: string) => {
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        // Create profile entry
        if (!error && data.user) {
            await supabase.from("profiles").insert({
                id: data.user.id,
                email: email,
                full_name: fullName,
                role: "user" as UserRole,
                is_active: true,
            });
        }

        return { error };
    }, []);

    // Sign out
    const signOut = useCallback(async () => {
        // Set offline status before signing out
        try {
            await fetch('/api/auth/presence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_online: false }),
            });
        } catch (error) {
            console.error('Failed to set offline status:', error);
        }

        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
        // Use hard redirect to ensure cookies are properly cleared
        window.location.href = "/auth/login";
    }, []);

    // Reset password (sends email)
    const resetPassword = useCallback(async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        return { error };
    }, []);

    // Update password
    const updatePassword = useCallback(async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        return { error };
    }, []);

    // Derive isAdmin from profile - this is now safe because we wait for profile
    const isAdmin = profile?.role === "admin";

    const value = React.useMemo(() => ({
        user,
        session,
        profile,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        refreshProfile,
    }), [user, session, profile, isLoading, isAdmin, signIn, signUp, signOut, resetPassword, updatePassword, refreshProfile]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
