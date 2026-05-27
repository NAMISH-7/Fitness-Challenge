"use client";

import { motion } from "framer-motion";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import { Settings, Bell, Shield, Key, Moon, Globe, Smartphone, User, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
              Account Settings
            </h1>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Manage your preferences, privacy, and account security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-1">
            <Card variant="glass" className="p-4 bg-surface-light-alt dark:bg-surface-dark-alt">
              <nav className="space-y-2">
                {[
                  { icon: User, label: "Profile", active: true },
                  { icon: Bell, label: "Notifications", active: false },
                  { icon: Shield, label: "Privacy & Security", active: false },
                  { icon: Moon, label: "Appearance", active: false },
                  { icon: Globe, label: "Language & Region", active: false },
                  { icon: Smartphone, label: "Connected Devices", active: false },
                ].map((item, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      item.active 
                        ? "bg-primary text-white" 
                        : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          <div className="space-y-6 md:col-span-2">
            <Card variant="glass">
              <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                Profile Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">First Name</label>
                    <input type="text" disabled defaultValue="TN" className="w-full bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-lg px-4 py-2 text-text-primary-light dark:text-text-primary-dark opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Last Name</label>
                    <input type="text" disabled defaultValue="Athlete" className="w-full bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-lg px-4 py-2 text-text-primary-light dark:text-text-primary-dark opacity-70" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Email Address</label>
                  <input type="email" disabled defaultValue="athlete@tnfitness.gov.in" className="w-full bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-lg px-4 py-2 text-text-primary-light dark:text-text-primary-dark opacity-70" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button className="opacity-50 cursor-not-allowed">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </Card>

            <Card variant="glass">
              <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                Password & Authentication
              </h2>
              <div className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-border-light dark:border-border-dark">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark text-sm">Change Password</h3>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Last changed 3 months ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="pointer-events-none opacity-50">Update</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
