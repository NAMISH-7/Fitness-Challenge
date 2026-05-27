"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Card from "@tn/shared/components/ui/Card";
import Input from "@tn/shared/components/ui/Input";
import Button from "@tn/shared/components/ui/Button";
import Link from "next/link";
import {
  ChevronLeft, Sparkles, Trophy, GraduationCap,
  Megaphone, Monitor, CheckCircle2, Calendar, MapPin, Users, Building2
} from "lucide-react";

export default function ProposeEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    type: "campus",
    expectedParticipants: "",
    college: "",
    repName: "",
    repEmail: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        alert("Failed to submit proposal. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during submission.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden bg-bg-light dark:bg-bg-dark">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10">
        <Link href="/events" className="inline-flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Events
        </Link>

        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Student Rep Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
            Propose Campus Event
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm sm:text-base">
            Request to launch a campus marathon, walkathon, or virtual challenge for your district.
          </p>
        </div>

        <Card variant="glass" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">1. Event Information</h3>
            
            <Input
              label="Event Title"
              placeholder="e.g. PSG Tech Monsoon Run 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                Event Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "campus", label: "Campus", icon: GraduationCap },
                  { value: "marathon", label: "Marathon", icon: Trophy },
                  { value: "awareness", label: "Awareness", icon: Megaphone },
                  { value: "virtual", label: "Virtual", icon: Monitor },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.type === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800/35"
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1.5" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Target Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                icon={<Calendar className="w-4 h-4" />}
                required
              />
              <Input
                label="Location/Venue"
                placeholder="e.g. Coimbatore Campus Track"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                icon={<MapPin className="w-4 h-4" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                Description & Goals
              </label>
              <textarea
                placeholder="Describe the format, who can participate, and the route details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all duration-200"
                required
              />
            </div>

            <div className="border-t border-border-light dark:border-border-dark pt-6 space-y-6">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">2. Organizer Credentials</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Host College / Organization"
                  placeholder="e.g. PSG College of Technology"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  icon={<Building2 className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Estimated Competitors"
                  placeholder="e.g. 500+"
                  value={formData.expectedParticipants}
                  onChange={(e) => setFormData({ ...formData, expectedParticipants: e.target.value })}
                  icon={<Users className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Representative Name"
                  placeholder="e.g. Karthik R"
                  value={formData.repName}
                  onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                  required
                />
                <Input
                  label="Representative College Email"
                  type="email"
                  placeholder="e.g. karthik.r@psgtech.ac.in"
                  value={formData.repEmail}
                  onChange={(e) => setFormData({ ...formData, repEmail: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base mt-2 glow-strong"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Proposal...
                </div>
              ) : (
                "Submit Event Request"
              )}
            </Button>
          </form>
        </Card>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <Card padding="lg" variant="glass" className="text-center relative">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-success/30 shadow-lg shadow-success/10">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-black text-text-primary-light dark:text-text-primary-dark mb-2">
                  Request Received! 🎉
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm leading-relaxed">
                  Your event proposal for <strong>{formData.title}</strong> has been logged in our queue. The TNFitness Admin Portal will review the college representative credentials and list it shortly!
                </p>
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    router.push("/events");
                  }}
                  className="w-full"
                >
                  Return to Events
                </Button>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
