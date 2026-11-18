import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/authentication/SupabaseServerClient";

// Landing URL for every Supabase auth email (password reset, signup confirmation).
// It verifies the link on the server, stores the session in cookies, then
// sends the user on. Works even if the email is opened on another device.
//
// Supports both link styles:
//   ?token_hash=...&type=recovery   (recommended email template)
//   ?code=...                       (Supabase default template, same browser only)

const ALLOWED_TYPES: EmailOtpType[] = ["recovery", "signup", "email", "invite", "magiclink", "email_change"];

export async function GET(request: NextRequest) {
    const { searchParams, origin } = request.nextUrl;
    const tokenHash = searchParams.get("token_hash");
    const typeParam = searchParams.get("type");
    const code = searchParams.get("code");
    const type = ALLOWED_TYPES.includes(typeParam as EmailOtpType) ? (typeParam as EmailOtpType) : null;

    const supabase = await createClient();
    let verifiedType: EmailOtpType | null = null;

    if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
        if (!error) verifiedType = type;
    } else if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        // The app adds ?type=recovery / ?type=signup to its redirect URLs,
        // so a code link still says what it was for.
        if (!error) verifiedType = type ?? "signup";
    }

    // Fixed destinations only, so this route can never be used as an open redirect.
    if (verifiedType === "recovery") {
        return NextResponse.redirect(new URL("/authentication/reset-password", origin));
    }
    if (verifiedType) {
        return NextResponse.redirect(new URL("/authentication/login?status=email_confirmed", origin));
    }

    const failedType = type ?? "recovery";
    const fallback = failedType === "recovery"
        ? "/authentication/forgot-password?status=link_expired"
        : "/authentication/login?status=link_expired";
    return NextResponse.redirect(new URL(fallback, origin));
}
