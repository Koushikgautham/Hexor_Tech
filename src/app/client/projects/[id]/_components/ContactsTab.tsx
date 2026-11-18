"use client";

import { Phone, Mail, User, Star } from "lucide-react";
import type { ClientProjectDetail as Project } from "@/types/ClientProject";

export function ContactsTab({ project }: { project: Project }) {
    return (
        <div className="space-y-4">
            {project.project_contacts && project.project_contacts.length > 0 ? (
                project.project_contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">{contact.name}</p>
                                    {contact.is_primary && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded text-xs font-medium">
                                            <Star className="w-3 h-3" />
                                            Primary
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">{contact.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {contact.email && (
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email
                                </a>
                            )}
                            {contact.phone && (
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call
                                </a>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No contacts available</p>
                </div>
            )}
        </div>
    );
}
