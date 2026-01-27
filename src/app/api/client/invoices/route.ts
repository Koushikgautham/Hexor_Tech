import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all invoices for the authenticated client
export async function GET(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is a client
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!profile || profile.role !== "client") {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        // Get projects linked to this client
        const { data: projectLinks, error: linksError } = await supabase
            .from("project_clients")
            .select("project_id")
            .eq("client_id", user.id);

        if (linksError) {
            console.error("Error fetching project links:", linksError);
            return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
        }

        if (!projectLinks || projectLinks.length === 0) {
            return NextResponse.json([]);
        }

        const projectIds = projectLinks.map((link) => link.project_id);

        // Fetch invoices for these projects with project info
        const { data: invoices, error } = await supabase
            .from("project_invoices")
            .select(
                `
                *,
                project:projects (
                    id,
                    name
                )
            `
            )
            .in("project_id", projectIds)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching invoices:", error);
            return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
        }

        return NextResponse.json(invoices || []);
    } catch (error) {
        console.error("Error in GET /api/client/invoices:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
