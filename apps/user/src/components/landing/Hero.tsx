"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, Users, Zap } from "lucide-react";
import Button from "@tn/shared/components/ui/Button";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import { platformStats, districtStats } from "@tn/shared/data/mock";

const floatingActivities = [
  { name: "Participant", district: "Madurai", km: 12.5, emoji: "🏃‍♀️", delay: 0 },
  { name: "Participant", district: "Chennai", km: 8.2, emoji: "🚶", delay: 3 },
  { name: "Participant", district: "Coimbatore", km: 22.0, emoji: "🚴‍♀️", delay: 6 },
  { name: "Participant", district: "Trichy", km: 15.3, emoji: "⚡", delay: 9 },
];

const districtTicker = districtStats.slice(0, 8).map(
  (d) => `${d.name}: ${(d.totalKm / 1000).toFixed(0)}K km`
);

export default function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user_auth") === "true") {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 0);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-light via-surface-light-alt to-bg-light dark:from-bg-dark dark:via-[#0d0d18] dark:to-bg-dark" />

      {/* Animated gradient orbs — multiple layers for depth */}
      <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-secondary/10 dark:bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 dark:bg-primary/[0.08] rounded-full blur-[120px] animate-breathe" />
      <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-success/5 dark:bg-success/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: "5s" }} />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Season 3 — May 2026 Challenge is Live
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
          </motion.div>

          {/* Massive participant counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="gradient-text neon-text">
                <AnimatedCounter value={platformStats.totalParticipants} duration={2500} />
              </span>
            </div>
            <p className="text-lg sm:text-xl text-text-secondary-light dark:text-text-secondary-dark font-medium mt-2 flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              participants across <span className="text-text-primary-light dark:text-text-primary-dark font-bold">Tamil Nadu</span>
            </p>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="text-text-primary-light dark:text-text-primary-dark">Move </span>
            <span className="gradient-text">Tamil Nadu</span>
            <span className="text-text-primary-light dark:text-text-primary-dark"> Forward</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed text-balance">
            The largest statewide fitness movement. Walk, run, cycle — compete across 38 districts.
            Every step you take moves Tamil Nadu forward.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            {!isAuthenticated ? (
              <Link href="/auth">
                <Button size="lg" className="text-lg px-10 py-5 glow-strong">
                  Join the Movement
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-10 py-5 glow-strong">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/leaderboard">
                <Button variant="outline" size="lg" className="text-lg px-10 py-5">
                  View Leaderboard
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Live stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 px-6 py-3 rounded-2xl bg-surface-light/80 dark:bg-surface-dark/80 border border-border-light dark:border-border-dark backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              <span className="text-text-secondary-light dark:text-text-secondary-dark">
                <strong className="text-text-primary-light dark:text-text-primary-dark tabular-nums">
                  <AnimatedCounter value={platformStats.avgDailyActiveUsers} />
                </strong>{" "}active now
              </span>
            </div>
            <div className="w-px h-4 bg-border-light dark:bg-border-dark hidden sm:block" />
            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <strong className="text-text-primary-light dark:text-text-primary-dark tabular-nums">
                <AnimatedCounter value={platformStats.totalDistanceKm} suffix="+" />
              </strong>{" "}km covered
            </div>
            <div className="w-px h-4 bg-border-light dark:bg-border-dark hidden sm:block" />
            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark hidden sm:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <strong className="text-text-primary-light dark:text-text-primary-dark">{platformStats.totalDistricts}</strong> districts
            </div>
            <div className="w-px h-4 bg-border-light dark:bg-border-dark hidden md:block" />
            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark hidden md:flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-gold" />
              <strong className="text-success tabular-nums">+{platformStats.joinedToday}</strong> joined today
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
