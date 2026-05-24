"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useEventStore } from "@/store/useEventStore";
import { useActivityStore } from "@/store/useActivityStore";
import Link from "next/link";
import { currentUser, monthlyStats, achievements, weeklyChartData, events } from "@tn/shared/data/mock";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Badge from "@tn/shared/components/ui/Badge";
import ProgressRing from "@tn/shared/components/ui/ProgressRing";
import {
  MapPin, Calendar, CheckCircle2, TrendingUp,
  Flame, Footprints, Activity,
  Route, LogOut
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// TODO: [FUTURE] Integrate Google Fit API for real activity data
// TODO: [FUTURE] Integrate Apple HealthKit
// TODO: [FUTURE] Add social sharing for achievements
// TODO: [FUTURE] Add profile editing functionality

export default function ProfilePage() {
  const user = currentUser;
  const stats = monthlyStats;

  const { registeredEventIds, unregisterEvent } = useEventStore();
  const { activities } = useActivityStore();
  const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));

  const totalLoggedDistance = activities.reduce((acc, curr) => acc + curr.distance, 0);
  const displayTotalDistance = user.distanceKm + totalLoggedDistance;
  const displayTotalCalories = (user.distanceKm * 60) + Math.round(totalLoggedDistance * 60); // approximate total calories
  const displayTotalSteps = user.steps + Math.round(totalLoggedDistance * 1300);
  const uniqueLoggedDates = new Set(activities.map(a => a.date)).size;
  const displayTotalActiveDays = stats.activeDays + uniqueLoggedDates; // Keep active days based on recent or update it if user has total

  useEffect(() => {
    if (!document.cookie.includes("user_auth=true")) {
      window.location.href = "/auth";
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "user_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  };

  const statCards = [
    {
      label: "Distance",
      value: Number(displayTotalDistance.toFixed(1)),
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

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="glass" padding="lg" className="mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-primary/30 glow">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  #{user.rank}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    {user.name}
                  </h1>
                  {user.isVerified && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  <button 
                    onClick={handleLogout}
                    className="ml-2 p-1.5 text-text-secondary-light hover:text-danger dark:text-text-secondary-dark dark:hover:text-danger transition-colors rounded-lg hover:bg-danger/10"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{user.district}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Joined {user.joinedDate}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  {user.badges.map((badge, i) => (
                    <Badge key={i} variant="primary" size="sm">{badge}</Badge>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{Number(displayTotalDistance.toFixed(1))}</p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Total km</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center justify-center gap-1">
                    🔥 {user.streak}
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Day Streak</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 justify-center">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <p className="text-2xl font-bold text-success">+{user.previousRank - user.rank}</p>
                  </div>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Rank Change</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* All-Time Stats with Progress Rings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
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
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {stat.label} • Goal: {stat.goal.toLocaleString()}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="glass">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Weekly Activity
              </h3>
              <div className="h-64">
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

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card variant="glass">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Achievements
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                      ach.unlocked
                        ? "bg-primary/5 dark:bg-primary/10 hover:scale-105 cursor-pointer"
                        : "opacity-40 grayscale"
                    }`}
                    title={`${ach.name}: ${ach.description}`}
                  >
                    <span className="text-2xl mb-1">{ach.icon}</span>
                    <span className="text-[10px] font-medium text-text-secondary-light dark:text-text-secondary-dark text-center leading-tight">
                      {ach.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Event History & Registrations */}
        {registeredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8"
          >
            <Card variant="glass">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Event Registrations
              </h3>
              <div className="space-y-4">
                {registeredEvents.map((event) => (
                  <div key={event.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-light-alt dark:bg-surface-dark-alt border border-border-light dark:border-border-dark">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={event.status === "completed" ? "default" : event.status === "ongoing" ? "success" : "primary"} size="sm">
                          {event.status.toUpperCase()}
                        </Badge>
                        <h4 className="font-bold text-text-primary-light dark:text-text-primary-dark">{event.title}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      {event.status !== "completed" && (
                        <Button variant="outline" size="sm" className="w-full sm:w-auto text-danger border-danger/30 hover:bg-danger/10" onClick={() => unregisterEvent(event.id)}>
                          Unregister
                        </Button>
                      )}
                      <Link href={`/events/${event.id}`} className="w-full sm:w-auto">
                        <Button size="sm" variant="outline" className="w-full sm:w-auto">View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card variant="glass">
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-light dark:bg-bg-dark hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      activity.type.toLowerCase() === "run"
                        ? "bg-primary/10 dark:bg-primary/20"
                        : activity.type.toLowerCase() === "walk"
                        ? "bg-emerald-100 dark:bg-emerald-900/20"
                        : "bg-amber-100 dark:bg-amber-900/20"
                    }`}>
                      <span className="text-lg">
                        {activity.type.toLowerCase() === "run" ? "🏃" : activity.type.toLowerCase() === "walk" ? "🚶" : "🚴"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary-light dark:text-text-primary-dark capitalize">
                        {activity.type} • {activity.distance} km
                      </p>
                    </div>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {activity.date}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark text-center py-4">No recent activities logged.</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
