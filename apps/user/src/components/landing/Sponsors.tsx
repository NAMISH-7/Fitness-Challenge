"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";
import type { Sponsor } from "@tn/shared/data/mock";
import Button from "@tn/shared/components/ui/Button";
import Link from "next/link";
import { X, Info, ExternalLink, Building2, ChevronRight } from "lucide-react";

export default function Sponsors() {
  const { sponsors } = useDataStore();
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSponsors = sponsors.filter((s: Sponsor) => s.status === "active");

  return (
    <section className="py-20" id="sponsors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Our Partners
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg max-w-2xl mx-auto">
            Backed by organizations that believe in a healthier Tamil Nadu. Together, we&apos;re building a statewide movement.
          </p>
        </motion.div>

        {/* Sponsor logos carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {activeSponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                setSelectedSponsor(sponsor);
                setIsExpanded(false);
              }}
              className="glass-card flex-none w-[200px] flex flex-col items-center justify-center py-6 group cursor-pointer snap-center"
            >
              <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {sponsor.logo}
              </span>
              <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark text-center px-2 truncate w-full">
                {sponsor.name}
              </span>
              <span className="text-[10px] text-primary/70 font-medium mt-1 capitalize">
                {sponsor.tier}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>      <AnimatePresence>
        {selectedSponsor && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedSponsor(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg"
            >
              <div className="glass-card relative overflow-hidden p-6 sm:p-8">
                <button
                  onClick={() => setSelectedSponsor(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-surface-light-alt dark:bg-surface-dark-alt rounded-2xl flex items-center justify-center border border-border-light dark:border-border-dark text-3xl">
                    {selectedSponsor.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      {selectedSponsor.name}
                    </h3>
                    <div className="text-sm font-medium text-primary capitalize mt-1">
                      {selectedSponsor.tier} Partner
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark mt-1" />
                    <div>
                      <div className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">About</div>
                      <div className="text-base text-text-secondary-light dark:text-text-secondary-dark mt-2 leading-relaxed">
                        {isExpanded ? (selectedSponsor.fullDescription || selectedSponsor.description) : selectedSponsor.description}
                        {selectedSponsor.fullDescription && !isExpanded && (
                          <button onClick={() => setIsExpanded(true)} className="text-primary hover:text-primary-light transition-colors ml-1 font-bold tracking-widest text-lg leading-none">...</button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <span>Partner since <strong className="text-text-primary-light dark:text-text-primary-dark">{selectedSponsor.joinDate}</strong></span>
                    <span className="w-1 h-1 rounded-full bg-border-light dark:bg-border-dark" />
                    <span>Duration: <strong className="text-text-primary-light dark:text-text-primary-dark">{selectedSponsor.duration}</strong></span>
                  </div>

                  {/* Dormant website link — visible but non-functional */}
                  <div className="pt-4 border-t border-border-light dark:border-border-dark">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full opacity-60 cursor-not-allowed"
                      disabled
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                      <span className="text-xs ml-2 opacity-60">(Coming Soon)</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-16 text-center">
        <Link 
          href="/sponsors/propose" 
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm group"
        >
          <Building2 className="w-5 h-5 group-hover:text-primary transition-colors" />
          Become a Sponsor
          <ChevronRight className="w-4 h-4 text-text-secondary-light group-hover:text-primary transition-colors" />
        </Link>
      </div>

    </section>
  );
}
