"use client";

import { Trash2, Receipt, Download } from "lucide-react";
import type { Invoice } from "@/types/Invoice";

// Invoice Item Component
export function InvoiceItem({
    invoice,
    onUpdate,
    onDelete,
}: {
    invoice: Invoice;
    onUpdate: (updates: any) => void;
    onDelete: () => void;
}) {
    const statusConfig = {
        pending: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        paid: { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
        overdue: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    };

    const status = statusConfig[invoice.status];

    return (
        <div className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <Receipt className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">{invoice.name}</h4>
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${status.bg} ${status.color} ${status.border}`}>
                            {invoice.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {invoice.amount && (
                            <span className="font-medium text-foreground">${invoice.amount.toFixed(2)}</span>
                        )}
                        {invoice.due_date && (
                            <span>Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <select
                    value={invoice.status}
                    onChange={(e) => onUpdate({ status: e.target.value })}
                    className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                </select>
                <a
                    href={invoice.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    title="Download"
                >
                    <Download className="w-4 h-4 text-muted-foreground" />
                </a>
                <button
                    onClick={onDelete}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4 text-red-500" />
                </button>
            </div>
        </div>
    );
}
