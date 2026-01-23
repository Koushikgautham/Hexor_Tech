/**
 * SUPABASE BROWSER CLIENT
 * 
 * This file creates a SINGLETON Supabase client for use in the browser.
 * 
 * WHY SINGLETON?
 * - Ensures all components share the same session state
 * - Prevents multiple auth listeners from being created
 * - Avoids race conditions between different client instances
 * 
 * WHY THIS PREVENTS BUGS:
 * - Old code created new clients in each component
 * - Each client had its own session state
 * - This caused inconsistent auth states across the app
 * - Singleton ensures ONE source of truth
 */

import { createBrowserClient, SupabaseClient } from "@supabase/ssr";

// Singleton instance - created once, reused everywhere
let browserClient: SupabaseClient | null = null;

/**
 * Get the Supabase browser client
 * 
 * This function returns the same client instance every time it's called.
 * The client is only created once on the first call.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
    if (browserClient) {
        return browserClient;
    }

    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            "Missing Supabase environment variables. " +
            "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
        );
    }

    // Create the client with SSR-safe configuration
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);

    return browserClient;
}
