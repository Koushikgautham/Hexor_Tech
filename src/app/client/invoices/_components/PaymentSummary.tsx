"use client";

import { motion } from "framer-motion";
import type { ClientInvoicesState } from "../UseClientInvoices";

export function PaymentSummary({ formatCurrency, stats }: Pick<ClientInvoicesState, "formatCurrency" | "stats">) {
    return (
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
    );
}
