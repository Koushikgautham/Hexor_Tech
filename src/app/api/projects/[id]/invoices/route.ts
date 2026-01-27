import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all invoices for a project
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

        // Get invoices for this project (RLS will handle access)
        const { data: invoices, error } = await supabase
            .from("project_invoices")
            .select("*")
            .eq("project_id", projectId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching invoices:", error);
            return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
        }

        return NextResponse.json(invoices || []);
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/invoices:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST create new invoice
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
        const { name, description, file_url, file_name, amount, status = "pending", due_date } = body;

        if (!name || !file_url || !file_name) {
            return NextResponse.json(
                { error: "Name, file_url, and file_name are required" },
                { status: 400 }
            );
        }

        const { data: invoice, error } = await supabase
            .from("project_invoices")
            .insert({
                project_id: projectId,
                name,
                description,
                file_url,
                file_name,
                amount: amount || null,
                status,
                due_date: due_date || null,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating invoice:", error);
            return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
        }

        return NextResponse.json(invoice);
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/invoices:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT update invoice
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
        const { invoice_id, ...updateData } = body;

        if (!invoice_id) {
            return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
        }

        const { data: invoice, error } = await supabase
            .from("project_invoices")
            .update({
                ...updateData,
                updated_at: new Date().toISOString(),
            })
            .eq("id", invoice_id)
            .eq("project_id", projectId)
            .select()
            .single();

        if (error) {
            console.error("Error updating invoice:", error);
            return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
        }

        return NextResponse.json(invoice);
    } catch (error) {
        console.error("Error in PUT /api/projects/[id]/invoices:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE invoice
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
        const invoiceId = searchParams.get("invoice_id");

        if (!invoiceId) {
            return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("project_invoices")
            .delete()
            .eq("id", invoiceId)
            .eq("project_id", projectId);

        if (error) {
            console.error("Error deleting invoice:", error);
            return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]/invoices:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
