"use client";

import { motion } from "framer-motion";
import { districtStats, collegeRankings, weeklyChampions, platformStats } from "@tn/shared/data/mock";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import Badge from "@tn/shared/components/ui/Badge";
import { Trophy, GraduationCap, MapPin, TrendingUp, Crown, Flame, Users, User } from "lucide-react";

export default function CommunityPulse() {
  const topColleges = collegeRankings.slice(0, 5);
  const topDistricts = districtStats.slice(0, 5);

  return (
    <div className="relative overflow-hidden mb-20">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 dark:bg-success/20 text-success text-sm font-bold mb-4">
            <Flame className="w-4 h-4" />
            Statewide Progress
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
            Tamil Nadu is <span className="gradient-text">Moving Together</span>
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg max-w-2xl mx-auto">
            This week&apos;s champions, top colleges, and the districts leading the charge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top Colleges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card !p-0 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border-light dark:border-border-dark bg-gradient-to-r from-secondary/5 to-transparent dark:from-secondary/10">
              <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-secondary" />
                College Rankings
              </h3>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{platformStats.totalColleges}+ colleges competing</p>
            </div>
            <div className="p-5 space-y-3">
              {topColleges.map((college, i) => {
                const rankDiff = college.previousRank - college.rank;
                return (
                  <div key={college.id} className="flex items-center gap-3 group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      i === 0 ? "bg-gold/20 text-gold" :
                      i === 1 ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300" :
                      i === 2 ? "bg-orange-100 dark:bg-orange-900/30 text-bronze" :
                      "bg-surface-light-alt dark:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark"
                    }`}>
                      #{college.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary-light dark:text-text-primary-dark text-sm truncate">
                        {college.name}
                      </p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        {college.district} • {college.participantCount} members
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="font-bold text-sm text-primary tabular-nums">
                        {(college.totalDistanceKm / 1000).toFixed(1)}K
                      </span>
                      {rankDiff > 0 && (
                        <TrendingUp className="w-3.5 h-3.5 text-success" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* District Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card !p-0 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border-light dark:border-border-dark bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10">
              <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                District Leaderboard
              </h3>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{platformStats.totalDistricts} districts active</p>
            </div>
            <div className="p-5 space-y-3">
              {topDistricts.map((district, i) => (
                <div key={district.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${
                        i === 0 ? "text-gold" : i === 1 ? "text-silver" : i === 2 ? "text-bronze" : "text-text-secondary-light dark:text-text-secondary-dark"
                      }`}>
                        #{district.rank}
                      </span>
                      <span className="font-semibold text-text-primary-light dark:text-text-primary-dark text-sm">
                        {district.name}
                      </span>
                      <Badge variant="primary" size="sm">
                        <Users className="w-2.5 h-2.5" />
                        <AnimatedCounter value={district.participants} />
                      </Badge>
                    </div>
                    <span className="text-xs font-bold text-success flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +{district.weeklyGrowth}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-light-alt dark:bg-surface-dark-alt overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(district.totalKm / topDistricts[0].totalKm) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: district.color }}
                    />
                  </div>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 tabular-nums">
                    {(district.totalKm / 1000).toFixed(0)}K km covered
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
