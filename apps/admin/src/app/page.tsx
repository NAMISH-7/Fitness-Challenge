"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Badge from "@tn/shared/components/ui/Badge";
import Button from "@tn/shared/components/ui/Button";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import {
  adminStats, monthlyUserGrowth, type Sponsor
} from "@tn/shared/data/mock";
import { useAdminDataStore } from "@/store/useAdminDataStore";
import { useAdminUserStore } from "@/store/useAdminUserStore";
import AddSponsorModal from "@/components/sponsors/AddSponsorModal";
import {
  Users, Activity, Route, Calendar, TrendingUp, Search,
  Plus, CheckCircle2, Clock, XCircle,
  Landmark, Info, X, Bell, ShieldAlert, Megaphone, Check, Flame, Send, ChevronUp, ChevronDown
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// TODO: [FUTURE] Connect to Firebase Admin SDK
// TODO: [FUTURE] Add real-time analytics
// TODO: [FUTURE] Add user management CRUD operations
// TODO: [FUTURE] Add sponsor payment integration
// TODO: [FUTURE] Add event creation/editing forms

export default function AdminDashboard() {
  const router = useRouter();
  const { users, fetchUsers, deleteUser, toggleVerifyUser } = useAdminUserStore();
  const { events, sponsors, initialize: initializeData } = useAdminDataStore();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchUsers();
    initializeData();
  }, [fetchUsers, initializeData]);
  const [localSponsors, setLocalSponsors] = useState<Sponsor[]>(sponsors);

  useEffect(() => {
    setTimeout(() => {
      setLocalSponsors(sponsors);
    }, 0);
  }, [sponsors]);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  interface Approval {
    id: string;
    type: string;
    title: string;
    detail: string;
    time: string;
    isFileBased: boolean;
    raw?: Record<string, unknown>;
  }

  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [viewProposal, setViewProposal] = useState<Approval | null>(null);

  useEffect(() => {
    // Load proposals from shared JSON file
    fetch("/api/proposals", { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        type RawProposal = { id: string; status: string; type: string; title?: string; description?: string; organizer?: string; location?: string };
        const pendingProps = (data as RawProposal[])
          .filter((p) => p.status === "pending")
          .map((p) => ({
            id: p.id,
            type: p.type === "sponsor" ? "sponsor" : "event",
            title: p.title ?? "Untitled",
            detail: p.type === "sponsor"
              ? `Pledge: ${(p.description ?? "").substring(0, 30)}...`
              : `Proposed by ${p.organizer || "Student Rep"} at ${p.location}`,
            time: "Just now",
            isFileBased: true,
            raw: p
          }));
        setApprovals(prev => {
          const filterStatic = prev.filter(item => !item.isFileBased);
          return [...filterStatic, ...pendingProps];
        });
      })
      .catch(err => console.error("Error loading event proposals:", err));
  }, []);

  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [announcements, setAnnouncements] = useState([
    { id: "ann-1", text: "Season 3 — May 2026 Challenge is officially halfway!", time: "2h ago", audience: "All Athletes" },
    { id: "ann-2", text: "New leaderboard rankings updated for engineering colleges", time: "1d ago", audience: "Colleges" },
  ]);

  const [adminSortKey, setAdminSortKey] = useState<string>("distanceKm");
  const [adminSortOrder, setAdminSortOrder] = useState<"asc" | "desc">("desc");

  const handleAdminSort = (key: string) => {
    if (adminSortKey === key) {
      setAdminSortOrder(adminSortOrder === "asc" ? "desc" : "asc");
    } else {
      setAdminSortKey(key);
      setAdminSortOrder(key === "streak" || key === "distanceKm" || key === "rank" ? "desc" : "asc");
    }
  };

  const renderAdminSortIcon = (columnKey: string) => {
    const isActive = adminSortKey === columnKey;
    return (
      <div className="inline-flex flex-col items-center justify-center ml-1 align-middle">
        <ChevronUp className={`w-3.5 h-3.5 -mb-[3px] ${isActive && adminSortOrder === "asc" ? "text-primary opacity-100" : "opacity-40"}`} />
        <ChevronDown className={`w-3.5 h-3.5 ${isActive && adminSortOrder === "desc" ? "text-primary opacity-100" : "opacity-40"}`} />
      </div>
    );
  };

  const sortedParticipants = useMemo(() => {
    const sorted = [...users];
    sorted.sort((a, b) => {
      const aVal = a[adminSortKey as keyof typeof a];
      const bVal = b[adminSortKey as keyof typeof b];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return adminSortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return adminSortOrder === "asc"
          ? aVal - bVal
          : bVal - aVal;
      }

      if (typeof aVal === "boolean" && typeof bVal === "boolean") {
        return adminSortOrder === "asc"
          ? (aVal === bVal ? 0 : aVal ? 1 : -1)
          : (aVal === bVal ? 0 : aVal ? -1 : 1);
      }

      return 0;
    });

    return sorted;
  }, [adminSortKey, adminSortOrder, users]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    const newAnn = {
      id: `ann-${Date.now()}`,
      text: broadcastMessage,
      time: "Just now",
      audience: "All Athletes",
    };
    setAnnouncements([newAnn, ...announcements]);
    setBroadcastMessage("");
  };

  const handleApprove = async (id: string, approve: boolean = true) => {
    const item = approvals.find(app => app.id === id);
    if (item?.isFileBased) {
      try {
        await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: approve ? "approved" : "addressed" })
        });
        await initializeData();
      } catch (err) {
        console.error("Error updating proposal:", err);
      }
    }
    setApprovals(prev => prev.filter(app => app.id !== id));
  };

  const handleAddSponsor = async (sponsorData: Omit<Sponsor, "id">, id?: string) => {
    try {
      const newSponsor = { id: id || `sp-${Date.now()}`, ...sponsorData };
      const response = await fetch("/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSponsor)
      });
      if (response.ok) {
        setIsAddModalOpen(false);
        await initializeData();
      } else {
        alert("Failed to add sponsor");
      }
    } catch (err) {
      console.error("Error adding sponsor:", err);
    }
  };

  const analyticsCards = [
    {
      title: "Total Users",
      value: adminStats.totalUsers,
      change: `+${adminStats.newUsersThisMonth.toLocaleString()} this month`,
      changeType: "positive" as const,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10 dark:bg-primary/20",
    },
    {
      title: "Active Users",
      value: adminStats.activeUsers,
      change: `${((adminStats.activeUsers / adminStats.totalUsers) * 100).toFixed(1)}% of total`,
      changeType: "neutral" as const,
      icon: Activity,
      color: "text-success",
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
      title: "Total Distance",
      value: adminStats.totalDistanceKm,
      change: `+${adminStats.growthPercent}% growth`,
      changeType: "positive" as const,
      icon: Route,
      color: "text-secondary",
      bg: "bg-secondary/10 dark:bg-secondary/20",
    },
    {
      title: "Total Events",
      value: events.length > 0 ? events.length : adminStats.totalEvents,
      change: `${events.filter((e) => e.status === "upcoming").length} upcoming`,
      changeType: "neutral" as const,
      icon: Calendar,
      color: "text-gold",
      bg: "bg-amber-100 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Dashboard Overview
            </h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Welcome back, Admin. Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {analyticsCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card variant="glass" padding="md">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    <AnimatedCounter value={card.value} />
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                    {card.title}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {card.changeType === "positive" && <TrendingUp className="w-3 h-3 text-success" />}
                    <span className={`text-xs ${card.changeType === "positive" ? "text-success" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>
                      {card.change}
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                User Growth
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1}>
                  <AreaChart data={monthlyUserGrowth}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(148,163,184,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(148,163,184,0.5)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(18,18,26,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#F1F5F9",
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="users" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" name="Total Users" />
                    <Area type="monotone" dataKey="active" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" name="Active Users" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Monthly Activity Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card variant="glass">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Monthly Registrations
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1}>
                  <BarChart data={monthlyUserGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(148,163,184,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(148,163,184,0.5)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(18,18,26,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#F1F5F9",
                      }}
                    />
                    <Bar dataKey="users" fill="#06B6D4" radius={[6, 6, 0, 0]} name="Users" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Two-Column Details Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Left Column (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            {/* User Management Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="glass" padding="none">
                <div className="p-6 border-b border-border-light dark:border-border-dark flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                    Recent Users
                  </h3>

                </div>

                <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-light dark:border-border-dark">
                        <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">
                          <button onClick={() => handleAdminSort("name")} className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer select-none font-bold">
                            User {renderAdminSortIcon("name")}
                          </button>
                        </th>
                        <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">
                          <button onClick={() => handleAdminSort("district")} className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer select-none font-bold">
                            District {renderAdminSortIcon("district")}
                          </button>
                        </th>
                        <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">
                          <button onClick={() => handleAdminSort("distanceKm")} className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer select-none font-bold">
                            Distance {renderAdminSortIcon("distanceKm")}
                          </button>
                        </th>
                        <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">
                          <button onClick={() => handleAdminSort("streak")} className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer select-none font-bold">
                            Streak {renderAdminSortIcon("streak")}
                          </button>
                        </th>
                        <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">
                          <button onClick={() => handleAdminSort("isVerified")} className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer select-none font-bold">
                            Status {renderAdminSortIcon("isVerified")}
                          </button>
                        </th>
                        <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">
                          <button onClick={() => handleAdminSort("rank")} className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer select-none font-bold">
                            Rank {renderAdminSortIcon("rank")}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedParticipants.slice(0, 10).map((user, index: number) => (
                        <tr key={user.id} className="border-b border-border-light/50 dark:border-border-dark/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-text-primary-light dark:text-text-primary-dark">{user.name}</p>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{user.college || "—"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">{user.district}</td>
                          <td className="px-6 py-4 text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{user.distanceKm} km</td>
                          <td className="px-6 py-4 text-sm">🔥 {user.streak}</td>
                          <td className="px-6 py-4">
                            <Badge variant={user.isVerified ? "success" : "warning"} size="sm">
                              {user.isVerified ? "Verified" : "Pending"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-primary">#{user.rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            {/* Sponsor Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card variant="glass">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                    Sponsor Management
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {localSponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      onClick={() => setSelectedSponsor(sponsor)}
                      className="p-4 rounded-xl border border-border-light dark:border-border-dark hover:border-primary/30 transition-all duration-200 cursor-pointer bg-[#0f0f1d]/20 hover:bg-[#0f0f1d]/40"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{sponsor.logo}</span>
                        {sponsor.status === "active" ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : sponsor.status === "pending" ? (
                          <Clock className="w-4 h-4 text-gold" />
                        ) : (
                          <XCircle className="w-4 h-4 text-danger" />
                        )}
                      </div>
                      <p className="font-medium text-sm text-text-primary-light dark:text-text-primary-dark truncate">
                        {sponsor.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={sponsor.tier === "platinum" ? "primary" : sponsor.tier === "gold" ? "gold" : "silver"}
                          size="sm"
                        >
                          {sponsor.tier}
                        </Badge>
                        <Badge
                          variant={sponsor.status === "active" ? "success" : sponsor.status === "pending" ? "warning" : "danger"}
                          size="sm"
                        >
                          {sponsor.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            {/* Pending Event Approvals Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="glass">
                <div className="flex items-center justify-between mb-4 border-b border-border-light dark:border-border-dark pb-3">
                  <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-primary" />
                    Pending Event Approvals
                  </h3>
                  {approvals.filter(a => a.type === "event").length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold animate-pulse">
                      {approvals.filter(a => a.type === "event").length} Requests
                    </span>
                  )}
                </div>

                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {approvals.filter(a => a.type === "event").length > 0 ? (
                      approvals.filter(a => a.type === "event").map((app) => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0, padding: 0 }}
                          transition={{ duration: 0.2 }}
                          className="p-3 bg-surface-light-alt dark:bg-[#0f0f1d]/50 border border-border-light dark:border-border-dark/50 rounded-xl"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-primary/20 text-primary">
                                  {app.type}
                                </span>
                                <h4 className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark truncate max-w-[150px]">{app.title}</h4>
                              </div>
                              <p className="text-[11px] text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-normal">{app.detail}</p>
                              <span className="text-[9px] text-text-secondary-light/60 dark:text-text-secondary-dark/60 block mt-1">{app.time}</span>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setViewProposal(app)}
                                className="px-3 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/20 text-primary transition-colors cursor-pointer text-xs font-bold"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-xs">
                        🎉 All events processed!
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>

            {/* Pending Sponsor Approvals Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card variant="glass">
                <div className="flex items-center justify-between mb-4 border-b border-border-light dark:border-border-dark pb-3">
                  <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-gold" />
                    Pending Sponsor Approvals
                  </h3>
                  {approvals.filter(a => a.type === "sponsor").length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold font-bold animate-pulse">
                      {approvals.filter(a => a.type === "sponsor").length} Requests
                    </span>
                  )}
                </div>

                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {approvals.filter(a => a.type === "sponsor").length > 0 ? (
                      approvals.filter(a => a.type === "sponsor").map((app) => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0, padding: 0 }}
                          transition={{ duration: 0.2 }}
                          className="p-3 bg-surface-light-alt dark:bg-[#0f0f1d]/50 border border-border-light dark:border-border-dark/50 rounded-xl"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-gold/20 text-gold">
                                  {app.type}
                                </span>
                                <h4 className="text-xs font-bold text-text-primary-light dark:text-text-primary-dark truncate max-w-[150px]">{app.title}</h4>
                              </div>
                              <p className="text-[11px] text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-normal">{app.detail}</p>
                              <span className="text-[9px] text-text-secondary-light/60 dark:text-text-secondary-dark/60 block mt-1">{app.time}</span>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setViewProposal(app)}
                                className="px-3 py-1.5 rounded-lg bg-gold/15 hover:bg-gold/20 text-gold transition-colors cursor-pointer text-xs font-bold"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-xs">
                        🎉 All sponsors processed!
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>

            {/* Broadcast Announcements Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="glass">
                <h3 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-secondary" />
                  College Broadcasts
                </h3>

                <form onSubmit={handleSendBroadcast} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Announce to all athletes..."
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 text-xs rounded-xl border border-border-light dark:border-border-dark bg-[#0f0f1d]/50 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-text-secondary-light/50 dark:placeholder:text-text-secondary-dark/50"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-secondary hover:text-secondary-light transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="p-3 bg-surface-light-alt dark:bg-[#0f0f1d]/30 border border-border-light/50 dark:border-border-dark/30 rounded-xl space-y-1.5">
                      <p className="text-xs text-text-primary-light dark:text-text-primary-dark font-medium leading-relaxed">{ann.text}</p>
                      <div className="flex items-center justify-between text-[9px] text-text-secondary-light/60 dark:text-text-secondary-dark/60">
                        <span>🎯 {ann.audience}</span>
                        <span>{ann.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSponsor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg"
            >
              <Card padding="lg" className="relative overflow-hidden">
                <button
                  onClick={() => setSelectedSponsor(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-surface-light-alt dark:bg-surface-dark-alt rounded-2xl flex items-center justify-center border border-border-light dark:border-border-dark text-3xl">
                    {selectedSponsor.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      {selectedSponsor.name}
                    </h2>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={selectedSponsor.status === 'active' ? 'success' : selectedSponsor.status === 'pending' ? 'warning' : 'danger'}>
                        {selectedSponsor.status.toUpperCase()}
                      </Badge>
                      <Badge variant={selectedSponsor.tier === "platinum" ? "primary" : selectedSponsor.tier === "gold" ? "gold" : "silver"} className="capitalize">
                        {selectedSponsor.tier} Tier
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl border border-border-light dark:border-border-dark space-y-3">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">About</p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          {selectedSponsor.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl border border-border-light dark:border-border-dark">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Joined</span>
                      </div>
                      <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{selectedSponsor.joinDate}</p>
                    </div>
                    <div className="p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl border border-border-light dark:border-border-dark">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Duration</span>
                      </div>
                      <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{selectedSponsor.duration}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Landmark className="w-5 h-5 text-gold" />
                      <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">Contribution & Pledge</span>
                    </div>
                    <p className="text-lg font-bold text-gold drop-shadow-sm">{selectedSponsor.contribution}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AddSponsorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSponsor}
      />
      {/* Proposal Details Modal */}
      {viewProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card padding="lg" variant="glass">
              <div className="flex justify-between items-center mb-4 border-b border-border-light dark:border-border-dark pb-2">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                  Proposal Details
                </h3>
                <button
                  onClick={() => setViewProposal(null)}
                  className="p-1 rounded-lg text-text-secondary-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-6 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {Object.entries(viewProposal.raw || {}).map(([key, value]) => {
                  if (key === "id" || key === "status") return null;
                  return (
                    <div key={key}>
                      <span className="font-bold text-text-primary-light dark:text-text-primary-dark capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>{" "}
                      <span>{String(value)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setViewProposal(null)}>
                  Close
                </Button>
                <Button className="flex-1" onClick={() => {
                  handleApprove(viewProposal.id, false); // Mark as addressed
                  setViewProposal(null);
                }}>
                  Mark as Addressed
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
