"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    MoreVertical,
    UserPlus,
    Shield,
    ShieldOff,
    Key,
    Trash2,
    Mail,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Loader2,
    X,
    User,
    AlertTriangle,
    Crown,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { UserProfile, UserRole } from "@/lib/auth/types";

// Create client instance for this page
const supabase = createClient();

// Mock data for demonstration - in production, this would come from Supabase
const mockUsers: UserProfile[] = [
    {
        id: "1",
        email: "admin@hexora.com",
        full_name: "Admin User",
        role: "admin",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        avatar_url: null,
        is_active: true,
    },
    {
        id: "2",
        email: "john@example.com",
        full_name: "John Doe",
        role: "user",
        created_at: "2024-01-15T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z",
        avatar_url: null,
        is_active: true,
    },
    {
        id: "3",
        email: "sarah@example.com",
        full_name: "Sarah Smith",
        role: "user",
        created_at: "2024-02-01T00:00:00Z",
        updated_at: "2024-02-01T00:00:00Z",
        avatar_url: null,
        is_active: true,
    },
    {
        id: "4",
        email: "mike@example.com",
        full_name: "Mike Johnson",
        role: "user",
        created_at: "2024-02-15T00:00:00Z",
        updated_at: "2024-02-15T00:00:00Z",
        avatar_url: null,
        is_active: false,
    },
    {
        id: "5",
        email: "alice@example.com",
        full_name: "Alice Brown",
        role: "user",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-01T00:00:00Z",
        avatar_url: null,
        is_active: true,
    },
];

