"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";
import Card from "@tn/shared/components/ui/Card";
import Badge from "@tn/shared/components/ui/Badge";
import Button from "@tn/shared/components/ui/Button";
import Link from "next/link";
import {
  Calendar, MapPin, Users, ArrowRight, Clock,
  Trophy, Megaphone, Monitor, GraduationCap, ChevronLeft, ChevronRight,
  Flame, AlertTriangle, Building2, Plus
} from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  marathon: <Trophy className="w-5 h-5" />,
  campus: <GraduationCap className="w-5 h-5" />,
  awareness: <Megaphone className="w-5 h-5" />,
  virtual: <Monitor className="w-5 h-5" />,
};

const typeLabels: Record<string, string> = {
  marathon: "Marathon",
  campus: "Campus Challenge",
  awareness: "Awareness Drive",
  virtual: "Virtual Event",
};

const typeGradients: Record<string, string> = {
  marathon: "from-primary via-primary-dark to-cyan-900",
  campus: "from-secondary via-purple-700 to-indigo-900",
  awareness: "from-emerald-500 via-emerald-600 to-teal-800",
  virtual: "from-amber-500 via-orange-500 to-red-700",
};

const statusBadgeVariant: Record<string, "success" | "primary" | "default"> = {
  upcoming: "primary",
  ongoing: "success",
  completed: "default",
};

const filterTabs = ["all", "upcoming", "ongoing", "completed", "campus", "marathon"];

function getCountdown(dateStr: string) {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, mins };
}

function getCapacityPercent(current: number, max?: number) {
  if (!max) return null;
  return Math.round((current / max) * 100);
}

// Generate deterministic avatar seeds for participant stacks
const avatarSeeds = ["Arun K", "Priya M", "Vijay S", "Deepa N", "Senthil R", "Kavitha D", "Ravi K"];

