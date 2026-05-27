"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Calendar, MapPin, Users, Edit3, Trash2, AlertTriangle } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Badge from "@tn/shared/components/ui/Badge";
import { useAdminDataStore } from "@/store/useAdminDataStore";
import type { Event } from "@tn/shared/data/mock";

interface PendingEventProposal {
  id: string;
  type: string;
  status: string;
  title?: string;
  organizer?: string;
  repName?: string;
  location?: string;
  description?: string;
}

export default function EventsPage() {
  const { events, initialize } = useAdminDataStore();
  const [localEvents, setLocalEvents] = useState<Event[]>(events);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [pendingApprovals, setPendingApprovals] = useState<PendingEventProposal[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setLocalEvents(events);
    }, 0);
  }, [events]);

  const fetchApprovals = () => {
    fetch("/api/proposals", { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        const rawList = data as PendingEventProposal[];
        setPendingApprovals(rawList.filter((p) => p.type !== "sponsor" && p.status === "pending"));
      })
      .catch(err => console.error("Failed to fetch approvals", err));
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleApprove = async (id: string, isApproved: boolean) => {
    try {
      await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: isApproved ? "approved" : "rejected" }),
      });
      fetchApprovals();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (eventToDelete) {
      // Optimistic UI update
      setLocalEvents(prev => prev.filter(e => e.id !== eventToDelete));
      const idToDelete = eventToDelete;
      setEventToDelete(null);

      try {
        await fetch(`/api/events?id=${idToDelete}`, {
          method: "DELETE"
        });
        await initialize();
      } catch (err) {
        console.error("Failed to delete event", err);
      }
    }
  };

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
          <Link href="/events/create">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" /> Create New Event
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {localEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
              <Card hover className="h-full flex flex-col overflow-hidden" padding="none">
                <div className="h-40 w-full relative">
                  {/* Fallback pattern for events without real images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex items-center justify-center">
                     <Calendar className="w-12 h-12 text-primary/40 dark:text-primary/30" />
                  </div>
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover relative z-10"
                    />
                  )}
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
                    <Link href={`/events/edit/${event.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit3 className="w-4 h-4 mr-2" /> Edit
                      </Button>
                    </Link>
                    <button 
                      onClick={() => setEventToDelete(event.id)}
                      className="p-2 border-2 border-transparent hover:border-danger hover:text-danger rounded-xl transition-colors text-text-secondary-light dark:text-text-secondary-dark"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        {/* Pending Event Approvals Section */}
        {pendingApprovals.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Pending Event Approvals
            </h2>
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden">
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-surface-light-alt dark:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Event Title</th>
                      <th className="px-6 py-4 font-semibold">Organizer</th>
                      <th className="px-6 py-4 font-semibold">Location</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light/50 dark:divide-border-dark/50">
                    {pendingApprovals.map((approval) => (
                      <tr key={approval.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-text-primary-light dark:text-text-primary-dark">
                          {approval.title}
                        </td>
                        <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                          {approval.organizer || "Student Rep"}
                        </td>
                        <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                          {approval.location}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button size="sm" onClick={() => handleApprove(approval.id, true)}>Approve</Button>
                          <Button size="sm" variant="outline" className="text-danger border-danger hover:bg-danger/10" onClick={() => handleApprove(approval.id, false)}>Reject</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm"
          >
            <Card padding="lg" className="text-center border-danger/20">
              <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                Delete Event?
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
                Are you sure you want to delete this event? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setEventToDelete(null)}>
                  Cancel
                </Button>
                <Button className="flex-1 !bg-danger hover:!bg-danger/90 border-none" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
