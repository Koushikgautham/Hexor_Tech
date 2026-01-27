"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Download,
    Calendar,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle,
    Search,
    Filter,
    ExternalLink,
    Receipt,
} from "lucide-react";

interface Invoice {
    id: string;
    project_id: string;
    name: string;
    description: string | null;
    file_url: string;
    file_name: string;
    amount: number | null;
    status: "pending" | "paid" | "overdue";
    due_date: string | null;
    created_at: string;
    project?: {
        id: string;
        name: string;
    };
}

export default function ClientInvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const response = await fetch("/api/client/invoices");
            if (response.ok) {
                const data = await response.json();
                setInvoices(data.invoices || []);
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number | null) => {
        if (amount === null) return "—";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "paid":
                return {
                    bg: "bg-emerald-500/10",
                    text: "text-emerald-400",
                    border: "border-emerald-500/30",
                    icon: CheckCircle,
                    label: "Paid",
                };
            case "overdue":
                return {
                    bg: "bg-red-500/10",
                    text: "text-red-400",
                    border: "border-red-500/30",
                    icon: AlertCircle,
                    label: "Overdue",
                };
            default:
                return {
                    bg: "bg-amber-500/10",
                    text: "text-amber-400",
                    border: "border-amber-500/30",
                    icon: Clock,
                    label: "Pending",
                };
        }
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesSearch =
            invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.project?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Calculate summary stats
    const stats = {
        total: invoices.length,
        pending: invoices.filter((i) => i.status === "pending").length,
        paid: invoices.filter((i) => i.status === "paid").length,
        overdue: invoices.filter((i) => i.status === "overdue").length,
        totalAmount: invoices.reduce((sum, i) => sum + (i.amount || 0), 0),
        paidAmount: invoices
            .filter((i) => i.status === "paid")
            .reduce((sum, i) => sum + (i.amount || 0), 0),
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
                    <p className="text-gray-400">Loading invoices...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
                <p className="text-gray-400">
                    View and download invoices for your projects
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Receipt className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Total Invoices</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.pending}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Paid</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.paid}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-pink-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Total Amount</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                        {formatCurrency(stats.totalAmount)}
                    </p>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search invoices or projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#1a1a2e] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500/50"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-12 pr-8 py-3 bg-[#1a1a2e] border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-pink-500/50 cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {/* Invoices List */}
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

            {/* Payment Summary */}
            {invoices.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/20"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Payment Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-black/20 rounded-xl p-4">
                            <p className="text-gray-400 text-sm mb-1">Total Billed</p>
                            <p className="text-2xl font-bold text-white">
                                {formatCurrency(stats.totalAmount)}
                            </p>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4">
                            <p className="text-gray-400 text-sm mb-1">Amount Paid</p>
                            <p className="text-2xl font-bold text-emerald-400">
                                {formatCurrency(stats.paidAmount)}
                            </p>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4">
                            <p className="text-gray-400 text-sm mb-1">Outstanding</p>
                            <p className="text-2xl font-bold text-amber-400">
                                {formatCurrency(stats.totalAmount - stats.paidAmount)}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
