import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// POST - Set a user as Scrum Master (unsets previous one)
export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify current user is an admin
        const { data: currentProfile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!currentProfile || currentProfile.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Verify target user is an admin
        const { data: targetProfile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userId)
            .single();

        if (!targetProfile || targetProfile.role !== "admin") {
            return NextResponse.json({ error: "Only admins can be set as Scrum Master" }, { status: 400 });
        }

        // First, unset any existing Scrum Master
        await supabase
            .from("profiles")
            .update({ is_scrum_master: false })
            .eq("is_scrum_master", true);

        // Set the new Scrum Master
        const { error } = await supabase
            .from("profiles")
            .update({ is_scrum_master: true })
            .eq("id", userId);

        if (error) {
            console.error("Error setting Scrum Master:", error);
            return NextResponse.json({ error: "Failed to set Scrum Master" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Scrum Master set successfully" });
    } catch (error) {
        console.error("Error in POST /api/admin/scrum-master:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Remove Scrum Master designation
export async function DELETE(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify current user is an admin
        const { data: currentProfile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!currentProfile || currentProfile.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Remove Scrum Master designation
        const { error } = await supabase
            .from("profiles")
            .update({ is_scrum_master: false })
            .eq("id", userId);

        if (error) {
            console.error("Error removing Scrum Master:", error);
            return NextResponse.json({ error: "Failed to remove Scrum Master" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Scrum Master removed successfully" });
    } catch (error) {
        console.error("Error in DELETE /api/admin/scrum-master:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET - Get current Scrum Master
export async function GET() {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: scrumMaster, error } = await supabase
            .from("profiles")
            .select("id, full_name, email, avatar_url")
            .eq("is_scrum_master", true)
            .single();

        if (error && error.code !== "PGRST116") {
            // PGRST116 = no rows returned
            console.error("Error fetching Scrum Master:", error);
            return NextResponse.json({ error: "Failed to fetch Scrum Master" }, { status: 500 });
        }

        return NextResponse.json({ scrumMaster: scrumMaster || null });
    } catch (error) {
        console.error("Error in GET /api/admin/scrum-master:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
