"use client";

import { motion } from "framer-motion";
import { Participant } from "@tn/shared/data/mock";
import Badge from "@tn/shared/components/ui/Badge";
import { TrendingUp, TrendingDown, Minus, CheckCircle2 } from "lucide-react";

interface LeaderboardTableProps {
  participants: Participant[];
}

export default function LeaderboardTable({ participants }: LeaderboardTableProps) {
  return (
    <div className="space-y-2">
      {participants.slice(3).map((participant, i) => {
        const rankDiff = participant.previousRank - participant.rank;
        return (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary/30 hover:shadow-lg transition-all duration-200 group"
          >
            {/* Rank */}
            <div className="w-10 text-center">
              <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                {participant.rank}
              </span>
            </div>

            {/* Rank Change */}
            <div className="w-8 flex justify-center">
              {rankDiff > 0 ? (
                <div className="flex items-center gap-0.5 text-success">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{rankDiff}</span>
                </div>
              ) : rankDiff < 0 ? (
                <div className="flex items-center gap-0.5 text-danger">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{Math.abs(rankDiff)}</span>
                </div>
              ) : (
                <Minus className="w-3.5 h-3.5 text-text-secondary-light dark:text-text-secondary-dark" />
              )}
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
                  {participant.name}
                </span>
                {participant.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                <span>{participant.district}</span>
                {participant.college && (
                  <>
                    <span>•</span>
                    <span className="truncate">{participant.college}</span>
                  </>
                )}
              </div>
            </div>

            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-sm">🔥</span>
              <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                {participant.streak}
              </span>
            </div>

            {/* Badges (first 2) */}
            <div className="hidden md:flex items-center gap-1">
              {participant.badges.slice(0, 2).map((badge, bi) => (
                <Badge key={bi} variant="default" size="sm">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Distance */}
            <div className="text-right">
              <span className="text-lg font-bold text-primary">
                {participant.distanceKm}
              </span>
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark ml-1">
                km
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
