"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Sparkles } from "lucide-react";
import Button from "@tn/shared/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-light via-surface-light-alt to-bg-light dark:from-bg-dark dark:via-surface-dark-alt dark:to-bg-dark" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight">
            <span className="text-text-primary-light dark:text-text-primary-dark">Move</span>
            <br />
            <span className="gradient-text">Tamil Nadu</span>
            <br />
            <span className="text-text-primary-light dark:text-text-primary-dark">Forward</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary-light dark:text-text-secondary-dark leading-relaxed text-balance">
            Join 25,000+ participants across Tamil Nadu in the biggest statewide fitness challenge.
            Walk, run, and compete — every step counts.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/auth">
              <Button size="lg" className="text-lg px-10 py-5 glow-strong">
                Join the Challenge
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" size="lg" className="text-lg px-10 py-5">
                View Leaderboard
              </Button>
            </Link>
          </motion.div>

          {/* Live stats pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-6 mt-8 px-6 py-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
          >
            <div className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-success" />
              <span className="text-text-secondary-light dark:text-text-secondary-dark">
                <strong className="text-text-primary-light dark:text-text-primary-dark">8,500+</strong> active today
              </span>
            </div>
            <div className="w-px h-4 bg-border-light dark:bg-border-dark" />
            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <strong className="text-text-primary-light dark:text-text-primary-dark">1.25M</strong> km covered
            </div>
            <div className="w-px h-4 bg-border-light dark:bg-border-dark hidden sm:block" />
            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark hidden sm:block">
              <strong className="text-text-primary-light dark:text-text-primary-dark">38</strong> districts
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-light dark:from-bg-dark to-transparent" />
    </section>
  );
}
