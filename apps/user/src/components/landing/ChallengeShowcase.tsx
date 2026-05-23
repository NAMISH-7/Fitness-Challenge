"use client";

import { motion } from "framer-motion";
import Card from "@tn/shared/components/ui/Card";
import Badge from "@tn/shared/components/ui/Badge";
import { Timer, MapPin, Users, TrendingUp } from "lucide-react";

export default function ChallengeShowcase() {
  return (
    <section className="py-24" id="challenge">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            This Month&apos;s Challenge
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
            May 2026 — &quot;The Monsoon Sprint&quot;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="glow" padding="none" className="overflow-hidden">
            <div className="relative">
              {/* Gradient header */}
              <div className="h-48 sm:h-56 gradient-accent relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-lg font-medium opacity-80">Cover</p>
                    <p className="text-6xl sm:text-8xl font-extrabold">120</p>
                    <p className="text-xl font-medium opacity-80">kilometers this month</p>
                  </div>
                </div>
                <Badge variant="success" className="absolute top-4 right-4">
                  <span className="w-2 h-2 rounded-full bg-success inline-block mr-1 animate-pulse" />
                  Active Now
                </Badge>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Timer className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Time Left</p>
                      <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">8 Days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Avg Distance</p>
                      <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">67.3 km</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Participants</p>
                      <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">18,240</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Completion</p>
                      <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">42%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
