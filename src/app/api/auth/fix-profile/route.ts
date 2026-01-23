
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin Client (Service Role)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, email, full_name, role } = body;

        if (!id || !email) {
            return NextResponse.json(
                { error: "Missing required fields: id and email" },
                { status: 400 }
            );
        }

        console.log("[FixProfile API] Attempting to fix profile for:", email);

        // Check if profile exists
        const { data: existingProfile } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();

        if (existingProfile) {
            console.log("[FixProfile API] Profile already exists:", existingProfile);

            // If role mismatch and we want to enforce admin for this user
            if (role && existingProfile.role !== role) {
                console.log("[FixProfile API] Updating role to:", role);
                const { error: updateError } = await supabaseAdmin
                    .from("profiles")
                    .update({ role })
                    .eq("id", id);

                if (updateError) {
                    console.error("[FixProfile API] Failed to update role:", updateError);
                    return NextResponse.json({ error: updateError.message }, { status: 500 });
                }
            }

            return NextResponse.json({
                success: true,
                message: "Profile exists (updated if needed)",
                profile: existingProfile
            });
        }

        // Insert new profile
        const newProfile = {
            id,
            email,
            full_name: full_name || email.split('@')[0],
            role: role || 'user', // Default to user if not specified
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        console.log("[FixProfile API] Creating new profile:", newProfile);

        const { error: insertError } = await supabaseAdmin
            .from("profiles")
            .insert(newProfile);

        if (insertError) {
            console.error("[FixProfile API] Insert failed:", insertError);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Profile created successfully"
        });

    } catch (error: any) {
        console.error("[FixProfile API] Unexpected error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
