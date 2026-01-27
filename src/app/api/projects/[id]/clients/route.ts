import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all clients linked to a project
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
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

        // Get clients linked to this project with their profile info
        const { data: projectClients, error } = await supabase
            .from("project_clients")
            .select(
                `
                id,
                created_at,
                client:profiles!project_clients_client_id_fkey (
                    id,
                    email,
                    full_name,
                    avatar_url
                )
            `
            )
            .eq("project_id", projectId);

        if (error) {
            console.error("Error fetching project clients:", error);
            return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
        }

        return NextResponse.json(projectClients || []);
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/clients:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST link a client to a project
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
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

        const body = await request.json();
        const { client_id } = body;

        if (!client_id) {
            return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
        }

        // Verify the client exists and has 'client' role
        const { data: clientProfile } = await supabase
            .from("profiles")
            .select("id, role")
            .eq("id", client_id)
            .single();

        if (!clientProfile) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        if (clientProfile.role !== "client") {
            return NextResponse.json({ error: "User is not a client" }, { status: 400 });
        }

        // Link client to project
        const { data: projectClient, error } = await supabase
            .from("project_clients")
            .insert({
                project_id: projectId,
                client_id: client_id,
            })
            .select(
                `
                id,
                created_at,
                client:profiles!project_clients_client_id_fkey (
                    id,
                    email,
                    full_name,
                    avatar_url
                )
            `
            )
            .single();

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json({ error: "Client already linked to project" }, { status: 409 });
            }
            console.error("Error linking client:", error);
            return NextResponse.json({ error: "Failed to link client" }, { status: 500 });
        }

        return NextResponse.json(projectClient);
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/clients:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE unlink a client from a project
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
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

        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get("client_id");

        if (!clientId) {
            return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("project_clients")
            .delete()
            .eq("project_id", projectId)
            .eq("client_id", clientId);

        if (error) {
            console.error("Error unlinking client:", error);
            return NextResponse.json({ error: "Failed to unlink client" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]/clients:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
