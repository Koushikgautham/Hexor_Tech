"use client";

import { Search, Filter } from "lucide-react";
import type { ClientInvoicesState } from "../UseClientInvoices";

export function InvoiceFilters({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }: Pick<ClientInvoicesState, "searchTerm" | "setSearchTerm" | "statusFilter" | "setStatusFilter">) {
    return (
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
    );
}
