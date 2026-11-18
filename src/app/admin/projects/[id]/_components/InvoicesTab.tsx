"use client";

import { Plus, Receipt } from "lucide-react";
import { InvoiceForm } from "./InvoiceForm";
import { InvoiceItem } from "./InvoiceItem";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function InvoicesTab({ invoices, showInvoiceForm, setShowInvoiceForm, handleCreateInvoice, handleUpdateInvoice, handleDeleteInvoice }: Pick<ProjectDetailState, "invoices" | "showInvoiceForm" | "setShowInvoiceForm" | "handleCreateInvoice" | "handleUpdateInvoice" | "handleDeleteInvoice">) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-foreground">Project Invoices</h3>
                    <p className="text-sm text-muted-foreground">Manage invoices for clients</p>
                </div>
                <button
                    onClick={() => setShowInvoiceForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Invoice
                </button>
            </div>

            {showInvoiceForm && (
                <InvoiceForm
                    onSubmit={handleCreateInvoice}
                    onCancel={() => setShowInvoiceForm(false)}
                />
            )}

            {invoices.length > 0 ? (
                <div className="grid gap-3">
                    {invoices.map((invoice) => (
                        <InvoiceItem
                            key={invoice.id}
                            invoice={invoice}
                            onUpdate={(updates) => handleUpdateInvoice(invoice.id, updates)}
                            onDelete={() => handleDeleteInvoice(invoice.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Receipt className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">No invoices yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Create invoices for your clients</p>
                    <button
                        onClick={() => setShowInvoiceForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Invoice
                    </button>
                </div>
            )}
        </div>
    );
}
