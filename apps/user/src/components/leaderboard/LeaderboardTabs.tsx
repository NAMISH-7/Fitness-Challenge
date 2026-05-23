"use client";

import { cn } from "@tn/shared/lib/utils";

interface LeaderboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "individual", label: "Individual" },
  { id: "college", label: "College" },
  { id: "monthly", label: "Monthly" },
  { id: "alltime", label: "All-Time" },
];

export default function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark w-full sm:w-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
            activeTab === tab.id
              ? "bg-primary text-white shadow-md shadow-primary/25"
              : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
