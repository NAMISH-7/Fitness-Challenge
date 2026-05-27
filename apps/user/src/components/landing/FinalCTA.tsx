"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Zap } from "lucide-react";
import Button from "@tn/shared/components/ui/Button";
import AnimatedCounter from "@tn/shared/components/ui/AnimatedCounter";
import { platformStats } from "@tn/shared/data/mock";
import { useState, useEffect } from "react";

export default function FinalCTA() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user_auth") === "true") {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 0);
    }
  }, []);

  if (isAuthenticated) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] animate-breathe" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-secondary/10 dark:bg-secondary/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          {/* Headline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-sm font-bold">
            <Zap className="w-4 h-4" />
            Don&apos;t Just Watch — Join
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight leading-tight">
            <span className="gradient-text neon-text">
              <AnimatedCounter value={platformStats.totalParticipants} />
            </span>
            <br />
            <span>athletes are already moving</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Every day, thousands across Tamil Nadu lace up and step out.
            Your district is waiting. Your college needs you.
            <strong className="text-text-primary-light dark:text-text-primary-dark"> Will you join?</strong>
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link href="/auth">
              <Button size="lg" className="text-xl px-12 py-6 glow-strong neon-glow">
                Join the Movement
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 pt-4"
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((id) => (
                <div
                  key={id}
                  className="w-8 h-8 rounded-full border-2 border-bg-light dark:border-bg-dark overflow-hidden"
                >
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=anon${id}`}
                    alt="Participant"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-bold text-success">+{platformStats.joinedToday}</span> joined today
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
