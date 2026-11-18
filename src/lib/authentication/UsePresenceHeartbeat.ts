import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";

// Heartbeat for online presence tracking: pings /api/auth/heartbeat every 60s
// while the tab is visible, and marks the user offline when the tab closes.
export function usePresenceHeartbeat(user: User | null) {
    useEffect(() => {
        if (!user) return;

        let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

        const sendHeartbeat = async () => {
            try {
                await fetch('/api/auth/heartbeat', { method: 'POST' });
            } catch (error) {
                console.error('Heartbeat failed:', error);
            }
        };

        const setOffline = () => {
            if (navigator.sendBeacon) {
                const blob = new Blob(
                    [JSON.stringify({ is_online: false })],
                    { type: 'application/json' }
                );
                navigator.sendBeacon('/api/auth/presence', blob);
            } else {
                fetch('/api/auth/presence', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_online: false }),
                    keepalive: true,
                }).catch(() => {});
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                sendHeartbeat();
                if (heartbeatInterval) clearInterval(heartbeatInterval);
                heartbeatInterval = setInterval(sendHeartbeat, 60000);
            } else {
                if (heartbeatInterval) {
                    clearInterval(heartbeatInterval);
                    heartbeatInterval = null;
                }
            }
        };

        // Send initial heartbeat immediately
        sendHeartbeat();

        // Start interval (every 60 seconds)
        heartbeatInterval = setInterval(sendHeartbeat, 60000);

        // Listen for tab visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Listen for page unload (tab close, browser close)
        window.addEventListener('beforeunload', setOffline);

        return () => {
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', setOffline);
        };
    }, [user]);
}
