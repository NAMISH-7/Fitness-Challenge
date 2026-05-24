"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import type { Sponsor } from "@tn/shared/data/mock";

interface AddSponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sponsorData: Omit<Sponsor, "id">, id?: string) => void;
  initialData?: Sponsor | null;
}

export default function AddSponsorModal({ isOpen, onClose, onSubmit, initialData }: AddSponsorModalProps) {
  const [formData, setFormData] = useState<Omit<Sponsor, "id">>({
    name: "",
    logo: "🏢",
    tier: "silver",
    status: "active",
    joinDate: new Date().toISOString().split("T")[0],
    duration: "",
    description: "",
    contribution: "",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      const { id: _id, ...rest } = initialData;
      // eslint-disable-next-line
      setFormData(rest);
    } else if (isOpen) {
      setFormData({
        name: "",
        logo: "🏢",
        tier: "silver",
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        duration: "",
        description: "",
        contribution: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, initialData?.id);
    onClose();
  };

  const isEditing = !!initialData;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <Card padding="lg" className="relative overflow-hidden border border-border-light dark:border-border-dark">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  {isEditing ? "Edit Sponsor" : "Add New Sponsor"}
                </h2>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  {isEditing 
                    ? "Update the details for this corporate partnership." 
                    : "Fill in the details to register a new corporate partnership."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      Sponsor Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. HealthFirst Insurance"
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      Logo (Emoji/URL) *
                    </label>
                    <input
                      required
                      type="text"
                      name="logo"
                      value={formData.logo}
                      onChange={handleChange}
                      placeholder="e.g. 🏥"
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      Sponsorship Tier *
                    </label>
                    <select
                      required
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="platinum">Platinum</option>
                      <option value="gold">Gold</option>
                      <option value="silver">Silver</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      Current Status *
                    </label>
                    <select
                      required
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      Join Date *
                    </label>
                    <input
                      required
                      type="date"
                      name="joinDate"
                      value={formData.joinDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      Duration *
                    </label>
                    <input
                      required
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g. 1 Year, 6 Months"
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Contribution & Pledge *
                  </label>
                  <input
                    required
                    type="text"
                    name="contribution"
                    value={formData.contribution}
                    onChange={handleChange}
                    placeholder="e.g. ₹50,00,000 + Infrastructure Support"
                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Description *
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe the sponsor's involvement and goals..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? "Save Changes" : "Create Sponsor"}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
