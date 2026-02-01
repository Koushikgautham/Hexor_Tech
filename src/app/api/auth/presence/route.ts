import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        let is_online = false;
        try {
            const body = await request.json();
            is_online = body.is_online ?? false;
        } catch {
            // If body parsing fails (e.g. from sendBeacon), default to offline
            is_online = false;
        }

        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                is_online,
                last_seen: new Date().toISOString(),
            })
            .eq('id', user.id);

        if (updateError) {
            console.error('Error updating presence:', updateError);
            return NextResponse.json(
                { error: 'Failed to update presence' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in POST /api/auth/presence:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
