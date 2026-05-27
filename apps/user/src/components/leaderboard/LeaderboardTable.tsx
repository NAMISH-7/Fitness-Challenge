"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Participant } from "@tn/shared/data/mock";
import Badge from "@tn/shared/components/ui/Badge";
import { TrendingUp, TrendingDown, Minus, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";

interface LeaderboardTableProps {
  participants: Participant[];
  isLoggedIn?: boolean;
}

export default function LeaderboardTable({ participants: initialParticipants, isLoggedIn = false }: LeaderboardTableProps) {

  const [sortKey, setSortKey] = useState<string>("distanceKm");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder(key === "name" ? "asc" : "desc");
    }
  };

  const renderSortIcon = (columnKey: string) => {
    const isActive = sortKey === columnKey;
    return (
      <div className="inline-flex flex-col items-center justify-center ml-1">
        <ChevronUp className={`w-3 h-3 -mb-[3px] ${isActive && sortOrder === "asc" ? "text-primary opacity-100" : "opacity-40"}`} />
        <ChevronDown className={`w-3 h-3 ${isActive && sortOrder === "desc" ? "text-primary opacity-100" : "opacity-40"}`} />
      </div>
    );
  };

  const sortedParticipants = useMemo(() => {
    const sorted = [...initialParticipants];
    sorted.sort((a, b) => {
      const aVal = a[sortKey as keyof Participant];
      const bVal = b[sortKey as keyof Participant];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc"
          ? aVal - bVal
          : bVal - aVal;
      }

      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        return sortOrder === "asc"
          ? aVal.length - bVal.length
          : bVal.length - aVal.length;
      }

      return 0;
    });

    return sorted;
  }, [initialParticipants, sortKey, sortOrder]);


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
          All Participants
        </h3>
      </div>

      {/* Sorting Column Headers */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-border-light dark:border-border-dark text-[11px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-3">
        <button onClick={() => handleSort("rank")} className="w-10 text-center hover:text-primary transition-colors flex items-center justify-center gap-1 cursor-pointer font-bold select-none">
          Rank {renderSortIcon("rank")}
        </button>
        <div className="w-10" />
        <button onClick={() => handleSort("name")} className="flex-1 text-left hover:text-primary transition-colors flex items-center gap-1 cursor-pointer font-bold select-none">
          Athlete {renderSortIcon("name")}
        </button>
        <div className="hidden md:block w-48" />
        <button onClick={() => handleSort("streak")} className="hidden sm:flex items-center gap-1 hover:text-primary transition-colors cursor-pointer w-16 justify-center font-bold select-none">
          Streak {renderSortIcon("streak")}
        </button>
        <button onClick={() => handleSort("distanceKm")} className="text-right hover:text-primary transition-colors flex items-center justify-end gap-1 cursor-pointer w-24 font-bold select-none">
          Distance {renderSortIcon("distanceKm")}
        </button>
      </div>

      <div className="space-y-2 relative">
        <AnimatePresence>
          {sortedParticipants.map((participant) => {
            const rankDiff = participant.previousRank - participant.rank;
            return (
              <motion.div
                key={participant.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  duration: 0.3
                }}
                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:border-primary/30 hover:shadow-lg"
              >
                {/* Rank */}
                <div className="w-10 text-center">
                  <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                    {participant.rank}
                  </span>
                </div>


                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0 relative">
                  {isLoggedIn ? (
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-light-alt dark:bg-surface-dark-alt text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">
                      ?
                    </div>
                  )}
                </div>

                {/* Name & Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
                      {isLoggedIn ? participant.name : `Participant #${participant.id}`}
                    </span>
                    {isLoggedIn && participant.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    <span>{participant.district}</span>
                    {isLoggedIn && participant.college && (
                      <>
                        <span>•</span>
                        <span className="truncate">{participant.college}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="hidden md:flex flex-wrap items-center gap-1 w-48">
                  {participant.badges.slice(0, 2).map((badge, bi) => (
                    <Badge key={bi} variant="default" size="sm">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Streak */}
                <div className="hidden sm:flex items-center justify-center gap-1 w-16">
                  <span className="text-sm">🔥</span>
                  <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    {participant.streak}
                  </span>
                </div>

                {/* Distance */}
                <div className="text-right">
                  <motion.span
                    key={participant.distanceKm}
                    initial={{}}
                    animate={{ scale: 1, color: "var(--color-primary)" }}
                    transition={{ duration: 0.5 }}
                    className="text-lg font-bold text-primary inline-block"
                  >
                    {participant.distanceKm.toFixed(1)}
                  </motion.span>
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark ml-1">
                    km
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
