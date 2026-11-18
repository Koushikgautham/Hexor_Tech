"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AddUserForm } from "./_components/AddUserForm";
import { useUserManagement } from "./UseUserManagement";
import { UserFilters } from "./_components/UserFilters";
import { UsersTable } from "./_components/UsersTable";
import { UsersPagination } from "./_components/UsersPagination";
import { ResetPasswordModal } from "./_components/ResetPasswordModal";
import { ChangeRoleModal } from "./_components/ChangeRoleModal";
import { DeleteUserModal } from "./_components/DeleteUserModal";

export default function UsersPage() {
    const {
        setUsers,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        selectedUser,
        setSelectedUser,
        actionMenuOpen,
        setActionMenuOpen,
        showModal,
        setShowModal,
        isLoading,
        isFetching,
        currentPage,
        setCurrentPage,
        usersPerPage,
        filteredUsers,
        totalPages,
        paginatedUsers,
        handleResetPassword,
        handleChangeRole,
        handleToggleStatus,
        handleDeleteUser,
    } = useUserManagement();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        User Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage all users, roles, and permissions
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal("add-user")}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
                >
                    <UserPlus className="w-4 h-4" />
                    Add User
                </motion.button>
            </div>

            {/* Filters */}
            <UserFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} roleFilter={roleFilter} setRoleFilter={setRoleFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

            {/* Users Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden min-h-[400px]">
                {isFetching ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <UsersTable setUsers={setUsers} setSelectedUser={setSelectedUser} actionMenuOpen={actionMenuOpen} setActionMenuOpen={setActionMenuOpen} setShowModal={setShowModal} paginatedUsers={paginatedUsers} handleToggleStatus={handleToggleStatus} />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <UsersPagination currentPage={currentPage} setCurrentPage={setCurrentPage} usersPerPage={usersPerPage} filteredUsers={filteredUsers} totalPages={totalPages} />
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowModal(null);
                            setSelectedUser(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl"
                        >
                            {/* Reset Password Modal */}
                            {showModal === "reset-password" && selectedUser && (
                                <ResetPasswordModal selectedUser={selectedUser} setShowModal={setShowModal} isLoading={isLoading} handleResetPassword={handleResetPassword} />
                            )}

                            {/* Change Role Modal */}
                            {showModal === "change-role" && selectedUser && (
                                <ChangeRoleModal selectedUser={selectedUser} setShowModal={setShowModal} isLoading={isLoading} handleChangeRole={handleChangeRole} />
                            )}

                            {/* Delete User Modal */}
                            {showModal === "delete" && selectedUser && (
                                <DeleteUserModal selectedUser={selectedUser} setShowModal={setShowModal} isLoading={isLoading} handleDeleteUser={handleDeleteUser} />
                            )}

                            {/* Add User Modal */}
                            {showModal === "add-user" && (
                                <AddUserForm
                                    onClose={() => setShowModal(null)}
                                    onSuccess={(newUser) => {
                                        setUsers((prev) => [newUser, ...prev]);
                                        setShowModal(null);
                                        toast.success("User added successfully!");
                                    }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
