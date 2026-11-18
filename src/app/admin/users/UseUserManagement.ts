"use client";

import * as React from "react";
import { toast } from "sonner";
import { UserProfile, UserRole } from "@/lib/authentication/UserProfileTypes";
import { createClient } from "@/lib/authentication/SupabaseBrowserClient";

export function useUserManagement() {
    const [users, setUsers] = React.useState<UserProfile[]>([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [roleFilter, setRoleFilter] = React.useState<"all" | UserRole>("all");
    const [statusFilter, setStatusFilter] = React.useState<
        "all" | "active" | "inactive" | "online" | "offline"
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
    const [isFetching, setIsFetching] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const usersPerPage = 10;

    // Fetch users on mount
    React.useEffect(() => {
        fetchUsers();
    }, []);

    // Poll for presence updates every 30 seconds
    React.useEffect(() => {
        const pollInterval = setInterval(() => {
            fetchUsers(false);
        }, 30000);

        return () => clearInterval(pollInterval);
    }, []);

    const fetchUsers = async (showLoading = true) => {
        if (showLoading) setIsFetching(true);
        try {
            const response = await fetch("/api/admin/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users || []);
            } else {
                if (showLoading) toast.error("Failed to fetch users");
            }
        } catch (error) {
            console.error(error);
            if (showLoading) toast.error("Error fetching users");
        } finally {
            if (showLoading) setIsFetching(false);
        }
    };

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
                (statusFilter === "inactive" && !user.is_active) ||
                (statusFilter === "online" && user.is_online) ||
                (statusFilter === "offline" && !user.is_online);
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    // Reset pagination when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter, statusFilter]);

    // Admin Actions
    const handleResetPassword = async () => {
        if (!selectedUser) return;
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(
                selectedUser.email,
                {
                    redirectTo: `${window.location.origin}/authentication/confirm?type=recovery`,
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
            const response = await fetch(`/api/admin/users/${selectedUser.id}/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok && data.user) {
                // Use the saved row: the database may also have changed other
                // fields (e.g. scrum master is cleared when an admin is demoted).
                const updated = data.user as UserProfile;
                setUsers((prev) =>
                    prev.map((u) => (u.id === updated.id ? { ...u, ...updated, is_online: u.is_online } : u))
                );
                toast.success(
                    `${selectedUser.full_name || selectedUser.email}'s role changed to ${newRole}`
                );
                setShowModal(null);
                setSelectedUser(null);
            } else {
                toast.error(data.error || "Failed to change role");
            }
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
            // Using the status update API if it exists, otherwise defaulting to local update for UI
            const newStatus = !user.is_active;
            const response = await fetch(`/api/admin/users/${user.id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_active: newStatus }),
            });

            if (response.ok) {
                setUsers((prev) =>
                    prev.map((u) =>
                        u.id === user.id ? { ...u, is_active: newStatus } : u
                    )
                );
                toast.success(
                    `${user.full_name} ${newStatus ? "activated" : "deactivated"}`
                );
            } else {
                // Determine if it was just because the route doesn't exist yet
                // For now, we'll optimistically update if API fails (or implement route later)
                // But ideally, we should implement the route.
                // Assuming route exists based on previous file search showing `users/[id]/status/route.ts`
                throw new Error("Failed to update status");
            }
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
            const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
                toast.success(`${selectedUser.full_name} deleted successfully`);
                setShowModal(null);
                setSelectedUser(null);
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (error) {
            toast.error("Failed to delete user");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        users,
        setUsers,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        selectedUser,
        setSelectedUser,
        actionMenuOpen,
        setActionMenuOpen,
        showModal,
        setShowModal,
        isLoading,
        setIsLoading,
        isFetching,
        setIsFetching,
        currentPage,
        setCurrentPage,
        usersPerPage,
        fetchUsers,
        filteredUsers,
        totalPages,
        paginatedUsers,
        handleResetPassword,
        handleChangeRole,
        handleToggleStatus,
        handleDeleteUser,
    };
}

export type UserManagementState = ReturnType<typeof useUserManagement>;

// Create client instance for this page
export const supabase = createClient();
