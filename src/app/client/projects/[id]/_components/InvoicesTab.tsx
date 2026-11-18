"use client";

import { Clock, FileText, CheckCircle2, Download } from "lucide-react";
import type { ClientProjectDetail as Project } from "@/types/ClientProject";

export function InvoicesTab({ project }: { project: Project }) {
    return (
        <div className="space-y-4">
            {project.project_invoices && project.project_invoices.length > 0 ? (
                project.project_invoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${
                                invoice.status === "paid"
                                    ? "bg-green-500/10"
                                    : invoice.status === "overdue"
                                    ? "bg-red-500/10"
                                    : "bg-orange-500/10"
                            }`}>
                                {invoice.status === "paid" ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Clock className="w-5 h-5 text-orange-500" />
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-foreground">{invoice.name}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {invoice.amount && <span>${invoice.amount.toFixed(2)}</span>}
                                    {invoice.due_date && (
                                        <>
                                            <span>•</span>
                                            <span>Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                invoice.status === "paid"
                                    ? "bg-green-500/10 text-green-500"
                                    : invoice.status === "overdue"
                                    ? "bg-red-500/10 text-red-500"
                                    : "bg-orange-500/10 text-orange-500"
                            }`}>
                                {invoice.status}
                            </span>
                            <a
                                href={invoice.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                            >
                                <Download className="w-5 h-5 text-muted-foreground" />
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No invoices available</p>
                </div>
            )}
        </div>
    );
}
