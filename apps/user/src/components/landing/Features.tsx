"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, BarChart3, Users, Shield, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "@tn/shared/components/ui/Card";

const features = [
  {
    icon: BarChart3,
    title: "Track Every Step",
    description: "Sync your fitness apps and automatically track your walking, running, and cycling distance. Every meter counts toward your rank.",
    color: "text-primary",
    bgColor: "bg-primary/10 dark:bg-primary/20",
    glowColor: "group-hover:shadow-primary/20 dark:group-hover:shadow-primary/30",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description: "Climb district and statewide leaderboards, earn achievement badges, and compete against participants across all 38 districts.",
    color: "text-gold",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
    glowColor: "group-hover:shadow-gold/20 dark:group-hover:shadow-gold/30",
  },
  {
    icon: Users,
    title: "College Battles",
    description: "Represent your college in inter-college fitness challenges. Rally your hostel, your department — dominate the college rankings.",
    color: "text-secondary",
    bgColor: "bg-secondary/10 dark:bg-secondary/20",
    glowColor: "group-hover:shadow-secondary/20 dark:group-hover:shadow-secondary/30",
  },
  {
    icon: Shield,
    title: "Verified & Fair",
    description: "Anti-cheat systems and verified tracking ensure a level playing field. Earn the verified badge and prove your dedication.",
    color: "text-success",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    glowColor: "group-hover:shadow-success/20 dark:group-hover:shadow-success/30",
  },
  {
    icon: Zap,
    title: "Streak Rewards",
    description: "Maintain daily activity streaks to unlock exclusive badges and climb faster. The longer your streak, the bigger the rewards.",
    color: "text-danger",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    glowColor: "group-hover:shadow-danger/20 dark:group-hover:shadow-danger/30",
  },
  {
    icon: Target,
    title: "Monthly Challenges",
    description: "New challenges every month — from 100K distance goals to campus sprints. There's always something to push you forward.",
    color: "text-primary-light",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
    glowColor: "group-hover:shadow-primary-light/20 dark:group-hover:shadow-primary-light/30",
  },
];

export default function Features() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(features.length / itemsPerPage);
  const currentFeatures = features.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <section className="py-20 relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Why Join <span className="gradient-text">TNFitness</span>?
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
            More than just a fitness app — it&apos;s a movement. Here&apos;s what makes us different.
          </p>
        </motion.div>

        {/* Feature Cards Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    variant="glass"
                    className={`h-full group ${feature.glowColor} hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 relative`}
                    >
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                      {/* Glow ring on hover */}
                      <div className={`absolute inset-0 rounded-xl ${feature.bgColor} opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-300`} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setPage((prev) => (prev - 1 + totalPages) % totalPages)}
                className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-text-secondary-light dark:text-text-secondary-dark"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === page ? "w-8 bg-primary" : "w-2 bg-border-light dark:bg-border-dark hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setPage((prev) => (prev + 1) % totalPages)}
                className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-text-secondary-light dark:text-text-secondary-dark"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
