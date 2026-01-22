import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST(
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
        const { email } = body;
        const { id: userId } = await params;

        // Send password reset email
        const { error } = await adminClient.auth.admin.generateLink({
            type: 'recovery',
            email,
        });

        if (error) {
            console.error('Error sending password reset:', error);
            return NextResponse.json(
                { error: 'Failed to send password reset email' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in POST /api/admin/users/[id]/reset-password:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