export default function EventsPage() {
  const { events, isLoading } = useDataStore();
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentEventIdx, setCurrentEventIdx] = useState(0);
  const [, setTick] = useState(0);

  const filteredEvents = events.filter((e) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "campus" || activeFilter === "marathon") return e.type === activeFilter;
    return e.status === activeFilter;
  });

  const featuredEvents = events.filter((e) => e.isFeatured && e.status !== "completed");

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (featuredEvents.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentEventIdx((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  const handleNext = () => setCurrentEventIdx((prev) => (prev + 1) % featuredEvents.length);
  const handlePrev = () => setCurrentEventIdx((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Events & Challenges
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-3">
              Upcoming Events
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
              Join marathons, campus challenges, and awareness drives across Tamil Nadu
            </p>
          </div>
          <Link href="/events/propose" className="shrink-0 self-start md:self-center">
            <Button variant="outline" size="sm" className="inline-flex items-center gap-1.5 hover:border-primary hover:text-primary transition-colors">
              <Plus className="w-4 h-4" /> Propose New Event
            </Button>
          </Link>
        </motion.div>

        {/* Featured Events Carousel */}
        {featuredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 relative"
          >
            <Card variant="glow" padding="none" className="overflow-hidden relative h-72 sm:h-80 gradient-accent">
              <div className="absolute inset-0 bg-black/30 z-0" />
              <div
                className="absolute inset-0 opacity-10 z-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEventIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-16"
                >
                  <Badge variant="success" className="mb-4">
                    <span className="w-2 h-2 rounded-full bg-white inline-block mr-1 animate-pulse" />
                    {featuredEvents[currentEventIdx].status === "ongoing" ? "Happening Now" : "Coming Soon"}
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">{featuredEvents[currentEventIdx].title}</h2>
                  <p className="text-lg opacity-90 mb-4 max-w-xl line-clamp-2">{featuredEvents[currentEventIdx].description}</p>
                  <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm opacity-80 mb-6 flex-wrap">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featuredEvents[currentEventIdx].date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{featuredEvents[currentEventIdx].location}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{featuredEvents[currentEventIdx].participantCount.toLocaleString()} joined</span>
                  </div>
                  <Link href={`/events/${featuredEvents[currentEventIdx].id}`}>
                    <Button className="!bg-white !text-gray-900 hover:!bg-gray-100 shadow-xl border-none">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls */}
              {featuredEvents.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 z-20 flex items-center justify-center text-white transition-colors cursor-pointer">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 z-20 flex items-center justify-center text-white transition-colors cursor-pointer">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {featuredEvents.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentEventIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentEventIdx ? "w-6 bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize cursor-pointer ${activeFilter === tab
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                }`}
            >
              {tab === "all" ? "All Events" : tab}
            </button>
          ))}
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, i) => {
            const countdown = event.status === "upcoming" ? getCountdown(event.date) : null;
            const capacity = getCapacityPercent(event.participantCount, event.maxParticipants);
            const isAlmostFull = capacity !== null && capacity >= 80;
            const isTrending = event.participantCount > 2000;
            const isNew = event.participantCount === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card
                  variant="glass"
                  padding="none"
                  className="h-full flex flex-col overflow-hidden group hover:shadow-xl dark:hover:shadow-primary/5 transition-shadow duration-300"
                >
                  {/* Event type header with gradient */}
                  <div className={`h-36 relative overflow-hidden bg-gradient-to-br ${typeGradients[event.type] || "from-gray-700 via-gray-800 to-gray-900"}`}>
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    {/* Large faded icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/10">
                      <div className="text-8xl scale-150">{typeIcons[event.type] || <Calendar className="w-5 h-5" />}</div>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant={statusBadgeVariant[event.status]} size="sm" className="capitalize">
                        {event.status === "ongoing" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1 animate-pulse" />
                        )}
                        {event.status}
                      </Badge>
                    </div>

                    {/* Urgency/trending badges */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                      <span className="text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-md font-medium">
                        {typeLabels[event.type] || "Event"}
                      </span>
                      {isTrending && (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-200 bg-amber-600/40 backdrop-blur-sm px-2 py-0.5 rounded-md font-bold">
                          <Flame className="w-3 h-3" /> Trending
                        </span>
                      )}
                      {isAlmostFull && (
                        <span className="inline-flex items-center gap-1 text-xs text-red-200 bg-red-600/40 backdrop-blur-sm px-2 py-0.5 rounded-md font-bold">
                          <AlertTriangle className="w-3 h-3" /> Almost Full
                        </span>
                      )}
                      {isNew && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-200 bg-emerald-600/40 backdrop-blur-sm px-2 py-0.5 rounded-md font-bold">
                          ✨ New
                        </span>
                      )}
                    </div>

                    {/* Countdown timer at bottom of banner */}
                    {countdown && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-lg px-3 py-1.5">
                          <Clock className="w-3.5 h-3.5 text-white/80" />
                          <div className="flex items-center gap-1.5 text-white text-xs font-bold tabular-nums">
                            <span className="bg-white/20 rounded px-1.5 py-0.5">{countdown.days}d</span>
                            <span>:</span>
                            <span className="bg-white/20 rounded px-1.5 py-0.5">{countdown.hours}h</span>
                            <span>:</span>
                            <span className="bg-white/20 rounded px-1.5 py-0.5">{countdown.mins}m</span>
                          </div>
                          <span className="text-white/60 text-xs ml-auto">until start</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    {event.difficulty && (
                      <div className="flex gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md font-extrabold uppercase ${
                          event.difficulty === "advanced" ? "bg-red-550/10 text-red-500 border border-red-500/20 dark:bg-red-550/20" :
                          event.difficulty === "intermediate" ? "bg-blue-550/10 text-blue-550 border border-blue-550/20 dark:bg-blue-550/20" :
                          "bg-emerald-550/10 text-emerald-550 border border-emerald-550/20 dark:bg-emerald-550/20"
                        }`}>
                          ⚡ {event.difficulty}
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2 flex-1">
                      {event.description}
                    </p>

                    {/* Meta info */}
                    <div className="space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{event.date}{event.endDate ? ` — ${event.endDate}` : ""}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      {event.organizer && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="text-text-primary-light dark:text-text-primary-dark font-medium">{event.organizer}</span>
                        </div>
                      )}
                    </div>

                    {/* Participant avatars + count */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {/* Avatar stack */}
                        <div className="flex -space-x-1.5">
                          {avatarSeeds.slice(0, Math.min(4, event.participantCount > 0 ? 4 : 0)).map((seed) => (
                            <div
                              key={seed}
                              className="w-6 h-6 rounded-full border-2 border-surface-light dark:border-surface-dark overflow-hidden"
                            >
                              <img
                                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}`}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {event.participantCount > 4 && (
                            <div className="w-6 h-6 rounded-full border-2 border-surface-light dark:border-surface-dark bg-primary/20 flex items-center justify-center">
                              <span className="text-[9px] font-bold text-primary">+</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          <strong className="text-text-primary-light dark:text-text-primary-dark">{event.participantCount.toLocaleString()}</strong> joined
                          {event.maxParticipants && (
                            <span className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"> / {event.maxParticipants.toLocaleString()}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Capacity bar */}
                    {capacity !== null && (
                      <div className="mb-4">
                        <div className="w-full h-1.5 rounded-full bg-surface-light-alt dark:bg-surface-dark-alt overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${isAlmostFull ? "bg-danger" : "bg-primary"
                              }`}
                            style={{ width: `${Math.min(capacity, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 tabular-nums">
                          {capacity}% capacity filled
                        </p>
                      </div>
                    )}

                    {event.status !== "completed" && (
                      <Link href={`/events/${event.id}`} className="w-full block">
                        <Button variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">
                          View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 text-text-secondary-light dark:text-text-secondary-dark">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No events found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
