"use client";

import * as React from "react";
import { UserPlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { UserProfile, UserRole } from "@/lib/authentication/UserProfileTypes";

// Add User Form Component
export function AddUserForm({
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
            const response = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                    role: formData.role,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create user");
            }

            // The API returns { success: true, user: AuthUser }. We need to construct the UserProfile.
            // But actually we probably want to re-fetch or construct it optimistically.
            // Let's check what the API returns exactly.
            // It returns { success: true, user: ... } where user is the Auth user object.

            const newUser: UserProfile = {
                id: data.user.id,
                email: formData.email,
                full_name: formData.fullName,
                role: formData.role,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                avatar_url: null,
                is_active: true,
                last_seen: null,
                is_online: false,
                is_scrum_master: false,
            };

            onSuccess(newUser);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create user");
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
                    <h2 className="text-lg font-semibold text-foreground">
                        Add New User
                    </h2>
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
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="••••••••"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Role
                    </label>
                    <select
                        value={formData.role}
                        onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value as UserRole })
                        }
                        className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="user">User</option>
                        <option value="client">Client</option>
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
