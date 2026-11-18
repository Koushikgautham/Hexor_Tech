import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from '@/lib/authentication/SupabaseServerClient';

// POST - Request edit access for a sheet
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; sheetId: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId, sheetId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if sheet exists and get creator info
        const { data: sheet, error: sheetError } = await supabase
            .from("project_sheets")
            .select("id, name, added_by, added_by_user:profiles!project_sheets_added_by_fkey (id, full_name, email)")
            .eq("id", sheetId)
            .eq("project_id", projectId)
            .single();

        if (sheetError || !sheet) {
            return NextResponse.json({ error: "Sheet not found" }, { status: 404 });
        }

        // Check if request already exists
        const { data: existingRequest } = await supabase
            .from("sheet_access_requests")
            .select("id, status")
            .eq("sheet_id", sheetId)
            .eq("requested_by", user.id)
            .eq("status", "pending")
            .single();

        if (existingRequest) {
            return NextResponse.json({
                error: "You already have a pending request for this sheet",
            }, { status: 400 });
        }

        // Create access request
        const { data: accessRequest, error: createError } = await supabase
            .from("sheet_access_requests")
            .insert({
                sheet_id: sheetId,
                requested_by: user.id,
                created_by: sheet.added_by,
                status: "pending",
            })
            .select()
            .single();

        if (createError) {
            console.error("Error creating access request:", createError);
            return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
        }

        // Get requester info
        const { data: requesterProfile } = await supabase
            .from("profiles")
            .select("full_name, email")
            .eq("id", user.id)
            .single();

        // Create notification for the sheet creator
        await supabase.from("notifications").insert({
            user_id: sheet.added_by,
            type: "sheet_access_request",
            title: `Edit Access Requested: ${sheet.name}`,
            message: `${requesterProfile?.full_name || "A user"} requested edit access to the sheet "${sheet.name}"`,
            project_id: projectId,
            created_by: user.id,
        });

        return NextResponse.json({
            success: true,
            message: "Access request sent to sheet creator",
            request: accessRequest,
        });
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/sheets/[sheetId]/access-request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET - Check access status
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; sheetId: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId, sheetId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get the pending access request if any
        const { data: accessRequest, error } = await supabase
            .from("sheet_access_requests")
            .select("id, status, created_at")
            .eq("sheet_id", sheetId)
            .eq("requested_by", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== "PGRST116") {
            console.error("Error fetching access request:", error);
            return NextResponse.json({ error: "Failed to fetch access status" }, { status: 500 });
        }

        return NextResponse.json({
            hasRequest: !!accessRequest,
            request: accessRequest || null,
        });
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/sheets/[sheetId]/access-request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH - Accept or reject access request
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; sheetId: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId, sheetId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { requestId, action } = body; // action: "accept" or "reject"

        if (!requestId || !["accept", "reject"].includes(action)) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // Get the access request
        const { data: accessRequest, error: getError } = await supabase
            .from("sheet_access_requests")
            .select("id, sheet_id, requested_by, created_by")
            .eq("id", requestId)
            .single();

        if (getError || !accessRequest) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        // Verify the current user is the sheet creator
        if (accessRequest.created_by !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Update the access request status
        const newStatus = action === "accept" ? "accepted" : "rejected";
        const { error: updateError } = await supabase
            .from("sheet_access_requests")
            .update({
                status: newStatus,
                responded_at: new Date().toISOString(),
            })
            .eq("id", requestId);

        if (updateError) {
            console.error("Error updating access request:", updateError);
            return NextResponse.json({ error: "Failed to update request" }, { status: 500 });
        }

        // If accepted, update the sheet's access_type for the requested user
        if (action === "accept") {
            // Note: This would require a user_sheet_access table to track per-user access
            // For now, we'll just mark the sheet as having edit access available
        }

        // Create notification for the requester
        const { data: requesterProfile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", accessRequest.requested_by)
            .single();

        const notificationMessage =
            action === "accept"
                ? `Your request for edit access to the sheet was approved!`
                : `Your request for edit access to the sheet was declined.`;

        await supabase.from("notifications").insert({
            user_id: accessRequest.requested_by,
            type: "sheet_access_response",
            title: `Edit Access ${action === "accept" ? "Approved" : "Declined"}`,
            message: notificationMessage,
            project_id: projectId,
            created_by: user.id,
        });

        return NextResponse.json({
            success: true,
            message: `Access request ${newStatus}`,
        });
    } catch (error) {
        console.error("Error in PATCH /api/projects/[id]/sheets/[sheetId]/access-request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