export default function UsersPage() {
    const [users, setUsers] = React.useState<UserProfile[]>(mockUsers);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [roleFilter, setRoleFilter] = React.useState<"all" | UserRole>("all");
    const [statusFilter, setStatusFilter] = React.useState<
        "all" | "active" | "inactive"
    >("all");
    const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(
        null
    );
    const [actionMenuOpen, setActionMenuOpen] = React.useState<string | null>(
        null
    );
    const [showModal, setShowModal] = React.useState<
        | "reset-password"
        | "change-role"
        | "delete"
        | "add-user"
        | null
    >(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const usersPerPage = 10;

    // Filter users based on search and filters
    const filteredUsers = React.useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
                    false);
            const matchesRole = roleFilter === "all" || user.role === roleFilter;
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && user.is_active) ||
                (statusFilter === "inactive" && !user.is_active);
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    // Admin Actions
    const handleResetPassword = async () => {
        if (!selectedUser) return;
        setIsLoading(true);
        try {
            // In production, use Supabase Admin API to send reset email
            const { error } = await supabase.auth.resetPasswordForEmail(
                selectedUser.email,
                {
                    redirectTo: `${window.location.origin}/auth/reset-password`,
                }
            );
            if (error) throw error;
            toast.success(`Password reset email sent to ${selectedUser.email}`);
            setShowModal(null);
            setSelectedUser(null);
        } catch (error) {
            toast.error("Failed to send reset email");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeRole = async (newRole: UserRole) => {
        if (!selectedUser) return;
        setIsLoading(true);
        try {
            // In production, update via Supabase
            setUsers((prev) =>
                prev.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u))
            );
            toast.success(
                `${selectedUser.full_name}'s role changed to ${newRole}`
            );
            setShowModal(null);
            setSelectedUser(null);
        } catch (error) {
            toast.error("Failed to change role");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = async (user: UserProfile) => {
        setIsLoading(true);
        try {
            // In production, update via Supabase
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === user.id ? { ...u, is_active: !u.is_active } : u
                )
            );
            toast.success(
                `${user.full_name} ${user.is_active ? "deactivated" : "activated"}`
            );
        } catch (error) {
            toast.error("Failed to update status");
            console.error(error);
        } finally {
            setIsLoading(false);
            setActionMenuOpen(null);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;
        setIsLoading(true);
        try {
            // In production, delete via Supabase Admin API
            setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
            toast.success(`${selectedUser.full_name} deleted successfully`);
            setShowModal(null);
            setSelectedUser(null);
        } catch (error) {
            toast.error("Failed to delete user");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        User Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage all users, roles, and permissions
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal("add-user")}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
                >
                    <UserPlus className="w-4 h-4" />
                    Add User
                </motion.button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                </div>

                {/* Role Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(e.target.value as "all" | UserRole)
                        }
                        className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admins</option>
                        <option value="user">Users</option>
                    </select>
                </div>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value as "all" | "active" | "inactive")
                    }
                    className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
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
                            {paginatedUsers.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-medium">
                                                    {user.full_name?.charAt(0) ||
                                                        user.email.charAt(0).toUpperCase()}
                                                </span>
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
                                                : "bg-secondary text-muted-foreground"
                                                }`}
                                        >
                                            {user.role === "admin" && (
                                                <Shield className="w-3 h-3" />
                                            )}
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            {user.is_scrum_master && (
                                                <Crown className="w-3 h-3 text-amber-500 ml-1" />
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                            Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
                            {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
                            {filteredUsers.length} users
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }
                                disabled={currentPage === totalPages}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowModal(null);
                            setSelectedUser(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl"
                        >
                            {/* Reset Password Modal */}
                            {showModal === "reset-password" && selectedUser && (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-xl">
                                                <Key className="w-5 h-5 text-primary" />
                                            </div>
                                            <h2 className="text-lg font-semibold text-foreground">
                                                Reset Password
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setShowModal(null)}
                                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        Send a password reset email to{" "}
                                        <span className="text-foreground font-medium">
                                            {selectedUser.email}
                                        </span>
                                        ?
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowModal(null)}
                                            className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleResetPassword}
                                            disabled={isLoading}
                                            className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                "Send Reset Email"
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Change Role Modal */}
                            {showModal === "change-role" && selectedUser && (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-xl">
                                                <Shield className="w-5 h-5 text-primary" />
                                            </div>
                                            <h2 className="text-lg font-semibold text-foreground">
                                                Change Role
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setShowModal(null)}
                                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        Change role for{" "}
                                        <span className="text-foreground font-medium">
                                            {selectedUser.full_name}
                                        </span>
                                    </p>
                                    <div className="space-y-2 mb-6">
                                        <button
                                            onClick={() => handleChangeRole("admin")}
                                            disabled={isLoading || selectedUser.role === "admin"}
                                            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${selectedUser.role === "admin"
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <Shield className="w-5 h-5 text-primary" />
                                            <div className="text-left">
                                                <p className="font-medium text-foreground">Admin</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Full access to all features
                                                </p>
                                            </div>
                                            {selectedUser.role === "admin" && (
                                                <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleChangeRole("user")}
                                            disabled={isLoading || selectedUser.role === "user"}
                                            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${selectedUser.role === "user"
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <User className="w-5 h-5 text-muted-foreground" />
                                            <div className="text-left">
                                                <p className="font-medium text-foreground">User</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Standard user access
                                                </p>
                                            </div>
                                            {selectedUser.role === "user" && (
                                                <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                                            )}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(null)}
                                        className="w-full py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                            {/* Delete User Modal */}
                            {showModal === "delete" && selectedUser && (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-destructive/10 rounded-xl">
                                                <AlertTriangle className="w-5 h-5 text-destructive" />
                                            </div>
                                            <h2 className="text-lg font-semibold text-foreground">
                                                Delete User
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setShowModal(null)}
                                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-muted-foreground mb-2">
                                        Are you sure you want to delete{" "}
                                        <span className="text-foreground font-medium">
                                            {selectedUser.full_name}
                                        </span>
                                        ?
                                    </p>
                                    <p className="text-sm text-destructive mb-6">
                                        This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowModal(null)}
                                            className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteUser}
                                            disabled={isLoading}
                                            className="flex-1 py-2.5 bg-destructive text-white rounded-xl font-medium hover:bg-destructive/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Add User Modal */}
                            {showModal === "add-user" && (
                                <AddUserForm
                                    onClose={() => setShowModal(null)}
                                    onSuccess={(newUser) => {
                                        setUsers((prev) => [...prev, newUser]);
                                        setShowModal(null);
                                        toast.success("User added successfully!");
                                    }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Add User Form Component
function AddUserForm({
    onClose,
    onSuccess,
}: {
    onClose: () => void;
    onSuccess: (user: UserProfile) => void;
}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email: "",
        fullName: "",
        password: "",
        role: "user" as UserRole,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // In production, create user via Supabase Admin API
            const newUser: UserProfile = {
                id: Date.now().toString(),
                email: formData.email,
                full_name: formData.fullName,
                role: formData.role,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                avatar_url: null,
                is_active: true,
            };
            onSuccess(newUser);
        } catch (error) {
            toast.error("Failed to create user");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <UserPlus className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Add User</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-foreground">
                        Full Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, fullName: e.target.value }))
                        }
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground">
                        Temporary Password
                    </label>
                    <input
                        type="password"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, password: e.target.value }))
                        }
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <select
                        value={formData.role}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, role: e.target.value as UserRole }))
                        }
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create User"
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
