"use client";

import * as React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { createClient } from "./SupabaseBrowserClient";
import type { UserProfile } from "./UserProfileTypes";

// Every auth action resolves to this, so forms only need `error.message`.
export type AuthActionResult = { error: { message: string } | null };

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    isLoading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<AuthActionResult>;
    signUp: (email: string, password: string, fullName: string) => Promise<AuthActionResult>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<AuthActionResult>;
    updatePassword: (newPassword: string) => Promise<AuthActionResult>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabase = createClient();

// Where Supabase email links (password reset, signup confirmation) land.
// This URL must be listed in Supabase → Authentication → URL Configuration.
export const AUTH_CONFIRM_PATH = "/authentication/confirm";

const ROLE_HOME: Record<string, string> = {
    admin: "/admin/dashboard",
    client: "/client/dashboard",
};

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function failure(message: string): AuthActionResult {
    return { error: { message } };
}

// Turns Supabase's error codes into messages a user can act on.
function friendlyAuthError(error: { message: string; code?: string; status?: number }): AuthActionResult {
    switch (error.code) {
        case "invalid_credentials":
            return failure("Invalid email or password");
        case "email_not_confirmed":
            return failure("Please confirm your email first. Check your inbox for the link.");
        case "over_email_send_rate_limit":
        case "over_request_rate_limit":
            return failure("Too many attempts. Please wait a minute and try again.");
        case "same_password":
            return failure("Your new password must be different from your current password.");
        case "weak_password":
            return failure("This password is too weak. Please choose a stronger one.");
        case "user_already_exists":
        case "email_exists":
            return failure("An account with this email already exists. Try logging in instead.");
    }
    if (error.status === 429) {
        return failure("Too many attempts. Please wait a minute and try again.");
    }
    return failure(error.message || "Something went wrong. Please try again.");
}

async function fetchProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

    if (error) {
        console.warn("Could not load profile:", error.message);
        return null;
    }
    return data as UserProfile | null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const user = session?.user ?? null;
    const userId = user?.id ?? null;

    // One listener handles the first load (INITIAL_SESSION) and every later change.
    useEffect(() => {
        let isMounted = true;

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, newSession: Session | null) => {
                if (!isMounted) return;
                setSession(newSession);

                if (!newSession) {
                    setProfile(null);
                    setIsLoading(false);
                    return;
                }

                // Supabase warns against awaiting its own calls inside this
                // callback (it can deadlock), so the profile load is deferred.
                if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "USER_UPDATED") {
                    setTimeout(async () => {
                        const loaded = await fetchProfile(newSession.user.id);
                        if (isMounted) {
                            setProfile(loaded);
                            setIsLoading(false);
                        }
                    }, 0);
                } else {
                    setIsLoading(false);
                }
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const refreshProfile = useCallback(async () => {
        if (!userId) return;
        const loaded = await fetchProfile(userId);
        if (loaded) setProfile(loaded);
    }, [userId]);

    const signIn = useCallback(async (email: string, password: string): Promise<AuthActionResult> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: normalizeEmail(email),
            password,
        });
        if (error) return friendlyAuthError(error);

        const loaded = await fetchProfile(data.user.id);

        if (!loaded) {
            await supabase.auth.signOut();
            return failure("Your account profile could not be loaded. Please contact support.");
        }
        if (!loaded.is_active) {
            await supabase.auth.signOut();
            return failure("This account has been deactivated. Please contact an administrator.");
        }

        const destination = ROLE_HOME[loaded.role];
        if (!destination) {
            await supabase.auth.signOut();
            return failure("Your account is waiting for approval. You'll be able to log in once an admin gives you access.");
        }

        setProfile(loaded);
        // Full page load so the server sees the fresh auth cookies.
        window.location.href = destination;
        return { error: null };
    }, []);

    const signUp = useCallback(async (email: string, password: string, fullName: string): Promise<AuthActionResult> => {
        const { data, error } = await supabase.auth.signUp({
            email: normalizeEmail(email),
            password,
            options: {
                data: { full_name: fullName.trim() },
                emailRedirectTo: `${window.location.origin}${AUTH_CONFIRM_PATH}?type=signup`,
            },
        });
        if (error) return friendlyAuthError(error);

        // With email confirmation on, Supabase hides "already registered" by
        // returning a user with no identities instead of an error.
        if (data.user && data.user.identities?.length === 0) {
            return failure("An account with this email already exists. Try logging in or resetting your password.");
        }
        // The profile row is created by the database trigger, not here.
        return { error: null };
    }, []);

    const signOut = useCallback(async () => {
        try {
            await supabase.rpc("update_my_presence", { p_is_online: false });
        } catch {
            // Presence is best-effort; never block sign out on it.
        }
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
        window.location.href = "/authentication/login";
    }, []);

    const resetPassword = useCallback(async (email: string): Promise<AuthActionResult> => {
        const { error } = await supabase.auth.resetPasswordForEmail(normalizeEmail(email), {
            redirectTo: `${window.location.origin}${AUTH_CONFIRM_PATH}?type=recovery`,
        });
        // Supabase does not reveal whether the email exists, which is what we want.
        return error ? friendlyAuthError(error) : { error: null };
    }, []);

    const updatePassword = useCallback(async (newPassword: string): Promise<AuthActionResult> => {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) {
            return failure("Your reset link has expired. Please request a new one.");
        }
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        return error ? friendlyAuthError(error) : { error: null };
    }, []);

    const isAdmin = profile?.role === "admin" && profile.is_active;

    const value = useMemo(() => ({
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
