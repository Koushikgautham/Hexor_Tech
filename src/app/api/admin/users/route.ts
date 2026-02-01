import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const adminClient = createAdminClient();

        if (!adminClient) {
            return NextResponse.json(
                { error: 'Admin client not configured' },
                { status: 500 }
            );
        }

        // Get all users from profiles table
        const { data: profiles, error } = await adminClient
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching users:', error);
            return NextResponse.json(
                { error: 'Failed to fetch users' },
                { status: 500 }
            );
        }

        // Compute effective online status based on last_seen threshold
        // Users are considered offline if last_seen > 2 minutes ago
        const TWO_MINUTES_MS = 2 * 60 * 1000;
        const now = Date.now();

        const usersWithPresence = (profiles || []).map(profile => ({
            ...profile,
            is_online: profile.is_online && profile.last_seen
                ? (now - new Date(profile.last_seen).getTime()) < TWO_MINUTES_MS
                : false,
        }));

        return NextResponse.json({ users: usersWithPresence });
    } catch (error) {
        console.error('Error in GET /api/admin/users:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const adminClient = createAdminClient();

        if (!adminClient) {
            return NextResponse.json(
                { error: 'Admin client not configured' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { email, password, fullName, role } = body;

        // Create user in auth
        const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: fullName,
            },
        });

        if (authError) {
            console.error('Error creating user:', authError);
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        // Create or update profile (upsert to handle potential race conditions or triggers)
        const { error: profileError } = await adminClient
            .from('profiles')
            .upsert({
                id: authData.user.id,
                email,
                full_name: fullName,
                role: role || 'user',
                is_active: true,
            });

        if (profileError) {
            console.error('Error creating profile:', profileError);
            // Try to delete the auth user if profile creation failed
            await adminClient.auth.admin.deleteUser(authData.user.id);
            return NextResponse.json(
                { error: `Failed to create user profile: ${profileError.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            user: authData.user
        });
    } catch (error) {
        console.error('Error in POST /api/admin/users:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
