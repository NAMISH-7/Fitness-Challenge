"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@tn/shared/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse", className)} />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative w-10 h-10 rounded-xl flex items-center justify-center",
        "bg-surface-light dark:bg-surface-dark",
        "border border-border-light dark:border-border-dark",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-all duration-300 cursor-pointer",
        "group",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "w-5 h-5 absolute transition-all duration-300",
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        )}
      />
      <Moon
        className={cn(
          "w-5 h-5 absolute transition-all duration-300",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100 text-primary"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
    </button>
  );
}
