"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function DebugPage() {
    const [status, setStatus] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);

    const checkConnection = async () => {
        setLoading(true);
        const results: any = {
            timestamp: new Date().toISOString(),
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET",
            hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        };

        try {
            // Test authentication
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            results.session = {
                exists: !!sessionData.session,
                user: sessionData.session?.user?.email || "No user",
                error: sessionError?.message || null,
            };

            // Test profiles table
            const { data: profilesData, error: profilesError } = await supabase
                .from("profiles")
                .select("count")
                .limit(1);

            results.profiles = {
                accessible: !profilesError,
                error: profilesError?.message || null,
                hint: profilesError?.hint || null,
            };

            // Test projects table
            const { data: projectsData, error: projectsError } = await supabase
                .from("projects")
                .select("count")
                .limit(1);

            results.projects = {
                accessible: !projectsError,
                error: projectsError?.message || null,
            };
        } catch (err: any) {
            results.exception = err.message;
        }

        setStatus(results);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Supabase Debug</h1>

                <button
                    onClick={checkConnection}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg mb-6 disabled:opacity-50"
                >
                    {loading ? "Testing..." : "Test Connection"}
                </button>

                {status && (
                    <pre className="bg-card border border-border rounded-xl p-4 overflow-auto text-sm">
                        {JSON.stringify(status, null, 2)}
                    </pre>
                )}

                <div className="mt-8 space-y-4">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Quick Fixes:</h2>

                        <div className="space-y-3">
                            <div>
                                <h3 className="font-medium text-primary mb-2">1. Create Profile Table</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Run this in Supabase SQL Editor:
                                </p>
                                <code className="block bg-secondary p-3 rounded text-xs overflow-auto">
                                    {`-- Run PROJECTS_SCHEMA.sql from your project root`}
                                </code>
                            </div>

                            <div>
                                <h3 className="font-medium text-primary mb-2">2. Create Your Profile</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    After signing up, run this with your email:
                                </p>
                                <code className="block bg-secondary p-3 rounded text-xs overflow-auto">
                                    {`UPDATE profiles SET role = 'admin' 
WHERE email = 'your-email@example.com';`}
                                </code>
                            </div>

                            <div>
                                <h3 className="font-medium text-primary mb-2">3. Check Environment Variables</h3>
                                <p className="text-sm text-muted-foreground">
                                    Make sure .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
