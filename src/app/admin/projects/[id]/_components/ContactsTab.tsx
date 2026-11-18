"use client";

import { Plus, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { ContactItem } from "./ContactItem";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function ContactsTab({ users, contacts, showContactForm, setShowContactForm, handleCreateContact, handleUpdateContact, handleDeleteContact }: Pick<ProjectDetailState, "users" | "contacts" | "showContactForm" | "setShowContactForm" | "handleCreateContact" | "handleUpdateContact" | "handleDeleteContact">) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-foreground">Points of Contact</h3>
                    <p className="text-sm text-muted-foreground">Team members clients can reach out to</p>
                </div>
                <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Contact
                </button>
            </div>

            {showContactForm && (
                <ContactForm
                    users={users}
                    onSubmit={handleCreateContact}
                    onCancel={() => setShowContactForm(false)}
                />
            )}

            {contacts.length > 0 ? (
                <div className="grid gap-3">
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            users={users}
                            onUpdate={(updates) => handleUpdateContact(contact.id, updates)}
                            onDelete={() => handleDeleteContact(contact.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">No contacts added</h3>
                    <p className="text-sm text-muted-foreground mb-4">Add team members as points of contact</p>
                    <button
                        onClick={() => setShowContactForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Contact
                    </button>
                </div>
            )}
        </div>
    );
}
