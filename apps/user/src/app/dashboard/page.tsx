"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, Activity, Flame, Plus, MapPin, Calendar, 
  CheckCircle2, LogOut, Target, Users, Zap, Medal,
  Route, Footprints
} from "lucide-react";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Input from "@tn/shared/components/ui/Input";
import Link from "next/link";
import Badge from "@tn/shared/components/ui/Badge";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import ProgressRing from "@tn/shared/components/ui/ProgressRing";
import { 
  currentUser as user, achievements, monthlyStats, weeklyChartData, participants
} from "@tn/shared/data/mock";
import { useDataStore } from "@/store/useDataStore";
import { useEventStore } from "@/store/useEventStore";
import { useActivityStore } from "@/store/useActivityStore";

// Recharts for weekly summary
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const [showLogModal, setShowLogModal] = useState(false);
  const [logDistance, setLogDistance] = useState("");
  const [logType, setLogType] = useState("Run");
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logSuccess, setLogSuccess] = useState(false);
  const [greeting, setGreeting] = useState("Welcome back");

  const { registeredEventIds, unregisterEvent } = useEventStore();
  const { events } = useDataStore();
  const { activities, addActivity, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const totalLoggedDistance = activities.reduce((acc, curr) => acc + curr.distance, 0);
  const totalDistance = user.distanceKm + totalLoggedDistance;
  const displayTotalCalories = (user.distanceKm * 60) + Math.round(totalLoggedDistance * 60);
  const displayTotalSteps = user.steps + Math.round(totalLoggedDistance * 1300);
  const uniqueLoggedDates = new Set(activities.map(a => a.date)).size;
  const displayTotalActiveDays = monthlyStats.activeDays + uniqueLoggedDates;

  // Calculate dynamic rank
  const activeUser = { ...user, distanceKm: totalDistance };
  const allParticipants = participants.filter(p => p.id !== user.id).concat(activeUser);
  allParticipants.sort((a, b) => b.distanceKm - a.distanceKm);
  const dynamicRank = allParticipants.findIndex(p => p.id === user.id) + 1;
  
  const districtParticipants = allParticipants.filter(p => p.district === user.district);
  const dynamicDistrictRank = districtParticipants.findIndex(p => p.id === user.id) + 1;

  const statCards = [
    {
      label: "Distance",
      value: Number(totalDistance.toFixed(1)),
      goal: 1000,
      unit: "km",
      color: "#06B6D4",
      icon: Route,
    },
    {
      label: "Steps",
      value: displayTotalSteps,
      goal: 1000000,
      unit: "",
      color: "#8B5CF6",
      icon: Footprints,
    },
    {
      label: "Calories",
      value: displayTotalCalories,
      goal: 50000,
      unit: "kcal",
      color: "#F59E0B",
      icon: Flame,
    },
    {
      label: "Active Days",
      value: displayTotalActiveDays,
      goal: 100,
      unit: "days",
      color: "#10B981",
      icon: Activity,
    },
  ];

  const registeredEvents = events.filter((e) =>
    registeredEventIds.includes(e.id) && (e.status === "upcoming" || e.status === "ongoing")
  );

  // Friend Comparison logic (mocking a comparison with someone nearby in rank in same district)
  const friendComparison = participants.find(p => p.district === user.district && p.id !== user.id) || participants[0];
  const distanceDiff = totalDistance - friendComparison.distanceKm;
  const isAhead = distanceDiff >= 0;

  useEffect(() => {
    if (sessionStorage.getItem("user_auth") !== "true") {
      document.cookie = "user_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/auth";
    }

    const hour = new Date().getHours();
    let initialGreeting = "Good evening";
    if (hour < 12) initialGreeting = "Good morning";
    else if (hour < 18) initialGreeting = "Good afternoon";

    setTimeout(() => {
      setGreeting(initialGreeting);
    }, 0);
  }, []);

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logDistance) return;
    
    addActivity({
      type: logType,
      distance: parseFloat(logDistance),
      date: logDate,
    });

    setLogSuccess(true);
    setTimeout(() => {
      setLogSuccess(false);
      setShowLogModal(false);
      setLogDistance("");
      setLogType("Run");
    }, 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user_auth");
    document.cookie = "user_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-surface-light dark:border-surface-dark shadow-xl overflow-hidden z-10 relative">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover bg-primary/20" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border-2 border-surface-light dark:border-surface-dark flex items-center gap-1 z-20">
                <Flame className="w-3 h-3" /> {user.streak}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
                {greeting}, <span className="gradient-text">{user.name.split(" ")[0]}</span>!
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2 mt-1 font-medium">
                <MapPin className="w-4 h-4 text-primary" /> {user.district}
                {user.college && <span className="opacity-50">•</span>}
                {user.college && <span className="text-text-secondary-light dark:text-text-secondary-dark">{user.college}</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleLogout} className="border-danger/30 text-danger hover:bg-danger/10">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
            <Button onClick={() => setShowLogModal(true)} className="glow">
              <Plus className="w-5 h-5 mr-2" /> Log Activity
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Main Stats column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Streak & Rank Banner */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 p-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-amber-500/20 to-transparent blur-3xl opacity-50" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Flame className="w-8 h-8 text-amber-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-amber-500 dark:text-amber-400">
                        {user.streak} Day Streak! 🔥
                      </h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
                        Only 7 days away from the Diamond Badge!
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 py-3 rounded-xl border border-border-light dark:border-border-dark flex items-center gap-4 text-center">
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium uppercase tracking-wider mb-1">State Rank</p>
                      <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">#{dynamicRank}</p>
                    </div>
                    <div className="w-px h-10 bg-border-light dark:bg-border-dark" />
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium uppercase tracking-wider mb-1">District</p>
                      <p className="text-2xl font-bold text-primary">#{dynamicDistrictRank}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* All-Time Stats with Progress Rings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {statCards.map((stat) => {
                const Icon = stat.icon;
                const progress = (stat.value / stat.goal) * 100;
                return (
                  <Card key={stat.label} variant="glass">
                    <div className="flex flex-col items-center text-center">
                      <ProgressRing progress={progress} size={90} strokeWidth={6} color={stat.color}>
                        <Icon className="w-5 h-5" style={{ color: stat.color }} />
                      </ProgressRing>
                      <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mt-3">
                        {stat.value.toLocaleString()} <span className="text-sm font-normal text-text-secondary-light dark:text-text-secondary-dark">{stat.unit}</span>
                      </p>
                      <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark leading-tight">
                        {stat.label} <br/> Goal: {stat.goal.toLocaleString()}
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 mt-2">
                        <div
                          className="h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: stat.color }}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </motion.div>

            {/* Weekly Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card variant="glass">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" /> Weekly Activity
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyChartData}>
                      <defs>
                        <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                      <XAxis dataKey="day" stroke="rgba(148,163,184,0.5)" fontSize={12} />
                      <YAxis stroke="rgba(148,163,184,0.5)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(18,18,26,0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: "#F1F5F9",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="distance"
                        stroke="#06B6D4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDistance)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>

            {/* Heatmap (Animated replacement) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card variant="glass">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> Activity Heatmap
                </h3>
                <div className="flex gap-1.5 overflow-x-auto pb-4 custom-scrollbar">
                  {Array.from({ length: 24 }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-1.5">
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        // Generate a random-looking but stable heatmap pattern
                        const intensity = (weekIdx * 3 + dayIdx * 7) % 10;
                        let bgClass = "bg-surface-light-alt dark:bg-surface-dark-alt"; // 0-2 (Empty)
                        if (intensity > 2 && intensity <= 5) bgClass = "bg-primary/30"; // Light
                        if (intensity > 5 && intensity <= 8) bgClass = "bg-primary/60"; // Medium
                        if (intensity > 8) bgClass = "bg-primary glow"; // High

                        return (
                          <motion.div 
                            key={dayIdx} 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: (weekIdx * 7 + dayIdx) * 0.002 }}
                            className={`w-3.5 h-3.5 rounded-sm ${bgClass} cursor-pointer hover:scale-125 transition-transform duration-200`}
                            title={`Activity level: ${intensity}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-2 mt-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-surface-light-alt dark:bg-surface-dark-alt"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary/30"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary"></div>
                  </div>
                  <span>More</span>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Friend Comparison */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card variant="glass" className="overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Users className="w-4 h-4 text-primary" /> District Rival
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative flex -space-x-4">
                    <div className="w-12 h-12 rounded-full border-2 border-surface-light dark:border-surface-dark overflow-hidden z-20 shadow-md">
                      <img src={user.avatar} alt="You" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-surface-light dark:border-surface-dark overflow-hidden z-10 opacity-70">
                      <img src={friendComparison.avatar} alt={friendComparison.name} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                      You vs {friendComparison.name.split(" ")[0]}
                    </p>
                    <p className={`text-xs font-bold mt-1 ${isAhead ? "text-success" : "text-danger"}`}>
                      {isAhead ? (
                        <>You are <span className="text-base">{Math.abs(distanceDiff).toFixed(1)}km</span> ahead!</>
                      ) : (
                        <>{friendComparison.name.split(" ")[0]} is <span className="text-base">{Math.abs(distanceDiff).toFixed(1)}km</span> ahead. Catch up!</>
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Achievements Grid */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card variant="glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                    <Medal className="w-5 h-5 text-gold" /> Achievements
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {achievements.slice(0, 8).map((badge) => (
                    <div 
                      key={badge.id}
                      className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all duration-300 relative group cursor-pointer ${
                        badge.unlocked 
                          ? `bg-surface-light-alt dark:bg-surface-dark-alt border border-border-light dark:border-border-dark rarity-${badge.rarity}`
                          : "bg-surface-light-alt/50 dark:bg-surface-dark-alt/50 opacity-40 grayscale"
                      }`}
                    >
                      {badge.icon}
                      
                      {/* Custom Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-text-primary-light dark:bg-text-primary-dark text-bg-light dark:text-bg-dark text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                        <p className="font-bold">{badge.name}</p>
                        <p className="text-[10px] opacity-80">{badge.description}</p>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-primary-light dark:border-t-text-primary-dark" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Challenge Recommendations */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card variant="glass">
                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" /> Recommended
                </h3>
                <div className="space-y-4">
                  {events.filter(e => e.status === "upcoming" && !registeredEventIds.includes(e.id)).slice(0, 2).map(event => (
                    <Link key={event.id} href={`/events/${event.id}`} className="block group">
                      <div className="p-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt/50 dark:bg-surface-dark-alt/50 group-hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-sm text-text-primary-light dark:text-text-primary-dark line-clamp-1 group-hover:text-primary transition-colors">
                            {event.title}
                          </p>
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {event.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Registered Events */}
            {registeredEvents.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Card variant="glass">
                  <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-success" /> Registered Events
                  </h3>
                  <div className="space-y-4">
                    {registeredEvents.map(event => (
                      <Link key={event.id} href={`/events/${event.id}`} className="block group">
                        <div className="p-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt/50 dark:bg-surface-dark-alt/50 group-hover:border-success/50 transition-colors">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-bold text-sm text-text-primary-light dark:text-text-primary-dark line-clamp-1 group-hover:text-success transition-colors">
                              {event.title}
                            </p>
                          </div>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {event.location}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Log Activity Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card padding="lg" variant="glass" className="neon-border">
              {logSuccess ? (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    Activity Logged!
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    Your contribution to {user.district} has been recorded. Keep moving!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" /> Log Activity
                    </h3>
                    <button 
                      onClick={() => setShowLogModal(false)}
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light transition-colors"
                    >
                      Close
                    </button>
                  </div>
                  <form onSubmit={handleLogActivity} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setLogType("Run")}
                        className={logType === "Run" ? "border-primary text-primary bg-primary/10" : ""}
                      >
                        🏃 Run
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setLogType("Cycle")}
                        className={logType === "Cycle" ? "border-primary text-primary bg-primary/10" : ""}
                      >
                        🚴 Cycle
                      </Button>
                    </div>
                    <Input 
                      label="Distance (km)" 
                      type="number" 
                      step="0.1"
                      placeholder="e.g. 5.2" 
                      value={logDistance}
                      onChange={(e) => setLogDistance(e.target.value)}
                      required
                    />
                    <Input 
                      label="Date" 
                      type="date" 
                      value={logDate}
                      onChange={(e) => setLogDate(e.target.value)}
                      required 
                    />
                    <Button type="submit" className="w-full mt-2 glow" size="lg">Log Activity</Button>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
