"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@tn/shared/data/mock";
import Card from "@tn/shared/components/ui/Card";
import Badge from "@tn/shared/components/ui/Badge";
import Button from "@tn/shared/components/ui/Button";
import {
  Calendar, MapPin, Users, ArrowRight, Clock,
  Trophy, Megaphone, Monitor, GraduationCap, ChevronLeft, ChevronRight
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

const statusBadgeVariant: Record<string, "success" | "primary" | "default"> = {
  upcoming: "primary",
  ongoing: "success",
  completed: "default",
};

const filterTabs = ["all", "upcoming", "ongoing", "completed", "campus", "marathon"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentEventIdx, setCurrentEventIdx] = useState(0);

  const filteredEvents = events.filter((e) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "campus" || activeFilter === "marathon") return e.type === activeFilter;
    return e.status === activeFilter;
  });

  const featuredEvents = events.filter((e) => e.isFeatured && e.status !== "completed");

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
          className="text-center mb-12"
        >
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
                  <Button className="!bg-white !text-gray-900 hover:!bg-gray-100 shadow-xl border-none">
                    Register Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </AnimatePresence>
              
              {/* Carousel Controls */}
              {featuredEvents.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 z-20 flex items-center justify-center text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 z-20 flex items-center justify-center text-white transition-colors">
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize cursor-pointer ${
                activeFilter === tab
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
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card variant="glass" padding="none" className="h-full flex flex-col overflow-hidden">
                {/* Event type header */}
                <div className={`h-32 relative overflow-hidden ${
                  event.type === "marathon"
                    ? "bg-gradient-to-br from-primary to-primary-dark"
                    : event.type === "campus"
                    ? "bg-gradient-to-br from-secondary to-purple-700"
                    : event.type === "awareness"
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
                    : "bg-gradient-to-br from-amber-500 to-orange-600"
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <div className="text-7xl">{typeIcons[event.type]}</div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant={statusBadgeVariant[event.status]} size="sm" className="capitalize">
                      {event.status}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-xs text-white/80 bg-black/20 px-2 py-1 rounded-md">
                      {typeLabels[event.type]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg text-text-primary-light dark:text-text-primary-dark mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2 flex-1">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.date}{event.endDate ? ` — ${event.endDate}` : ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" />
                      <span>
                        {event.participantCount.toLocaleString()} joined
                        {event.maxParticipants && ` / ${event.maxParticipants.toLocaleString()} spots`}
                      </span>
                    </div>
                  </div>

                  {event.status !== "completed" && (
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Register <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
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
