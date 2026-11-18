"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar, DollarSign, ExternalLink } from "lucide-react";
import type { ClientInvoicesState } from "../UseClientInvoices";

export function InvoiceList({ searchTerm, statusFilter, formatCurrency, formatDate, getStatusConfig, filteredInvoices }: Pick<ClientInvoicesState, "searchTerm" | "statusFilter" | "formatCurrency" | "formatDate" | "getStatusConfig" | "filteredInvoices">) {
    return (
        <>
            {filteredInvoices.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-12 border border-white/5 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No invoices found
                    </h3>
                    <p className="text-gray-400">
                        {searchTerm || statusFilter !== "all"
                            ? "Try adjusting your search or filter"
                            : "Invoices will appear here when added by your project manager"}
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    {filteredInvoices.map((invoice, index) => {
                        const statusConfig = getStatusConfig(invoice.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <motion.div
                                key={invoice.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-pink-500/20 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    {/* Invoice Info */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-6 h-6 text-pink-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-white text-lg truncate">
                                                {invoice.name}
                                            </h3>
                                            {invoice.project && (
                                                <p className="text-gray-400 text-sm">
                                                    Project: {invoice.project.name}
                                                </p>
                                            )}
                                            {invoice.description && (
                                                <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                                                    {invoice.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Invoice Details */}
                                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                                        {/* Amount */}
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-500" />
                                            <span className="text-white font-semibold">
                                                {formatCurrency(invoice.amount)}
                                            </span>
                                        </div>

                                        {/* Due Date */}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-400 text-sm">
                                                {invoice.due_date ? (
                                                    <>Due: {formatDate(invoice.due_date)}</>
                                                ) : (
                                                    "No due date"
                                                )}
                                            </span>
                                        </div>

                                        {/* Status Badge */}
                                        <div
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}
                                        >
                                            <StatusIcon className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                {statusConfig.label}
                                            </span>
                                        </div>

                                        {/* Download Button */}
                                        <a
                                            href={invoice.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 rounded-xl transition-all group-hover:bg-pink-500 group-hover:text-white"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span className="text-sm font-medium">Download</span>
                                            <ExternalLink className="w-3 h-3 opacity-50" />
                                        </a>
                                    </div>
                                </div>

                                {/* File Info */}
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        File: {invoice.file_name}
                                    </span>
                                    <span className="text-gray-500">
                                        Added: {formatDate(invoice.created_at)}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
