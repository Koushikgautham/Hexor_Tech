"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck, ExternalLink } from "lucide-react";
import { useNotifications } from "./UseNotifications";
import { NotificationList } from "./NotificationList";

interface NotificationDropdownProps {
    isScrumMaster?: boolean;
}

export function NotificationDropdown({ isScrumMaster }: NotificationDropdownProps) {
    const {
        router,
        isOpen,
        setIsOpen,
        notifications,
        unreadCount,
        isLoading,
        dropdownRef,
        markAllAsRead,
        handleNotificationClick,
        formatTime,
    } = useNotifications();

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
                        <NotificationList notifications={notifications} handleNotificationClick={handleNotificationClick} formatTime={formatTime} isScrumMaster={isScrumMaster} />

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
