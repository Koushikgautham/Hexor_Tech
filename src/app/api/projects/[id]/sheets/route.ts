import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all Google Sheets links for a project
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: sheets, error } = await supabase
            .from("project_sheets")
            .select(`
                *,
                added_by_user:profiles!project_sheets_added_by_fkey (
                    id,
                    full_name,
                    email
                )
            `)
            .eq("project_id", projectId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching sheets:", error);
            return NextResponse.json({ error: "Failed to fetch sheets" }, { status: 500 });
        }

        return NextResponse.json(sheets);
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/sheets:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST add a Google Sheets link
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, sheet_url, description } = body;

        if (!name || !sheet_url) {
            return NextResponse.json({ error: "Name and URL are required" }, { status: 400 });
        }

        // Validate Google Sheets URL
        const validDomains = [
            "docs.google.com/spreadsheets",
            "sheets.google.com",
        ];
        const isValidUrl = validDomains.some((domain) => sheet_url.includes(domain));

        if (!isValidUrl) {
            return NextResponse.json({
                error: "Invalid Google Sheets URL. Must be a docs.google.com/spreadsheets link"
            }, { status: 400 });
        }

        const { data: sheet, error } = await supabase
            .from("project_sheets")
            .insert({
                project_id: projectId,
                name,
                sheet_url,
                description,
                added_by: user.id,
            })
            .select()
            .single();

        if (error) {
            console.error("Error adding sheet:", error);
            return NextResponse.json({ error: "Failed to add sheet" }, { status: 500 });
        }

        return NextResponse.json(sheet);
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/sheets:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE a Google Sheets link
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const sheetId = searchParams.get("sheetId");

        if (!sheetId) {
            return NextResponse.json({ error: "Sheet ID required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("project_sheets")
            .delete()
            .eq("id", sheetId)
            .eq("project_id", projectId);

        if (error) {
            console.error("Error deleting sheet:", error);
            return NextResponse.json({ error: "Failed to delete sheet" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]/sheets:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
