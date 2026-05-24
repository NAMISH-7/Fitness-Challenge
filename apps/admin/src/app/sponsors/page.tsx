"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShieldCheck, AlertCircle, Calendar, Clock, Landmark, Info, X, Pencil } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Badge from "@tn/shared/components/ui/Badge";
import { sponsors, type Sponsor } from "@tn/shared/data/mock";
import AddSponsorModal from "@/components/sponsors/AddSponsorModal";

export default function SponsorsPage() {
  const [localSponsors, setLocalSponsors] = useState<Sponsor[]>(sponsors);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  const platinum = localSponsors.filter((s) => s.tier === "platinum");
  const gold = localSponsors.filter((s) => s.tier === "gold");
  const silver = localSponsors.filter((s) => s.tier === "silver");

  const handleSaveSponsor = (sponsorData: Omit<Sponsor, "id">, id?: string) => {
    if (id) {
      // Edit mode
      const index = sponsors.findIndex((s) => s.id === id);
      if (index !== -1) {
        sponsors[index] = { ...sponsors[index], ...sponsorData };
      }
    } else {
      // Add mode
      const newSponsor = { id: `sp-${Date.now()}`, ...sponsorData };
      if (!sponsors.find(s => s.id === newSponsor.id)) {
        sponsors.push(newSponsor); 
      }
    }
    setLocalSponsors([...sponsors]);
  };

  const renderTier = (title: string, data: typeof sponsors, tierColor: string) => (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${tierColor}`} />
        {title} Tier ({data.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((sponsor, i) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedSponsor(sponsor)}
            className="cursor-pointer"
          >
            <Card hover padding="sm" className="h-full flex flex-col">
              <div className="h-24 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl mb-4 flex items-center justify-center border border-border-light dark:border-border-dark p-4">
                {/* Fallback rendering since logos might be external SVGs that fail */}
                <div className="text-center font-bold text-lg text-text-primary-light dark:text-text-primary-dark truncate w-full">
                  {sponsor.name}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                    Status
                  </span>
                  {sponsor.status === "active" ? (
                    <Badge variant="success" className="text-xs">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Active
                    </Badge>
                  ) : sponsor.status === "pending" ? (
                    <Badge variant="warning" className="text-xs">Pending</Badge>
                  ) : (
                    <Badge variant="danger" className="text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" /> Expired
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {data.length === 0 && (
          <div className="col-span-full py-8 text-center text-text-secondary-light dark:text-text-secondary-dark border-2 border-dashed border-border-light dark:border-border-dark rounded-xl">
            No {title.toLowerCase()} sponsors found.
          </div>
        )}
      </div>
    </div>
  );

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
              Sponsor Management
            </h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Manage corporate partnerships and funding tiers.
            </p>
          </div>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Add Sponsor
          </Button>
        </motion.div>

        <Card padding="lg" variant="glass">
          {renderTier("Platinum", platinum, "bg-slate-300")}
          {renderTier("Gold", gold, "bg-amber-400")}
          {renderTier("Silver", silver, "bg-gray-400")}
        </Card>
      </div>

      <AnimatePresence>
        {selectedSponsor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg"
            >
              <Card padding="lg" className="relative overflow-hidden">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingSponsor(selectedSponsor);
                      setSelectedSponsor(null);
                      setIsAddModalOpen(true);
                    }}
                    className="p-2 rounded-full hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt text-primary transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedSponsor(null)}
                    className="p-2 rounded-full hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-surface-light-alt dark:bg-surface-dark-alt rounded-2xl flex items-center justify-center border border-border-light dark:border-border-dark text-3xl">
                    {selectedSponsor.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      {selectedSponsor.name}
                    </h2>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={selectedSponsor.status === 'active' ? 'success' : selectedSponsor.status === 'pending' ? 'warning' : 'danger'}>
                        {selectedSponsor.status.toUpperCase()}
                      </Badge>
                      <Badge variant={selectedSponsor.tier === "platinum" ? "primary" : selectedSponsor.tier === "gold" ? "gold" : "silver"} className="capitalize">
                        {selectedSponsor.tier} Tier
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl border border-border-light dark:border-border-dark space-y-3">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">About</p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          {selectedSponsor.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl border border-border-light dark:border-border-dark">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Joined</span>
                      </div>
                      <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{selectedSponsor.joinDate}</p>
                    </div>
                    <div className="p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl border border-border-light dark:border-border-dark">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Duration</span>
                      </div>
                      <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{selectedSponsor.duration}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Landmark className="w-5 h-5 text-gold" />
                      <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">Contribution & Pledge</span>
                    </div>
                    <p className="text-lg font-bold text-gold drop-shadow-sm">{selectedSponsor.contribution}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AddSponsorModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          // Small timeout ensures the exit animation completes before we wipe data
          setTimeout(() => setEditingSponsor(null), 300);
        }}
        onSubmit={handleSaveSponsor}
        initialData={editingSponsor}
      />
    </div>
  );
}
