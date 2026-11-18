"use client";

import { Trash2, Loader2, X, AlertTriangle } from "lucide-react";
import type { UserProfile } from "@/lib/authentication/UserProfileTypes";
import type { UserManagementState } from "../UseUserManagement";

export function DeleteUserModal({ selectedUser, setShowModal, isLoading, handleDeleteUser }: Pick<UserManagementState, "setShowModal" | "isLoading" | "handleDeleteUser"> & { selectedUser: UserProfile }) {
    return (
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
    );
}
