"use client";

import { Search, Filter } from "lucide-react";
import { UserRole } from "@/lib/authentication/UserProfileTypes";
import type { UserManagementState } from "../UseUserManagement";

export function UserFilters({ searchQuery, setSearchQuery, roleFilter, setRoleFilter, statusFilter, setStatusFilter }: Pick<UserManagementState, "searchQuery" | "setSearchQuery" | "roleFilter" | "setRoleFilter" | "statusFilter" | "setStatusFilter">) {
    return (
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
                    <option value="client">Clients</option>
                </select>
            </div>

            {/* Status Filter */}
            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value as "all" | "active" | "inactive" | "online" | "offline")
                }
                className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>
        </div>
    );
}
