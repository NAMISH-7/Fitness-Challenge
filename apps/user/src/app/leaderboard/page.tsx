"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { participants, collegeRankings, currentUser } from "@tn/shared/data/mock";
import { useActivityStore } from "@/store/useActivityStore";
import TopThree from "@/components/leaderboard/TopThree";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LeaderboardTabs from "@/components/leaderboard/LeaderboardTabs";
import SearchFilter from "@/components/leaderboard/SearchFilter";
import Badge from "@tn/shared/components/ui/Badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

// TODO: [FUTURE] Replace with real-time Firestore leaderboard queries
// TODO: [FUTURE] Add pagination / infinite scroll for large datasets
// TODO: [FUTURE] Add anti-cheat verification badges

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("individual");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");

  const { activities } = useActivityStore();
  const totalLoggedDistance = activities.reduce((acc, curr) => acc + curr.distance, 0);
  const displayTotalDistance = currentUser.distanceKm + totalLoggedDistance;

  const dynamicParticipants = useMemo(() => {
    // Remove the fake placeholder for the current user ID if it exists
    const filtered = participants.filter((p) => p.id !== currentUser.id);
    
    // Add the actual current user with their dynamically logged distance
    const activeUser = {
      ...currentUser,
      distanceKm: displayTotalDistance,
    };
    filtered.push(activeUser);

    // Re-sort the leaderboard by distance
    filtered.sort((a, b) => b.distanceKm - a.distanceKm);

    // Re-assign ranks based on the new sorted order
    return filtered.map((p, index) => ({
      ...p,
      rank: index + 1,
    }));
  }, [displayTotalDistance]);

  const filteredParticipants = useMemo(() => {
    return dynamicParticipants.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = selectedDistrict === "All Districts" || p.district === selectedDistrict;
      return matchesSearch && matchesDistrict;
    });
  }, [searchQuery, selectedDistrict]);

  const filteredColleges = useMemo(() => {
    return collegeRankings.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = selectedDistrict === "All Districts" || c.district === selectedDistrict;
      return matchesSearch && matchesDistrict;
    });
  }, [searchQuery, selectedDistrict]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            May 2026 Rankings
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-3">
            Leaderboard
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
            See who&apos;s leading the charge across Tamil Nadu
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="mb-6">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
          />
        </div>

        {/* Content */}
        {activeTab === "individual" && (
          <>
            {filteredParticipants.length >= 3 && searchQuery === "" && selectedDistrict === "All Districts" ? (
              <>
                <TopThree participants={filteredParticipants} />
                <LeaderboardTable participants={filteredParticipants.slice(3)} />
              </>
            ) : (
              <LeaderboardTable participants={filteredParticipants} />
            )}
            {filteredParticipants.length === 0 && (
              <div className="text-center py-12 text-text-secondary-light dark:text-text-secondary-dark">
                No participants found matching your criteria.
              </div>
            )}
          </>
        )}

        {activeTab === "college" && (
          <div className="space-y-3">
            {filteredColleges.map((college, i) => {
              const rankDiff = college.previousRank - college.rank;
              return (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary/30 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-10 text-center">
                    <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                      #{college.rank}
                    </span>
                  </div>
                  <div className="w-8 flex justify-center">
                    {rankDiff > 0 ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : rankDiff < 0 ? (
                      <TrendingDown className="w-4 h-4 text-danger" />
                    ) : (
                      <Minus className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🏫</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
                      {college.name}
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {college.district} • {college.participantCount} participants
                    </p>
                  </div>
                  <Badge variant="primary" size="md">
                    {college.totalDistanceKm.toLocaleString()} km
                  </Badge>
                </motion.div>
              );
            })}
            {filteredColleges.length === 0 && (
              <div className="text-center py-12 text-text-secondary-light dark:text-text-secondary-dark">
                No colleges found matching your criteria.
              </div>
            )}
          </div>
        )}

        {(activeTab === "monthly" || activeTab === "alltime") && (
          <>
            {filteredParticipants.length >= 3 && searchQuery === "" && selectedDistrict === "All Districts" ? (
              <>
                <TopThree participants={filteredParticipants} />
                <LeaderboardTable participants={filteredParticipants.slice(3)} />
              </>
            ) : (
              <LeaderboardTable participants={filteredParticipants} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
