"use client";

import { motion } from "framer-motion";
import Card from "@tn/shared/components/ui/Card";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import {
  Heart, Target, Users, Globe, Lightbulb, Rocket,
  GraduationCap, Shield, Smartphone, BarChart3
} from "lucide-react";

const milestones = [
  { year: "2024", title: "Idea Born", desc: "Concept developed at a college hackathon in Chennai" },
  { year: "2025", title: "Pilot Launch", desc: "Beta launched across 5 colleges with 500 participants" },
  { year: "2025", title: "State Expansion", desc: "Expanded to all 38 districts with 15,000+ users" },
  { year: "2026", title: "Scale Up", desc: "25,000+ participants, 150+ colleges, partnerships secured" },
];

const futureFeatures = [
  { icon: Smartphone, title: "Mobile App", desc: "Native iOS and Android apps for seamless tracking" },
  { icon: Shield, title: "AI Anti-Cheat", desc: "ML-powered verification to ensure fair competition" },
  { icon: BarChart3, title: "Advanced Analytics", desc: "Detailed insights, heat maps, and progress predictions" },
  { icon: Globe, title: "Pan-India Expansion", desc: "Expanding to Karnataka, Kerala, and Andhra Pradesh" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Our Mission
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-6">
            Making Tamil Nadu the
            <br />
            <span className="gradient-text">Fittest State in India</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            TNFitness started as a simple idea at a college hackathon — what if we could gamify fitness
            and make the entire state compete together? Today, we&apos;re the largest statewide fitness
            challenge platform, bringing together students, professionals, and communities across all 38 districts.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            { value: 25000, label: "Active Participants", suffix: "+" },
            { value: 150, label: "Colleges Participating", suffix: "+" },
            { value: 1250000, label: "Kilometers Covered", suffix: "+" },
            { value: 38, label: "Districts Reached", suffix: "" },
          ].map((stat, i) => (
            <Card key={i} variant="glass" className="text-center py-8">
              <p className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {stat.label}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Why This Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-8 text-center">
            Why This Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Health Crisis",
                desc: "Tamil Nadu has one of the highest rates of lifestyle diseases in India. Physical inactivity is a leading contributor. We're changing that, one step at a time.",
                color: "text-danger",
                bg: "bg-red-100 dark:bg-red-900/20",
              },
              {
                icon: GraduationCap,
                title: "Youth-Led Movement",
                desc: "Built by students, for everyone. We believe the youth can drive lasting change in health awareness and community fitness across the state.",
                color: "text-secondary",
                bg: "bg-secondary/10 dark:bg-secondary/20",
              },
              {
                icon: Target,
                title: "Gamified Motivation",
                desc: "Leaderboards, badges, streaks, and college rivalries turn exercise into a game. When fitness is fun, people actually stick with it.",
                color: "text-primary",
                bg: "bg-primary/10 dark:bg-primary/20",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} variant="glass" className="h-full">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-8 text-center">
            Our Journey
          </h2>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border-light dark:bg-border-dark sm:-translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-primary sm:-translate-x-1/2 -translate-x-1/2 mt-2 glow" />

                  <div className={`flex-1 ml-10 sm:ml-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <span className="text-sm font-bold text-primary">{m.year}</span>
                    <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                      {m.title}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {m.desc}
                    </p>
                  </div>

                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary text-sm font-medium mb-4">
              <Rocket className="w-4 h-4" />
              Coming Soon
            </div>
            <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              The Future of TNFitness
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {futureFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <Card key={feat.title} variant="glass" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {feat.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
