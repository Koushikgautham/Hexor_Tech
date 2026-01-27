import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all contacts for a project
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

        // Get contacts for this project (RLS will handle access)
        const { data: contacts, error } = await supabase
            .from("project_contacts")
            .select(
                `
                *,
                user:profiles!project_contacts_user_id_fkey (
                    id,
                    full_name,
                    email,
                    avatar_url
                )
            `
            )
            .eq("project_id", projectId)
            .order("is_primary", { ascending: false })
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Error fetching contacts:", error);
            return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
        }

        return NextResponse.json(contacts || []);
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/contacts:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST create new contact
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
        const { name, role, email, phone, user_id, is_primary = false } = body;

        if (!name || !role) {
            return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
        }

        // If setting as primary, unset any existing primary contacts
        if (is_primary) {
            await supabase
                .from("project_contacts")
                .update({ is_primary: false })
                .eq("project_id", projectId)
                .eq("is_primary", true);
        }

        const { data: contact, error } = await supabase
            .from("project_contacts")
            .insert({
                project_id: projectId,
                name,
                role,
                email: email || null,
                phone: phone || null,
                user_id: user_id || null,
                is_primary,
            })
            .select(
                `
                *,
                user:profiles!project_contacts_user_id_fkey (
                    id,
                    full_name,
                    email,
                    avatar_url
                )
            `
            )
            .single();

        if (error) {
            console.error("Error creating contact:", error);
            return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
        }

        return NextResponse.json(contact);
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/contacts:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT update contact
export async function PUT(
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
        const { contact_id, is_primary, ...updateData } = body;

        if (!contact_id) {
            return NextResponse.json({ error: "Contact ID is required" }, { status: 400 });
        }

        // If setting as primary, unset any existing primary contacts
        if (is_primary) {
            await supabase
                .from("project_contacts")
                .update({ is_primary: false })
                .eq("project_id", projectId)
                .eq("is_primary", true);
        }

        const { data: contact, error } = await supabase
            .from("project_contacts")
            .update({
                ...updateData,
                is_primary: is_primary ?? false,
                updated_at: new Date().toISOString(),
            })
            .eq("id", contact_id)
            .eq("project_id", projectId)
            .select(
                `
                *,
                user:profiles!project_contacts_user_id_fkey (
                    id,
                    full_name,
                    email,
                    avatar_url
                )
            `
            )
            .single();

        if (error) {
            console.error("Error updating contact:", error);
            return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
        }

        return NextResponse.json(contact);
    } catch (error) {
        console.error("Error in PUT /api/projects/[id]/contacts:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE contact
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
        const contactId = searchParams.get("contact_id");

        if (!contactId) {
            return NextResponse.json({ error: "Contact ID is required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("project_contacts")
            .delete()
            .eq("id", contactId)
            .eq("project_id", projectId);

        if (error) {
            console.error("Error deleting contact:", error);
            return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]/contacts:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
