"use client";

import { Key, Loader2, X } from "lucide-react";
import type { UserProfile } from "@/lib/authentication/UserProfileTypes";
import type { UserManagementState } from "../UseUserManagement";

export function ResetPasswordModal({ selectedUser, setShowModal, isLoading, handleResetPassword }: Pick<UserManagementState, "setShowModal" | "isLoading" | "handleResetPassword"> & { selectedUser: UserProfile }) {
    return (
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
    );
}
