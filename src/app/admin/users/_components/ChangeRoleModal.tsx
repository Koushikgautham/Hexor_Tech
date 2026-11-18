"use client";

import { Shield, CheckCircle2, X, User, Briefcase } from "lucide-react";
import type { UserProfile } from "@/lib/authentication/UserProfileTypes";
import type { UserManagementState } from "../UseUserManagement";

export function ChangeRoleModal({ selectedUser, setShowModal, isLoading, handleChangeRole }: Pick<UserManagementState, "setShowModal" | "isLoading" | "handleChangeRole"> & { selectedUser: UserProfile }) {
    return (
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
                    onClick={() => handleChangeRole("client")}
                    disabled={isLoading || selectedUser.role === "client"}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${selectedUser.role === "client"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-border hover:border-purple-500/50"
                        }`}
                >
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    <div className="text-left">
                        <p className="font-medium text-foreground">Client</p>
                        <p className="text-xs text-muted-foreground">
                            Client dashboard access
                        </p>
                    </div>
                    {selectedUser.role === "client" && (
                        <CheckCircle2 className="w-5 h-5 text-purple-500 ml-auto" />
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
    );
}
