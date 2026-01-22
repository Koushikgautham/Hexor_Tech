import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function PATCH(
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

        const body = await request.json();
        const { role } = body;
        const { id: userId } = await params;

        // Update user role in profiles table
        const { error } = await adminClient
            .from('profiles')
            .update({ role })
            .eq('id', userId);

        if (error) {
            console.error('Error updating user role:', error);
            return NextResponse.json(
                { error: 'Failed to update user role' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in PATCH /api/admin/users/[id]/role:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
