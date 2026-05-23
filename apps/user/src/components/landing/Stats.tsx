"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import { platformStats } from "@tn/shared/data/mock";

const stats = [
  { label: "Active Participants", value: platformStats.totalParticipants, suffix: "+", icon: "🏃" },
  { label: "Kilometers Covered", value: platformStats.totalDistanceKm, suffix: "+", icon: "📍" },
  { label: "Colleges Participating", value: platformStats.totalColleges, suffix: "+", icon: "🏫" },
  { label: "Districts Reached", value: platformStats.totalDistricts, suffix: "", icon: "🗺️" },
];

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            The Numbers Speak
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
            Tamil Nadu is moving — and here&apos;s the proof.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="glass-card flex flex-col items-center py-8">
                <span className="text-4xl mb-3">{stat.icon}</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
