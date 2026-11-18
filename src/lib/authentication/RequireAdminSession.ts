import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createClient } from "./SupabaseServerClient";

type ServerSupabase = Awaited<ReturnType<typeof createClient>>;

export type AdminSessionResult =
    | { ok: true; supabase: ServerSupabase; user: User }
    | { ok: false; response: NextResponse };

// For API routes: makes sure the caller is logged in AND an active admin.
// The returned client acts as that admin, so database RLS still applies.
export async function requireAdminSession(): Promise<AdminSessionResult> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { ok: false, response: NextResponse.json({ error: "You need to log in" }, { status: 401 }) };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .maybeSingle();

    if (!profile || profile.role !== "admin" || !profile.is_active) {
        return { ok: false, response: NextResponse.json({ error: "Admins only" }, { status: 403 }) };
    }

    return { ok: true, supabase, user };
}

// Postgres errors raised by our own SQL guards (code P0001) have messages
// written for people, e.g. "Cannot remove or deactivate the last active admin".
// Anything else is hidden behind a generic message.
export function databaseErrorMessage(error: { code?: string; message: string }, fallback: string) {
    return error.code === "P0001" ? error.message : fallback;
}

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
