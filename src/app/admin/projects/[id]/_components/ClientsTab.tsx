"use client";

import { User, Users, UserPlus, X } from "lucide-react";
import { ClientSelector } from "./ClientSelector";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function ClientsTab({ projectId, projectClients, showClientSelector, setShowClientSelector, handleAddClient, handleRemoveClient }: Pick<ProjectDetailState, "projectId" | "projectClients" | "showClientSelector" | "setShowClientSelector" | "handleAddClient" | "handleRemoveClient">) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-foreground">Project Clients</h3>
                    <p className="text-sm text-muted-foreground">Manage clients who can access this project</p>
                </div>
                <button
                    onClick={() => setShowClientSelector(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    Add Client
                </button>
            </div>

            {showClientSelector && (
                <ClientSelector
                    projectId={projectId}
                    existingClientIds={projectClients.map(pc => pc.client.id)}
                    onSelect={handleAddClient}
                    onClose={() => setShowClientSelector(false)}
                />
            )}

            {projectClients.length > 0 ? (
                <div className="grid gap-3">
                    {projectClients.map((pc) => (
                        <div
                            key={pc.id}
                            className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{pc.client.full_name || "Unnamed"}</p>
                                    <p className="text-sm text-muted-foreground">{pc.client.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveClient(pc.client.id)}
                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">No clients linked</h3>
                    <p className="text-sm text-muted-foreground mb-4">Add clients to give them access to this project</p>
                    <button
                        onClick={() => setShowClientSelector(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Client
                    </button>
                </div>
            )}
        </div>
    );
}
