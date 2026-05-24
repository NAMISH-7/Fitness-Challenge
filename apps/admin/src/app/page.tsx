"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Badge from "@tn/shared/components/ui/Badge";
import Button from "@tn/shared/components/ui/Button";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import {
  adminStats, participants, events, sponsors, monthlyUserGrowth, type Sponsor
} from "@tn/shared/data/mock";
import AddSponsorModal from "@/components/sponsors/AddSponsorModal";
import {
  Users, Activity, Route, Calendar, TrendingUp, Search,
  MoreHorizontal, Plus, CheckCircle2, Clock, XCircle,
  Landmark, Info, X
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
  const [localSponsors, setLocalSponsors] = useState<Sponsor[]>(sponsors);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddSponsor = (sponsorData: Omit<Sponsor, "id">, id?: string) => {
    // Dashboard only supports adding, but we accept the signature
    const newSponsor = { id: `sp-${Date.now()}`, ...sponsorData };
    // Check if it already exists to be safe in StrictMode
    if (!sponsors.find(s => s.id === newSponsor.id)) {
      sponsors.push(newSponsor); 
    }
    setLocalSponsors([...sponsors]);
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
      value: adminStats.totalEvents,
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
          <Link href="/events/create">
            <Button size="sm">
              <Plus className="w-4 h-4" /> Create Event
            </Button>
          </Link>
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
                    <MoreHorizontal className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
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

        {/* User Management Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card variant="glass" padding="none">
            <div className="p-6 border-b border-border-light dark:border-border-dark flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                Recent Users
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-48"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">User</th>
                    <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">District</th>
                    <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">Distance</th>
                    <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">Streak</th>
                    <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-6 py-3">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.slice(0, 10).map((user) => (
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
              <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Sponsor
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {localSponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  onClick={() => setSelectedSponsor(sponsor)}
                  className="p-4 rounded-xl border border-border-light dark:border-border-dark hover:border-primary/30 transition-all duration-200 cursor-pointer"
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
    </div>
  );
}
