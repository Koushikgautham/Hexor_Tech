"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, CheckCheck, Clock, ExternalLink, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
    id: string;
    type: "task_assigned" | "task_updated" | "project_created";
    title: string;
    message: string | null;
    task_id: string | null;
    project_id: string | null;
    is_read: boolean;
    created_at: string;
    creator?: {
        id: string;
        full_name: string;
        email: string;
    };
    task?: {
        id: string;
        title: string;
        status: string;
        project_id: string;
    };
    project?: {
        id: string;
        name: string;
    };
}

interface NotificationDropdownProps {
    isScrumMaster?: boolean;
}

export function NotificationDropdown({ isScrumMaster }: NotificationDropdownProps) {
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

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full px-1"
                    >
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground">Notifications</h3>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    disabled={isLoading}
                                    className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                                >
                                    <CheckCheck className="w-3 h-3" />
                                    Mark all read
                                </button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                                    <Bell className="w-10 h-10 mb-2 opacity-50" />
                                    <p className="text-sm">No notifications yet</p>
                                    {isScrumMaster && (
                                        <p className="text-xs mt-1">
                                            You&apos;ll be notified when tasks are assigned
                                        </p>
                                    )}
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`flex gap-3 px-4 py-3 border-b border-border last:border-0 cursor-pointer transition-colors ${notification.is_read
                                                ? "bg-background hover:bg-secondary/30"
                                                : "bg-primary/5 hover:bg-primary/10"
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div
                                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notification.is_read
                                                    ? "bg-secondary"
                                                    : "bg-primary/10"
                                                }`}
                                        >
                                            {notification.type === "task_assigned" ? (
                                                <Check
                                                    className={`w-4 h-4 ${notification.is_read
                                                            ? "text-muted-foreground"
                                                            : "text-primary"
                                                        }`}
                                                />
                                            ) : (
                                                <Bell
                                                    className={`w-4 h-4 ${notification.is_read
                                                            ? "text-muted-foreground"
                                                            : "text-primary"
                                                        }`}
                                                />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm font-medium truncate ${notification.is_read
                                                        ? "text-muted-foreground"
                                                        : "text-foreground"
                                                    }`}
                                            >
                                                {notification.title}
                                            </p>
                                            {notification.message && (
                                                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                                    {notification.message}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="w-3 h-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    {formatTime(notification.created_at)}
                                                </span>
                                                {notification.project && (
                                                    <>
                                                        <span className="text-muted-foreground">•</span>
                                                        <span className="text-xs text-muted-foreground truncate">
                                                            {notification.project.name}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Unread indicator */}
                                        {!notification.is_read && (
                                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary self-center" />
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="px-4 py-2 border-t border-border bg-secondary/30">
                                <button
                                    onClick={() => {
                                        router.push("/admin/projects");
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-center text-xs text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1"
                                >
                                    View all projects
                                    <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
