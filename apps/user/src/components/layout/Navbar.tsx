"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Trophy, User, Calendar, Info, LayoutDashboard, Zap, Bell, Settings, Activity, MessageSquare, HelpCircle, LogOut } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { events } from "@tn/shared/data/mock";
import ThemeToggle from "@tn/shared/components/ui/ThemeToggle";
import { cn } from "@tn/shared/lib/utils";

const navLinks = [
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Check for mock auth cookie on mount
    if (document.cookie.includes("user_auth=true")) {
      setIsAuthenticated(true);
    }
  }, []);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { registeredEventIds, readNotificationIds, markAsRead, markAllAsRead } = useEventStore();

  const notifications = registeredEventIds.map(id => {
    const event = events.find(e => e.id === id);
    if (!event) return null;
    if (event.status === "ongoing") {
      return { id: event.id, title: event.title, message: "This event is happening today!", type: "alert", icon: Activity };
    }
    if (event.status === "upcoming") {
      return { id: event.id, title: event.title, message: `Upcoming on ${event.date}`, type: "info", icon: Calendar };
    }
    return null;
  }).filter(Boolean);

  const unreadCount = notifications.filter((n: { id: string } | null) => n && !readNotificationIds.includes(n.id)).length;

  const handleLogout = () => {
    setIsProfileOpen(false);
    setIsAuthenticated(false);
    document.cookie = "user_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to home if on a protected route
    if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Don't show navbar on admin page (it has its own sidebar)
  if (pathname === "/admin") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
              TN<span className="gradient-text">Fitness</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border border-border-light dark:border-border-dark"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                Join Challenge
              </Link>
            )}



            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-border-light dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Absolute Far Right User Actions */}
      {isAuthenticated && (
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
          {/* Notification Dropdown Container */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:bg-surface-light dark:hover:bg-surface-dark transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-xl z-50 overflow-hidden flex flex-col"
                >
                    <div className="px-4 py-3 border-b border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt flex justify-between items-center">
                      <span className="font-semibold text-sm text-text-primary-light dark:text-text-primary-dark">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{unreadCount} New</span>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif: { id: string, icon: any, type: string, title: string, message: string }) => {
                          const Icon = notif.icon;
                          const isUnread = !readNotificationIds.includes(notif.id);
                          return (
                            <div 
                              key={notif.id} 
                              onClick={() => {
                                markAsRead(notif.id);
                                setIsNotificationOpen(false);
                                router.push(`/events/${notif.id}`);
                              }}
                              className={`px-4 py-3 border-b border-border-light/50 dark:border-border-dark/50 transition-colors cursor-pointer ${isUnread ? 'bg-surface-light-alt dark:bg-surface-dark-alt hover:bg-gray-100 dark:hover:bg-gray-800' : 'bg-transparent hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt'}`}
                            >
                              <div className="flex gap-3 items-start">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'alert' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark truncate">{notif.title}</p>
                                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{notif.message}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <Bell className="w-8 h-8 text-text-secondary-light/50 dark:text-text-secondary-dark/50 mx-auto mb-2" />
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">You have no new notifications.</p>
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-center">
                      <button onClick={() => markAllAsRead(notifications.map((n: { id: string }) => n.id))} className="text-xs font-medium text-primary hover:text-primary-dark transition-colors">
                        Mark all as read
                      </button>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-full overflow-hidden border border-border-light dark:border-border-dark flex items-center justify-center bg-surface-light dark:bg-surface-dark hover:border-primary transition-colors cursor-pointer shadow-sm"
              aria-label="Profile menu"
            >
              <User className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-xl z-50 overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="px-4 py-4 border-b border-border-light dark:border-border-dark flex items-center gap-3 bg-surface-light-alt dark:bg-surface-dark-alt">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                         <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm truncate text-text-primary-light dark:text-text-primary-dark">TN Athlete</span>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">athlete@tnfitness.gov.in</span>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        <span>Dashboard</span>
                      </Link>
                      <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt transition-colors">
                        <User className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        <span>Your Profile</span>
                      </Link>
                    </div>

                    <div className="py-2 border-t border-border-light dark:border-border-dark">
                      <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt transition-colors">
                        <Settings className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        <span>Settings</span>
                      </button>
                      <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt transition-colors">
                        <Activity className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        <span>System Status</span>
                      </button>
                    </div>

                    <div className="py-2 border-t border-border-light dark:border-border-dark">
                      <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt transition-colors">
                        <HelpCircle className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        <span>Help & Support</span>
                      </button>
                      <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt transition-colors">
                        <MessageSquare className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        <span>Send Feedback</span>
                      </button>
                    </div>

                    <div className="py-2 border-t border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt">
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Sign out</span>
                      </button>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border-light dark:border-border-dark glass overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl text-sm font-semibold bg-surface-light-alt dark:bg-surface-dark-alt border border-border-light dark:border-border-dark transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-all"
                >
                  Join Challenge
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
