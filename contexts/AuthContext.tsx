"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase, UserProfile, UserRole } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Fetch user profile from database
    const fetchProfile = async (userId: string) => {
        try {
            console.log("Fetching profile for user ID:", userId);

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                console.error("Error fetching profile:", error);
                console.error("User ID attempted:", userId);
                return null;
            }

            console.log("Profile fetched successfully:", data);
            return data as UserProfile;
        } catch (error) {
            console.error("Exception fetching profile:", error);
            return null;
        }
    };

    // Refresh profile data
    const refreshProfile = async () => {
        if (user) {
            const profileData = await fetchProfile(user.id);
            setProfile(profileData);
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                const profileData = await fetchProfile(session.user.id);
                setProfile(profileData);
            }

            setIsLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                const profileData = await fetchProfile(session.user.id);
                setProfile(profileData);
            } else {
                setProfile(null);
            }

            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (!error) {
            router.push("/admin/dashboard");
        }

        return { error };
    };

    // Sign up with email and password
    const signUp = async (email: string, password: string, fullName: string) => {
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
    };

    // Sign out
    const signOut = async () => {
        await supabase.auth.signOut();
        setProfile(null);
        router.push("/auth/login");
    };

    // Reset password (sends email)
    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        return { error };
    };

    // Update password
    const updatePassword = async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        return { error };
    };

    const isAdmin = profile?.role === "admin";

    const value = {
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
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
