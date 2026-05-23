"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Activity, Flame, Plus, MapPin, Calendar, CheckCircle2, LogOut } from "lucide-react";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Input from "@tn/shared/components/ui/Input";
import Badge from "@tn/shared/components/ui/Badge";
import { currentUser } from "@tn/shared/data/mock";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";

// Use the main currentUser mock
const user = currentUser;

export default function DashboardPage() {
  const [showLogModal, setShowLogModal] = useState(false);
  const [logDistance, setLogDistance] = useState("");
  const [logSuccess, setLogSuccess] = useState(false);

  useEffect(() => {
    if (!document.cookie.includes("user_auth=true")) {
      window.location.href = "/auth";
    }
  }, []);

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logDistance) return;
    
    // Mock logging success
    setLogSuccess(true);
    setTimeout(() => {
      setLogSuccess(false);
      setShowLogModal(false);
      setLogDistance("");
    }, 2000);
  };

  const handleLogout = () => {
    document.cookie = "user_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full gradient-accent p-1">
              <div className="w-full h-full bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                Welcome back, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" /> {user.district}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="lg" onClick={handleLogout} className="border-danger/30 text-danger hover:bg-danger/10">
              <LogOut className="w-5 h-5 mr-2" /> Logout
            </Button>
            <Button size="lg" onClick={() => setShowLogModal(true)}>
              <Plus className="w-5 h-5 mr-2" /> Log Activity
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card padding="lg" variant="glass" className="h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-1">Total Distance</p>
              <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
                <AnimatedCounter value={user.distanceKm} /> <span className="text-xl text-text-secondary-light dark:text-text-secondary-dark font-normal">km</span>
              </h2>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card padding="lg" variant="glass" className="h-full border-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-1">Current Rank</p>
              <div className="flex items-end gap-3">
                <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  #{user.rank}
                </h2>
                <Badge variant={user.rank < user.previousRank ? "success" : "danger"} className="mb-2">
                  {user.rank < user.previousRank ? "Trending Up" : "Trending Down"}
                </Badge>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card padding="lg" variant="glass" className="h-full border-gold/20">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-1">Active Streak</p>
              <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
                {user.streak} <span className="text-xl text-text-secondary-light dark:text-text-secondary-dark font-normal">Days</span>
              </h2>
            </Card>
          </motion.div>
        </div>

        {/* Heatmap / Activity Feed Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card padding="lg">
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                Activity Heatmap
              </h3>
              <div className="h-48 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
                {/* Mock heatmap visual */}
                <div className="flex gap-2 opacity-50">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div 
                          key={j} 
                          className={`w-4 h-4 rounded-sm ${(i * 7 + j * 3) % 5 === 0 ? 'bg-primary' : 'bg-surface-light-alt dark:bg-surface-dark-alt'}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card padding="lg" className="h-full">
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                Recent Activities
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-surface-light-alt dark:bg-surface-dark-alt">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Morning Run
                      </p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        {5 + i}.2 km • {i} days ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Log Activity Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card padding="lg" variant="glass">
              {logSuccess ? (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    Activity Logged!
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    Keep up the great work!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      Log Activity
                    </h3>
                    <button 
                      onClick={() => setShowLogModal(false)}
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light"
                    >
                      Close
                    </button>
                  </div>
                  <form onSubmit={handleLogActivity} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button type="button" variant="outline" className="border-primary text-primary">Run</Button>
                      <Button type="button" variant="outline" className="border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark">Cycle</Button>
                    </div>
                    <Input 
                      label="Distance (km)" 
                      type="number" 
                      placeholder="e.g. 5.2" 
                      value={logDistance}
                      onChange={(e) => setLogDistance(e.target.value)}
                      required
                    />
                    <Input label="Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    <Button type="submit" className="w-full mt-4" size="lg">Save Activity</Button>
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
