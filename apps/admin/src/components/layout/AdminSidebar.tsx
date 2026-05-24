"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Calendar, Handshake,
  BarChart3, Settings, LogOut, Zap, ChevronLeft, ChevronRight,
} from "lucide-react";
import ThemeToggle from "@tn/shared/components/ui/ThemeToggle";
import { cn } from "@tn/shared/lib/utils";
import { useState } from "react";

const sidebarLinks = [
  { href: "/", label: "Overview", icon: LayoutDashboard, id: "overview" },
  { href: "/users", label: "Users", icon: Users, id: "users" },
  { href: "/events", label: "Events", icon: Calendar, id: "events" },
  { href: "/sponsors", label: "Sponsors", icon: Handshake, id: "sponsors" },
  { href: "/analytics", label: "Analytics", icon: BarChart3, id: "analytics" },
  { href: "/settings", label: "Settings", icon: Settings, id: "settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-50 flex flex-col",
        "bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark",
        "transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-border-light dark:border-border-dark">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold">
              TN<span className="gradient-text">Fitness</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-text-primary-light dark:hover:text-text-primary-dark",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? link.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-border-light dark:border-border-dark space-y-2">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between px-1")}>
          {!collapsed && (
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Theme</span>
          )}
          <ThemeToggle />
        </div>

        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            "text-text-secondary-light dark:text-text-secondary-dark hover:bg-danger/10 hover:text-danger",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && "Logout"}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-xl text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
