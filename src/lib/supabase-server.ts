// DEPRECATED: Use @/lib/supabase/server instead
// This file is kept for backward compatibility

import { createClient as createBrowserClient } from '@supabase/supabase-js';

export { createClient as createServerClient } from './supabase/server';

// Admin client with service role key for privileged operations
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createBrowserClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
