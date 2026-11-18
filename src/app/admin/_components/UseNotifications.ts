"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Notification } from "@/types/Notification";

export function useNotifications() {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Fetch notifications
    const fetchNotifications = React.useCallback(async () => {
        try {
            const response = await fetch("/api/notifications");
            if (response.ok) {
                const data = await response.json();
                setNotifications(data.notifications || []);
                setUnreadCount(data.unreadCount || 0);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }, []);

    // Fetch on mount and periodically
    React.useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds for new notifications
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Mark notifications as read
    const markAsRead = async (notificationIds: string[]) => {
        try {
            await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notificationIds }),
            });
            setNotifications((prev) =>
                prev.map((n) =>
                    notificationIds.includes(n.id) ? { ...n, is_read: true } : n
                )
            );
            setUnreadCount((prev) => Math.max(0, prev - notificationIds.length));
        } catch (error) {
            console.error("Error marking notifications read:", error);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        setIsLoading(true);
        try {
            await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ markAllRead: true }),
            });
            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking all notifications read:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle notification click
    const handleNotificationClick = (notification: Notification) => {
        if (!notification.is_read) {
            markAsRead([notification.id]);
        }

        // Navigate to the relevant page
        if (notification.task_id && notification.project_id) {
            router.push(`/admin/projects?view=${notification.project_id}`);
        } else if (notification.project_id) {
            router.push(`/admin/projects?view=${notification.project_id}`);
        }

        setIsOpen(false);
    };

    // Format relative time
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return {
        router,
        isOpen,
        setIsOpen,
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
        isLoading,
        setIsLoading,
        dropdownRef,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        handleNotificationClick,
        formatTime,
    };
}

export type NotificationsState = ReturnType<typeof useNotifications>;
