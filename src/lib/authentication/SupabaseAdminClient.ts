import { createClient } from '@supabase/supabase-js';

// Admin client with service role key for privileged operations (server only)
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase credentials:', {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceRoleKey
    });
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
