"use client";

import { motion } from "framer-motion";
import { Plus, Calendar, MapPin, Users, Edit3, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Badge from "@tn/shared/components/ui/Badge";
import { events } from "@tn/shared/data/mock";

export default function EventsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Event Management
            </h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Organize and monitor fitness events across the state.
            </p>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4" /> Create New Event
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Card hover className="h-full flex flex-col overflow-hidden" padding="none">
                <div className="h-40 w-full relative">
                  {/* Fallback pattern for events without real images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10" />
                  <img
                    src={event.image || `https://source.unsplash.com/random/400x200/?fitness,${event.type}`}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTFlMjgiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTFlMjgiLz48L3N2Zz4=";
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    {event.status === "upcoming" && <Badge variant="warning">Upcoming</Badge>}
                    {event.status === "ongoing" && <Badge variant="success">Ongoing</Badge>}
                    {event.status === "completed" && <Badge variant="default">Completed</Badge>}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 mb-4">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <Users className="w-4 h-4 text-gold" />
                      {event.participantCount.toLocaleString()} {event.maxParticipants && `/ ${event.maxParticipants}`} Registered
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border-light dark:border-border-dark">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit3 className="w-4 h-4" /> Edit
                    </Button>
                    <button className="p-2 border-2 border-transparent hover:border-danger hover:text-danger rounded-xl transition-colors text-text-secondary-light dark:text-text-secondary-dark">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
