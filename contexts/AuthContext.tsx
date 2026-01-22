"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { UserRole } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (
    newPassword: string
  ) => Promise<{ error: AuthError | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  // -----------------------------
  // Fetch user profile
  // -----------------------------
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profile fetch error:", error);
      return null;
    }

    return data as UserProfile;
  };

  // -----------------------------
  // Refresh profile
  // -----------------------------
  const refreshProfile = async () => {
    if (!user) return;
    const profileData = await fetchProfile(user.id);
    setProfile(profileData);
  };

  // -----------------------------
  // Initial auth + listener
  // -----------------------------
  useEffect(() => {
    let mounted = true;

    // Initial session
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;

      setSession(data.session);
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        const profileData = await fetchProfile(data.session.user.id);
        setProfile(profileData);
      }

      setIsLoading(false);
    });

    // Auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);

          // ✅ SINGLE redirect location
          if (event === "SIGNED_IN") {
            if (profileData?.role === "admin") {
              router.replace("/admin/dashboard");
            }
          }
        } else {
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  // -----------------------------
  // Sign in
  // -----------------------------
  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error };

    // profile validation only
    if (data.user) {
      const profileData = await fetchProfile(data.user.id);

      if (!profileData) {
        await supabase.auth.signOut();
        return {
          error: {
            message: "Profile not found. Contact admin.",
            name: "ProfileNotFound",
            status: 404,
          } as any,
        };
      }

      setProfile(profileData);
    }

    // ❌ NO redirect here
    return { error: null };
  };

  // -----------------------------
  // Sign up
  // -----------------------------
  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (!error && data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: "user",
        is_active: true,
      });
    }

    return { error };
  };

  // -----------------------------
  // Sign out
  // -----------------------------
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    router.push("/auth/login");
  };

  // -----------------------------
  // Password reset
  // -----------------------------
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    return { error };
  };

  const value = {
    user,
    session,
    profile,
    isLoading,
    isAdmin: profile?.role === "admin",
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
