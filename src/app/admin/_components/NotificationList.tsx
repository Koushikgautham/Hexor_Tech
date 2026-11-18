"use client";

import { motion } from "framer-motion";
import { Bell, Check, Clock, Lock, FileSpreadsheet } from "lucide-react";
import type { NotificationsState } from "./UseNotifications";

export function NotificationList({ notifications, handleNotificationClick, formatTime, isScrumMaster }: Pick<NotificationsState, "notifications" | "handleNotificationClick" | "formatTime"> & { isScrumMaster: boolean | undefined }) {
    return (
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
                            {notification.type === "task_assigned" && (
                                <Check
                                    className={`w-4 h-4 ${notification.is_read
                                            ? "text-muted-foreground"
                                            : "text-primary"
                                        }`}
                                />
                            )}
                            {notification.type === "sheet_access_request" && (
                                <Lock
                                    className={`w-4 h-4 ${notification.is_read
                                            ? "text-muted-foreground"
                                            : "text-blue-500"
                                        }`}
                                />
                            )}
                            {notification.type === "sheet_access_response" && (
                                <FileSpreadsheet
                                    className={`w-4 h-4 ${notification.is_read
                                            ? "text-muted-foreground"
                                            : "text-green-500"
                                        }`}
                                />
                            )}
                            {!["task_assigned", "sheet_access_request", "sheet_access_response"].includes(notification.type) && (
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
    );
}
