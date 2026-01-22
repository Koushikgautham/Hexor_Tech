import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const adminClient = createAdminClient();

        if (!adminClient) {
            return NextResponse.json(
                { error: 'Admin client not configured' },
                { status: 500 }
            );
        }

        const { id: userId } = await params;

        // Delete user from auth (this will cascade delete the profile due to foreign key)
        const { error } = await adminClient.auth.admin.deleteUser(userId);

        if (error) {
            console.error('Error deleting user:', error);
            return NextResponse.json(
                { error: 'Failed to delete user' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/admin/users/[id]:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
