"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Shield, ShieldOff, Key, Trash2, Mail, CheckCircle2, XCircle, User, Crown, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { formatLastSeen } from "../FormatLastSeen";
import type { UserManagementState } from "../UseUserManagement";

export function UsersTable({ setUsers, setSelectedUser, actionMenuOpen, setActionMenuOpen, setShowModal, paginatedUsers, handleToggleStatus }: Pick<UserManagementState, "setUsers" | "setSelectedUser" | "actionMenuOpen" | "setActionMenuOpen" | "setShowModal" | "paginatedUsers" | "handleToggleStatus">) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                            User
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                            Role
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                            Status
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                            Joined
                        </th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-12 text-muted-foreground">
                                No users found
                            </td>
                        </tr>
                    ) : (
                        paginatedUsers.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-medium">
                                                    {user.full_name?.charAt(0) ||
                                                        user.email.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span
                                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                                                    user.is_online
                                                        ? "bg-emerald-500"
                                                        : "bg-gray-400"
                                                }`}
                                                title={user.is_online ? "Online" : `Last seen ${formatLastSeen(user.last_seen)}`}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">
                                                {user.full_name || "No name"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${user.role === "admin"
                                                ? "bg-primary/10 text-primary"
                                                : user.role === "client"
                                                    ? "bg-purple-500/10 text-purple-500"
                                                    : "bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        {user.role === "admin" && (
                                            <Shield className="w-3 h-3" />
                                        )}
                                        {user.role === "client" && (
                                            <Briefcase className="w-3 h-3" />
                                        )}
                                        {user.role === "user" && (
                                            <User className="w-3 h-3" />
                                        )}
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        {user.is_scrum_master && (
                                            <Crown className="w-3 h-3 text-amber-500 ml-1" />
                                        )}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${user.is_active
                                                ? "bg-green-500/10 text-green-500"
                                                : "bg-red-500/10 text-red-500"
                                                }`}
                                        >
                                            {user.is_active ? (
                                                <CheckCircle2 className="w-3 h-3" />
                                            ) : (
                                                <XCircle className="w-3 h-3" />
                                            )}
                                            {user.is_active ? "Active" : "Inactive"}
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                                                user.is_online
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-gray-500/10 text-gray-400"
                                            }`}
                                            title={user.is_online ? "Currently online" : `Last seen ${formatLastSeen(user.last_seen)}`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${
                                                    user.is_online
                                                        ? "bg-emerald-500 animate-pulse"
                                                        : "bg-gray-400"
                                                }`}
                                            />
                                            {user.is_online ? "Online" : "Offline"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="relative flex justify-end">
                                        <button
                                            onClick={() =>
                                                setActionMenuOpen(
                                                    actionMenuOpen === user.id ? null : user.id
                                                )
                                            }
                                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                        </button>

                                        <AnimatePresence>
                                            {actionMenuOpen === user.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowModal("reset-password");
                                                            setActionMenuOpen(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-secondary transition-colors"
                                                    >
                                                        <Key className="w-4 h-4" />
                                                        Reset Password
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowModal("change-role");
                                                            setActionMenuOpen(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-secondary transition-colors"
                                                    >
                                                        <Shield className="w-4 h-4" />
                                                        Change Role
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(user)}
                                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-secondary transition-colors"
                                                    >
                                                        {user.is_active ? (
                                                            <>
                                                                <ShieldOff className="w-4 h-4" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle2 className="w-4 h-4" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </button>
                                                    {user.role === "admin" && (
                                                        <button
                                                            onClick={async () => {
                                                                setActionMenuOpen(null);
                                                                try {
                                                                    if (user.is_scrum_master) {
                                                                        // Remove Scrum Master
                                                                        const response = await fetch(`/api/admin/scrum-master?userId=${user.id}`, {
                                                                            method: "DELETE",
                                                                        });
                                                                        if (response.ok) {
                                                                            setUsers((prev) =>
                                                                                prev.map((u) =>
                                                                                    u.id === user.id ? { ...u, is_scrum_master: false } : u
                                                                                )
                                                                            );
                                                                            toast.success(`Removed Scrum Master role from ${user.full_name}`);
                                                                        } else {
                                                                            toast.error("Failed to remove Scrum Master role");
                                                                        }
                                                                    } else {
                                                                        // Set as Scrum Master
                                                                        const response = await fetch("/api/admin/scrum-master", {
                                                                            method: "POST",
                                                                            headers: { "Content-Type": "application/json" },
                                                                            body: JSON.stringify({ userId: user.id }),
                                                                        });
                                                                        if (response.ok) {
                                                                            // Update all users - remove scrum master from others, add to this one
                                                                            setUsers((prev) =>
                                                                                prev.map((u) => ({
                                                                                    ...u,
                                                                                    is_scrum_master: u.id === user.id,
                                                                                }))
                                                                            );
                                                                            toast.success(`${user.full_name} is now the Scrum Master`);
                                                                        } else {
                                                                            toast.error("Failed to set Scrum Master");
                                                                        }
                                                                    }
                                                                } catch (error) {
                                                                    toast.error("Error updating Scrum Master");
                                                                    console.error(error);
                                                                }
                                                            }}
                                                            className={`flex items-center gap-2 w-full px-4 py-3 text-sm transition-colors ${user.is_scrum_master ? "text-amber-500 hover:bg-amber-500/10" : "hover:bg-secondary"}`}
                                                        >
                                                            <Crown className="w-4 h-4" />
                                                            {user.is_scrum_master ? "Remove Scrum Master" : "Set as Scrum Master"}
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            window.location.href = `mailto:${user.email}`;
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-secondary transition-colors"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                        Send Email
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowModal("delete");
                                                            setActionMenuOpen(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete User
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
