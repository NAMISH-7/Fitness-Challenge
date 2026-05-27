"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";
import { useEventStore } from "@/store/useEventStore";
import Card from "@tn/shared/components/ui/Card";
import Badge from "@tn/shared/components/ui/Badge";
import Button from "@tn/shared/components/ui/Button";
import Link from "next/link";
import {
  Calendar, MapPin, Users,
  Trophy, Megaphone, Monitor, GraduationCap, CheckCircle2, ChevronLeft
} from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  marathon: <Trophy className="w-12 h-12" />,
  campus: <GraduationCap className="w-12 h-12" />,
  awareness: <Megaphone className="w-12 h-12" />,
  virtual: <Monitor className="w-12 h-12" />,
};

const statusBadgeVariant: Record<string, "success" | "primary" | "default"> = {
  upcoming: "primary",
  ongoing: "success",
  completed: "default",
};

export default function EventDetailsPage() {
  const params = useParams();
  const { events } = useDataStore();
  const router = useRouter();
  const eventId = params.id as string;
  
  const event = events.find((e) => e.id === eventId);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const { registeredEventIds, registerEvent, unregisterEvent } = useEventStore();
  const isRegistered = registeredEventIds.includes(eventId);

  const handleRegister = () => {
    if (sessionStorage.getItem("user_auth") !== "true") {
      document.cookie = "user_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/auth";
      return;
    }
    if (isRegistered) {
      unregisterEvent(eventId);
    } else {
      registerEvent(eventId);
      setShowSuccessModal(true);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
          The event you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Header */}
      <div className={`w-full py-16 px-4 relative overflow-hidden ${
        event.type === "marathon"
          ? "bg-gradient-to-br from-primary to-primary-dark"
          : event.type === "campus"
          ? "bg-gradient-to-br from-secondary to-purple-700"
          : event.type === "awareness"
          ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
          : "bg-gradient-to-br from-amber-500 to-orange-600"
      }`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back to Events
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <Badge variant={statusBadgeVariant[event.status]} className="bg-white/20 text-white border-none shadow-lg backdrop-blur-md">
              {event.status.toUpperCase()}
            </Badge>
            <span className="text-white/80 font-medium tracking-wider uppercase text-sm">
              {event.type}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {event.title}
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <Card variant="glass" padding="lg">
              <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                Event Details
              </h2>
              <div className="space-y-6 text-text-secondary-light dark:text-text-secondary-dark">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark text-lg">Date & Time</h3>
                    <p>{event.date}{event.endDate ? ` to ${event.endDate}` : ""}</p>
                    <p className="text-sm mt-1">Starts at 6:00 AM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark text-lg">Location</h3>
                    <p>{event.location}</p>
                    <Link href="#" className="text-primary hover:underline text-sm mt-1 inline-block">
                      View on Google Maps
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark text-lg">Participants</h3>
                    <p>{event.participantCount.toLocaleString()} people have already joined</p>
                    {event.maxParticipants && (
                      <p className="text-sm mt-1">
                        Limited to {event.maxParticipants.toLocaleString()} spots!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass" padding="lg">
              <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                About this Event
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                Join thousands of fitness enthusiasts from across Tamil Nadu for the {event.title}. 
                This event is designed to promote health, wellness, and community engagement. 
                Whether you are a seasoned athlete or just starting your fitness journey, there is a place for you here.
              </p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mt-4">
                Participants will receive an exclusive finisher&apos;s medal, a digital certificate, and bonus points towards their TN Fitness Challenge ranking.
              </p>
            </Card>
          </div>

          {/* Registration Sidebar */}
          <div className="space-y-6">
            <Card variant="glass" padding="lg" className="sticky top-24 border-primary/20 shadow-xl shadow-primary/5">
              <div className="text-center mb-6">
                <div className="text-white/20 mb-4 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-surface-light-alt dark:bg-surface-dark-alt flex items-center justify-center">
                    <span className="text-primary">{typeIcons[event.type] || <Calendar className="w-5 h-5" />}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  Ready to join?
                </h3>
                {event.maxParticipants && (
                  <p className="text-sm text-danger font-medium mt-2">
                    Only {event.maxParticipants - event.participantCount} spots remaining!
                  </p>
                )}
              </div>

              {event.status === "completed" ? (
                <Button className="w-full opacity-50 cursor-not-allowed" disabled>
                  Event Completed
                </Button>
              ) : isRegistered ? (
                <Button variant="outline" size="lg" className="w-full text-lg border-danger text-danger hover:bg-danger/10" onClick={handleRegister}>
                  Unregister
                </Button>
              ) : (
                <Button size="lg" className="w-full text-lg shadow-lg shadow-primary/25" onClick={handleRegister}>
                  Register Now
                </Button>
              )}
              
              <p className="text-xs text-center text-text-secondary-light dark:text-text-secondary-dark mt-4">
                By registering, you agree to the event terms and conditions.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Registration Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card padding="lg" variant="glass" className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                You&apos;re in! 🎉
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                You have successfully registered for <strong>{event.title}</strong>. We&apos;ve added this to your dashboard and we&apos;ll see you at the starting line!
              </p>
              <Button onClick={() => { setShowSuccessModal(false); router.push("/dashboard"); }} className="w-full">
                Go to Dashboard
              </Button>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
