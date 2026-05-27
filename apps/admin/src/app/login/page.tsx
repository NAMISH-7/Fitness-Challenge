"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Card from "@tn/shared/components/ui/Card";
import Input from "@tn/shared/components/ui/Input";
import Button from "@tn/shared/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication delay
    setTimeout(() => {
      // Set sessionStorage flag (auto-clears when tab/window closes)
      sessionStorage.setItem("admin_auth", "true");
      // Set a simple cookie to indicate authentication
      document.cookie = "admin_auth=true; path=/";
      
      // Force a full reload to the dashboard so middleware picks up the cookie
      window.location.href = "/";
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-light dark:bg-bg-dark p-4">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-lg shadow-primary/20 mb-4"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight text-center">
            Admin Portal
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-center">
            Secure access to the TNFitness management dashboard
          </p>
        </div>

        <Card hover={false} className="p-8 backdrop-blur-xl bg-surface-light/80 dark:bg-surface-dark/80 border-white/20 dark:border-white/10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark ml-1">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@tnfitness.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark ml-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-12 text-base mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Sign In to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark mt-8 opacity-60">
          © {new Date().getFullYear()} TNFitness Inc. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
