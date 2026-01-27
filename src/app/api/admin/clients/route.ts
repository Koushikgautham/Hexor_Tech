import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all users with 'client' role
export async function GET(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is admin
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!profile || profile.role !== "admin") {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        // Get search query if provided
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search");

        let query = supabase
            .from("profiles")
            .select("id, email, full_name, avatar_url, created_at")
            .eq("role", "client")
            .eq("is_active", true)
            .order("full_name", { ascending: true });

        // Apply search filter if provided
        if (search) {
            query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
        }

        const { data: clients, error } = await query;

        if (error) {
            console.error("Error fetching clients:", error);
            return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
        }

        return NextResponse.json(clients || []);
    } catch (error) {
        console.error("Error in GET /api/admin/clients:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
