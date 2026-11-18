"use client";

import * as React from "react";
import { Edit, Trash2, User, Phone, Mail, Star } from "lucide-react";
import type { TeamUser, Contact } from "@/types/Project";
import { ContactForm } from "./ContactForm";

// Contact Item Component
export function ContactItem({
    contact,
    users,
    onUpdate,
    onDelete,
}: {
    contact: Contact;
    users: TeamUser[];
    onUpdate: (updates: any) => void;
    onDelete: () => void;
}) {
    const [isEditing, setIsEditing] = React.useState(false);

    return (
        <div className="bg-secondary/30 border border-border rounded-xl p-4 hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground truncate">{contact.name}</h4>
                            {contact.is_primary && (
                                <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-lg text-xs font-medium">
                                    <Star className="w-3 h-3" />
                                    Primary
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{contact.role}</p>
                        <div className="flex items-center gap-4 text-sm">
                            {contact.email && (
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="w-3.5 h-3.5" />
                                    {contact.email}
                                </a>
                            )}
                            {contact.phone && (
                                <a href={`tel:${contact.phone}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                    <Phone className="w-3.5 h-3.5" />
                                    {contact.phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="mt-4 pt-4 border-t border-border">
                    <ContactForm
                        contact={contact}
                        users={users}
                        onSubmit={async (data) => {
                            await onUpdate(data);
                            setIsEditing(false);
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            )}
        </div>
    );
}
