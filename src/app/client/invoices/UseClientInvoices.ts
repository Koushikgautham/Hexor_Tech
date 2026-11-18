"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { ClientInvoice as Invoice } from "@/types/Invoice";

export function useClientInvoices() {
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

    return {
        invoices,
        setInvoices,
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        fetchInvoices,
        formatCurrency,
        formatDate,
        getStatusConfig,
        filteredInvoices,
        stats,
    };
}

export type ClientInvoicesState = ReturnType<typeof useClientInvoices>;
