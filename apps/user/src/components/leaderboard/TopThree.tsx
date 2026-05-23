"use client";

import { motion } from "framer-motion";
import { Participant } from "@tn/shared/data/mock";
import { Trophy } from "lucide-react";

interface TopThreeProps {
  participants: Participant[];
}

export default function TopThree({ participants }: TopThreeProps) {
  const top3 = participants.slice(0, 3);
  // Reorder: 2nd, 1st, 3rd for podium effect
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumHeights = ["h-36", "h-48", "h-28"];
  const medals = ["🥈", "🥇", "🥉"];
  const ringColors = ["border-silver", "border-gold", "border-bronze"];
  const glowColors = ["", "glow-strong", ""];

  return (
    <div className="flex items-end justify-center gap-4 sm:gap-8 mb-12">
      {podiumOrder.map((participant, i) => {
        if (!participant) return null;
        return (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Avatar */}
            <div className={`relative mb-3 ${glowColors[i]}`}>
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 ${ringColors[i]} overflow-hidden bg-surface-light dark:bg-surface-dark`}>
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -top-2 -right-2 text-2xl">{medals[i]}</span>
            </div>

            {/* Name */}
            <p className="text-sm sm:text-base font-semibold text-text-primary-light dark:text-text-primary-dark text-center max-w-[100px] truncate">
              {participant.name}
            </p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              {participant.district}
            </p>
            <p className="text-sm font-bold text-primary mt-1">
              {participant.distanceKm} km
            </p>

            {/* Podium bar */}
            <div className={`w-20 sm:w-28 ${podiumHeights[i]} mt-3 rounded-t-xl ${
              i === 1
                ? "gradient-accent"
                : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
            } flex items-start justify-center pt-3`}>
              <div className="flex items-center gap-1">
                <Trophy className={`w-4 h-4 ${i === 1 ? "text-white" : "text-text-secondary-light dark:text-text-secondary-dark"}`} />
                <span className={`text-xl font-bold ${i === 1 ? "text-white" : "text-text-primary-light dark:text-text-primary-dark"}`}>
                  #{participant.rank}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
