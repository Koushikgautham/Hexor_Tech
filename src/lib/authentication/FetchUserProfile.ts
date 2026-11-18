import { createClient } from "./SupabaseBrowserClient";
import type { UserProfile } from "./UserProfileTypes";

const supabase = createClient();

// Fetch a user's profile row from the database, giving up after 15 seconds.
export async function fetchProfileById(userId: string): Promise<UserProfile | null> {
    try {
        let timeoutId: ReturnType<typeof setTimeout>;

        const fetchPromise = supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()
            .then((result: { data: unknown; error: unknown }) => {
                clearTimeout(timeoutId);
                return result;
            });

        const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) => {
            timeoutId = setTimeout(() => {
                resolve({ data: null, error: { message: 'Profile fetch timeout after 15s' } });
            }, 15000);
        });

        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

        if (error) {
            console.warn("Profile fetch issue:", error.message || error);
            return null;
        }

        return data as UserProfile;
    } catch (error) {
        console.error("Exception fetching profile:", error);
        return null;
    }
}
