"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, DollarSign } from "lucide-react";
import type { Invoice } from "@/types/Invoice";

// Invoice Form Component
export function InvoiceForm({
    invoice,
    onSubmit,
    onCancel,
}: {
    invoice?: Invoice;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}) {
    const [formData, setFormData] = React.useState({
        name: invoice?.name || "",
        description: invoice?.description || "",
        file_url: invoice?.file_url || "",
        file_name: invoice?.file_name || "",
        amount: invoice?.amount?.toString() || "",
        status: invoice?.status || "pending",
        due_date: invoice?.due_date || "",
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                amount: formData.amount ? parseFloat(formData.amount) : null,
            });
        } finally {
            setLoading(false);
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
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Invoice Name</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g., Q1 2026 Invoice"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                    <textarea
                        placeholder="Invoice description (optional)"
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">File URL</label>
                    <input
                        type="url"
                        required
                        placeholder="https://..."
                        value={formData.file_url}
                        onChange={(e) => setFormData((p) => ({ ...p, file_url: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">File Name</label>
                    <input
                        type="text"
                        required
                        placeholder="invoice.pdf"
                        value={formData.file_name}
                        onChange={(e) => setFormData((p) => ({ ...p, file_name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Amount</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData((p) => ({ ...p, amount: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as any }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Due Date</label>
                    <input
                        type="date"
                        value={formData.due_date}
                        onChange={(e) => setFormData((p) => ({ ...p, due_date: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
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
                            {invoice ? "Updating..." : "Creating..."}
                        </>
                    ) : (
                        invoice ? "Update Invoice" : "Create Invoice"
                    )}
                </button>
            </div>
        </motion.form>
    );
}
