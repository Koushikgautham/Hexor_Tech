import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all admin users for task assignment
export async function GET() {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is an admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all admin users
    const { data: admins, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url')
      .eq('role', 'admin')
      .eq('is_active', true)
      .order('full_name');

    if (error) {
      console.error('Error fetching admin users:', error);
      return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 });
    }

    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error in GET /api/admin/team:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
