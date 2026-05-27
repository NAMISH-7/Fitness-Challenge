"use client";

import { motion } from "framer-motion";
import { districtStats, districtRivalries } from "@tn/shared/data/mock";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import { TrendingUp, Flame, MapPin, Swords } from "lucide-react";

export default function DistrictRivalry() {
  const topDistricts = districtStats.slice(0, 6);

  return (
    <div className="relative overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Districts Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-10 text-center tracking-tight">
            🏆 Top Districts — May 2026
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topDistricts.map((district, i) => (
              <motion.div
                key={district.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card !p-4 text-center group"
              >
                {/* Rank */}
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-extrabold text-sm"
                  style={{ backgroundColor: district.color }}
                >
                  #{district.rank}
                </div>

                {/* Name */}
                <h4 className="font-bold text-text-primary-light dark:text-text-primary-dark text-sm mb-1">
                  {district.name}
                </h4>

                {/* Stats */}
                <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark space-y-0.5">
                  <p>
                    <span className="font-bold text-text-primary-light dark:text-text-primary-dark">
                      <AnimatedCounter value={district.participants} />
                    </span>{" "}
                    active
                  </p>
                  <p>
                    <span className="font-bold text-primary">
                      {(district.totalKm / 1000).toFixed(0)}K
                    </span>{" "}
                    km
                  </p>
                </div>

                {/* Growth */}
                <div className="mt-2 inline-flex items-center gap-0.5 text-xs text-success font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  +{district.weeklyGrowth}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rivalry Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {districtRivalries.map((rivalry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative glass-card border-primary/20 dark:border-primary/30 !p-5"
            >
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs font-bold">
                  <TrendingUp className="w-3 h-3" />
                  {rivalry.trending} trending
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">🔥 Hot Rivalry</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{rivalry.headline}</p>
              </div>

              {/* VS Display */}
              <div className="space-y-3">
                {/* District 1 */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {rivalry.district1}
                    </span>
                    <span className="text-sm font-bold text-primary tabular-nums">
                      {(rivalry.d1Km / 1000).toFixed(1)}K km
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-surface-light-alt dark:bg-surface-dark-alt overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(rivalry.d1Km / Math.max(rivalry.d1Km, rivalry.d2Km)) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                    />
                  </div>
                </div>

                {/* VS Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
                  <span className="text-xs font-extrabold text-text-secondary-light dark:text-text-secondary-dark tracking-widest">VS</span>
                  <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
                </div>

                {/* District 2 */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      {rivalry.district2}
                    </span>
                    <span className="text-sm font-bold text-secondary tabular-nums">
                      {(rivalry.d2Km / 1000).toFixed(1)}K km
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-surface-light-alt dark:bg-surface-dark-alt overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(rivalry.d2Km / Math.max(rivalry.d1Km, rivalry.d2Km)) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary-light"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Gap: <strong className="text-text-primary-light dark:text-text-primary-dark">{(rivalry.gap / 1000).toFixed(1)}K km</strong>
                </span>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  );
}
