"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Plus, User, X, Search } from "lucide-react";

// Client Selector Component
export function ClientSelector({
    existingClientIds,
    onSelect,
    onClose,
}: {
    projectId: string;
    existingClientIds: string[];
    onSelect: (clientId: string) => void;
    onClose: () => void;
}) {
    const [clients, setClients] = React.useState<any[]>([]);
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`/api/admin/clients?search=${search}`);
                if (response.ok) {
                    const data = await response.json();
                    setClients(data.filter((c: any) => !existingClientIds.includes(c.id)));
                }
            } catch (error) {
                console.error("Error fetching clients:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchClients, 300);
        return () => clearTimeout(debounce);
    }, [search, existingClientIds]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 border border-border rounded-xl p-5 space-y-4"
        >
            <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Select Client</h4>
                <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg">
                    <X className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search clients..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
                {loading ? (
                    <div className="text-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-auto" />
                    </div>
                ) : clients.length > 0 ? (
                    clients.map((client) => (
                        <button
                            key={client.id}
                            onClick={() => onSelect(client.id)}
                            className="w-full flex items-center gap-3 p-3 bg-background border border-border rounded-xl hover:border-primary/50 transition-all text-left"
                        >
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">{client.full_name || "Unnamed"}</p>
                                <p className="text-sm text-muted-foreground truncate">{client.email}</p>
                            </div>
                            <Plus className="w-4 h-4 text-primary flex-shrink-0" />
                        </button>
                    ))
                ) : (
                    <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground">No clients found</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
