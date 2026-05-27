"use client";

import { motion } from "framer-motion";
import Card from "@tn/shared/components/ui/Card";
import { Activity, CheckCircle, Clock, Server, Database, Globe } from "lucide-react";

export default function SystemStatusPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 text-success mb-6 glow-success">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
            System Status
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-xl mx-auto">
            All systems are fully operational. Check the real-time status of our core services and infrastructure below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { name: "API Servers", status: "Operational", uptime: "99.99%", icon: Server },
            { name: "Database", status: "Operational", uptime: "99.95%", icon: Database },
            { name: "Web Application", status: "Operational", uptime: "100%", icon: Globe },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="h-full flex flex-col items-center justify-center py-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-success/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <service.icon className="w-8 h-8 text-text-secondary-light dark:text-text-secondary-dark mb-4" />
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-1">{service.name}</h3>
                <div className="flex items-center gap-2 text-success font-medium text-sm mb-4">
                  <CheckCircle className="w-4 h-4" /> {service.status}
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-auto border-t border-border-light dark:border-border-dark w-full pt-4">
                  Uptime (90 Days): {service.uptime}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass">
            <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
              Recent Incidents
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-surface-light-alt dark:bg-surface-dark-alt border border-border-light dark:border-border-dark">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark text-center py-8">
                  No incidents reported in the last 30 days.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
