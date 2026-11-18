"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, Receipt } from "lucide-react";
import type { ClientInvoicesState } from "../UseClientInvoices";

export function InvoiceSummaryStats({ formatCurrency, stats }: Pick<ClientInvoicesState, "formatCurrency" | "stats">) {
    return (
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
    );
}
