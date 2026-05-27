"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Zap } from "lucide-react";
import Input from "@tn/shared/components/ui/Input";
import Button from "@tn/shared/components/ui/Button";
import Link from "next/link";

// TODO: [FUTURE] Integrate Firebase Authentication
// TODO: [FUTURE] Add Google Sign-In via Firebase
// TODO: [FUTURE] Add Apple Sign-In
// TODO: [FUTURE] Add email verification flow
// TODO: [FUTURE] Add password reset flow

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API delay
    setTimeout(() => {
      // Set sessionStorage flag (auto-clears when tab/window closes)
      sessionStorage.setItem("user_auth", "true");
      // Set a session cookie (auto-clears when browser/session closes)
      document.cookie = "user_auth=true; path=/";
      // Force a full reload to the dashboard
      window.location.href = "/dashboard";
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-light via-surface-light-alt to-bg-light dark:from-bg-dark dark:via-surface-dark-alt dark:to-bg-dark" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center shadow-lg shadow-primary/25">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
            {isSignUp ? "Join the Movement" : "Welcome Back"}
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
            {isSignUp
              ? "Create your account and start your fitness journey"
              : "Sign in to track your progress"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-card">
          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Continue with Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer">
              <svg className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Continue with Apple
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border-light dark:bg-border-dark opacity-60" />
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-semibold tracking-wide whitespace-nowrap uppercase">
              or use credentials
            </span>
            <div className="flex-1 h-px bg-border-light dark:bg-border-dark opacity-60" />
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleAuth}>
            {isSignUp && (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                icon={<User className="w-4 h-4" />}
              />
            )}
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
            />

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border-light accent-primary" />
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    Remember me
                  </span>
                </label>
                <button type="button" className="text-primary hover:text-primary-light transition-colors cursor-pointer">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </div>
              ) : (
                isSignUp ? "Create Account" : "Sign In"
              )}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:text-primary-light font-semibold transition-colors cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark mt-4">
          By continuing, you agree to our{" "}
          <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and{" "}
          <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
}
