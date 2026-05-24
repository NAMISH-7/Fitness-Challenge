"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, User, ShieldCheck, XCircle, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Input from "@tn/shared/components/ui/Input";
import Button from "@tn/shared/components/ui/Button";
import Badge from "@tn/shared/components/ui/Badge";
import { participants } from "@tn/shared/data/mock";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(participants);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
      setActiveDropdown(null);
    }
  };

  const filteredUsers = users.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ["ID,Name,District,College,Distance(km),Steps,Rank,Joined Date,Verified"];
    const rows = filteredUsers.map(user => {
      const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
      return [
        user.id,
        escape(user.name),
        escape(user.district),
        escape(user.college || "N/A"),
        user.distanceKm,
        user.steps,
        user.rank,
        user.joinedDate,
        user.isVerified ? "Yes" : "No"
      ].join(",");
    });
    
    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tn_fitness_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Users Management
            </h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Manage all registered participants across the state.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button size="sm" onClick={handleExportCSV}>Export CSV</Button>
          </div>
        </motion.div>

        <Card padding="none" className="overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt">
            <div className="max-w-md">
              <Input
                placeholder="Search by name or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-light-alt dark:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">District</th>
                  <th className="px-6 py-4 font-semibold">Distance</th>
                  <th className="px-6 py-4 font-semibold">Rank</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02, duration: 0.2 }}
                    key={user.id}
                    className="hover:bg-surface-light-alt/50 dark:hover:bg-surface-dark-alt/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                            {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                      {user.district}
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary-light dark:text-text-primary-dark">
                      {user.distanceKm.toFixed(1)} km
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="default" className="text-xs">
                        #{user.rank}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <Badge variant="success" className="text-xs">
                          <ShieldCheck className="w-3 h-3 mr-1" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                        className="p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {activeDropdown === user.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-12 top-10 w-max min-w-[140px] bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-lg overflow-hidden z-20"
                        >
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors flex items-center gap-2 font-medium whitespace-nowrap"
                          >
                            <Trash2 className="w-4 h-4" /> Delete User
                          </button>
                        </motion.div>
                      )}
                    </td>
                  </motion.tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-secondary-light dark:text-text-secondary-dark">
                      <XCircle className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
