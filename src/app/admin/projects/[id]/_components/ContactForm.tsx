"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { TeamUser, Contact } from "@/types/Project";

// Contact Form Component
export function ContactForm({
    contact,
    users,
    onSubmit,
    onCancel,
}: {
    contact?: Contact;
    users: TeamUser[];
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}) {
    const [formData, setFormData] = React.useState({
        name: contact?.name || "",
        role: contact?.role || "",
        email: contact?.email || "",
        phone: contact?.phone || "",
        user_id: contact?.user_id || "",
        is_primary: contact?.is_primary || false,
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fill from selected team member
    const handleUserSelect = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setFormData(p => ({
                ...p,
                user_id: userId,
                name: user.full_name,
                email: user.email,
            }));
        } else {
            setFormData(p => ({ ...p, user_id: "" }));
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-secondary/30 border border-border rounded-xl p-5 space-y-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Link to Team Member (Optional)</label>
                    <select
                        value={formData.user_id}
                        onChange={(e) => handleUserSelect(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="">Select a team member or enter manually</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.full_name} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                    <input
                        type="text"
                        required
                        placeholder="Contact name"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Role</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g., Project Manager"
                        value={formData.role}
                        onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                    <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.is_primary}
                            onChange={(e) => setFormData((p) => ({ ...p, is_primary: e.target.checked }))}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                        />
                        <span className="text-sm text-foreground">Set as primary contact</span>
                    </label>
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {contact ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        contact ? "Update Contact" : "Add Contact"
                    )}
                </button>
            </div>
        </motion.form>
    );
}
