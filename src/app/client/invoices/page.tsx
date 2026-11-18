"use client";

import { useClientInvoices } from "./UseClientInvoices";
import { InvoiceSummaryStats } from "./_components/InvoiceSummaryStats";
import { InvoiceFilters } from "./_components/InvoiceFilters";
import { InvoiceList } from "./_components/InvoiceList";
import { PaymentSummary } from "./_components/PaymentSummary";

export default function ClientInvoicesPage() {
    const {
        invoices,
        loading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        formatCurrency,
        formatDate,
        getStatusConfig,
        filteredInvoices,
        stats,
    } = useClientInvoices();

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
            <InvoiceSummaryStats formatCurrency={formatCurrency} stats={stats} />

            {/* Filters */}
            <InvoiceFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

            {/* Invoices List */}
            <InvoiceList searchTerm={searchTerm} statusFilter={statusFilter} formatCurrency={formatCurrency} formatDate={formatDate} getStatusConfig={getStatusConfig} filteredInvoices={filteredInvoices} />

            {/* Payment Summary */}
            {invoices.length > 0 && (
                <PaymentSummary formatCurrency={formatCurrency} stats={stats} />
            )}
        </div>
    );
}
