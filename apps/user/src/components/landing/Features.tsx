"use client";

import { motion } from "framer-motion";
import { Trophy, BarChart3, Users, Shield } from "lucide-react";
import Card from "@tn/shared/components/ui/Card";

const features = [
  {
    icon: BarChart3,
    title: "Track Every Step",
    description: "Sync your fitness apps and automatically track your walking and running distance across the month.",
    color: "text-primary",
    bgColor: "bg-primary/10 dark:bg-primary/20",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description: "Climb the leaderboards, earn badges, and compete against participants across all 38 districts of Tamil Nadu.",
    color: "text-gold",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
  },
  {
    icon: Users,
    title: "College Battles",
    description: "Represent your college in inter-college fitness challenges. Rally your peers and dominate the rankings.",
    color: "text-secondary",
    bgColor: "bg-secondary/10 dark:bg-secondary/20",
  },
  {
    icon: Shield,
    title: "Verified & Fair",
    description: "Anti-cheat systems and verified tracking ensure a level playing field for every participant.",
    color: "text-success",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Features() {
  return (
    <section className="py-24 relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Why Join <span className="gradient-text">TNFitness</span>?
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
            More than just a fitness app — it&apos;s a movement. Here&apos;s what makes us different.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={item}>
                <Card variant="glass" className="h-full group">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
