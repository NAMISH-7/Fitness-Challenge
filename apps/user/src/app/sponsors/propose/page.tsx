"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Card from "@tn/shared/components/ui/Card";
import Input from "@tn/shared/components/ui/Input";
import Button from "@tn/shared/components/ui/Button";
import Link from "next/link";
import {
  ChevronLeft, Sparkles, Building2, User,
  Mail, Phone, CheckCircle2, IndianRupee, HeartHandshake, ShieldCheck, HelpCircle
} from "lucide-react";

export default function ProposeSponsorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    contactPerson: "",
    email: "",
    phone: "",
    tier: "silver",
    pledge: "",
    type: "sponsor"
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
        body: JSON.stringify({
          ...formData,
          title: formData.companyName, // mapping for the API
          organizer: formData.contactPerson,
          location: "TN Statewide"
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        alert("Failed to submit sponsorship request. Please try again.");
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
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10">
        <Link href="/#sponsors" className="inline-flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Sponsors
        </Link>

        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            Official Partner Program
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
            Become a Sponsor
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm sm:text-base">
            Partner with TNFitness to promote health and wellness across Tamil Nadu while boosting your brand visibility.
          </p>
        </div>

        <Card variant="glass" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">1. Company Details</h3>
            
            <Input
              label="Company / Organization Name"
              placeholder="e.g. HealthCorp India"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              icon={<Building2 className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                Company Description & Motivation
              </label>
              <textarea
                placeholder="Briefly describe what your company does and why you want to sponsor TNFitness..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                Preferred Sponsorship Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "title", label: "Title Sponsor", icon: ShieldCheck },
                  { value: "gold", label: "Gold Sponsor", icon: Sparkles },
                  { value: "silver", label: "Silver Sponsor", icon: CheckCircle2 },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.tier === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, tier: type.value })}
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

            <Input
              label="Proposed Contribution/Pledge"
              placeholder="e.g. Rs. 50000 Funding, or 1000 T-Shirts"
              value={formData.pledge}
              onChange={(e) => setFormData({ ...formData, pledge: e.target.value })}
              icon={<IndianRupee className="w-4 h-4" />}
              required
            />

            <div className="border-t border-border-light dark:border-border-dark pt-6 space-y-6">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">2. Point of Contact</h3>
              
              <Input
                label="Contact Person Name"
                placeholder="e.g. Priya R"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                icon={<User className="w-4 h-4" />}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Email"
                  type="email"
                  placeholder="e.g. priya@healthcorp.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  icon={<Phone className="w-4 h-4" />}
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
                  Submitting Request...
                </div>
              ) : (
                "Submit Sponsorship Request"
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
                  Thank you for your interest in sponsoring TNFitness, <strong>{formData.companyName}</strong>! Our partnership team will review your proposal and contact you at {formData.email} shortly.
                </p>
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    router.push("/");
                  }}
                  className="w-full"
                >
                  Return to Home
                </Button>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
