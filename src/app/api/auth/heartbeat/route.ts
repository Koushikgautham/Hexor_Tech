import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                last_seen: new Date().toISOString(),
                is_online: true,
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
        console.error('Error in POST /api/auth/heartbeat:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
