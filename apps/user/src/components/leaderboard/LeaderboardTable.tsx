"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Participant } from "@tn/shared/data/mock";
import Badge from "@tn/shared/components/ui/Badge";
import Button from "@tn/shared/components/ui/Button";
import { TrendingUp, TrendingDown, Minus, CheckCircle2, RefreshCw, Play, Square } from "lucide-react";

interface LeaderboardTableProps {
  participants: Participant[];
}

export default function LeaderboardTable({ participants: initialParticipants }: LeaderboardTableProps) {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants.slice(3));
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        setParticipants((current) => {
          // Randomly pick 1-3 participants to increment
          const toIncrement = Math.floor(Math.random() * 3) + 1;
          const updated = [...current];
          
          for (let i = 0; i < toIncrement; i++) {
            const randomIndex = Math.floor(Math.random() * updated.length);
            const p = updated[randomIndex];
            updated[randomIndex] = {
              ...p,
              distanceKm: parseFloat((p.distanceKm + (Math.random() * 0.5 + 0.1)).toFixed(1)),
            };
          }

          // Sort by distance and update ranks
          updated.sort((a, b) => b.distanceKm - a.distanceKm);
          
          return updated.map((p, index) => {
            const newRank = index + 4; // Because top 3 are separate
            return {
              ...p,
              previousRank: p.rank !== newRank ? p.rank : p.previousRank,
              rank: newRank,
            };
          });
        });
      }, 2500); // Update every 2.5 seconds
    }
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
          All Participants
        </h3>
        <Button 
          variant={isLive ? "primary" : "outline"}
          size="sm"
          onClick={() => setIsLive(!isLive)}
          className="flex items-center gap-2 transition-all duration-300"
        >
          {isLive ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Live Updates Active
              <Square className="w-3 h-3 ml-1 opacity-50" />
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Simulate Live Data
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2 relative">
        <AnimatePresence>
          {participants.map((participant) => {
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
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group
                  ${rankDiff > 0 && isLive ? 'bg-success/5 border-success/20 shadow-lg shadow-success/10' : 
                    rankDiff < 0 && isLive ? 'bg-danger/5 border-danger/20' : 
                    'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:border-primary/30 hover:shadow-lg'
                  }
                `}
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
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-0.5 text-success">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{rankDiff}</span>
                    </motion.div>
                  ) : rankDiff < 0 ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-0.5 text-danger">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{Math.abs(rankDiff)}</span>
                    </motion.div>
                  ) : (
                    <Minus className="w-3.5 h-3.5 text-text-secondary-light dark:text-text-secondary-dark" />
                  )}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0 relative">
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                  {rankDiff > 0 && isLive && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-success/20" 
                    />
                  )}
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

                {/* Badges */}
                <div className="hidden md:flex items-center gap-1">
                  {participant.badges.slice(0, 2).map((badge, bi) => (
                    <Badge key={bi} variant="default" size="sm">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Distance */}
                <div className="text-right">
                  <motion.span 
                    key={participant.distanceKm}
                    initial={isLive ? { scale: 1.2, color: "#10b981" } : {}}
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
