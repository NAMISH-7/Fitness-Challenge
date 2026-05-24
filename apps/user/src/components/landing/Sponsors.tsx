"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sponsors, type Sponsor } from "@tn/shared/data/mock";
import Button from "@tn/shared/components/ui/Button";
import Link from "next/link";
import { Handshake, X, Calendar, Clock, Landmark, Info } from "lucide-react";

export default function Sponsors() {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const activeSponsors = sponsors.filter((s) => s.status === "active");

  return (
    <section className="py-24" id="sponsors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Our Partners
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
            Backed by organizations that believe in a healthier Tamil Nadu.
          </p>
        </motion.div>

        {/* Sponsor logos grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {activeSponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedSponsor(sponsor)}
              className="glass-card flex flex-col items-center justify-center py-6 group cursor-pointer"
            >
              <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {sponsor.logo}
              </span>
              <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark text-center">
                {sponsor.name}
              </span>
              <span className="text-[10px] text-primary/70 font-medium mt-1 capitalize">
                {sponsor.tier}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/contact">
            <Button variant="outline" size="md">
              <Handshake className="w-4 h-4 mr-2" />
              Become a Sponsor
            </Button>
          </Link>
        </div>
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
              <div className="glass-card relative overflow-hidden p-6 sm:p-8">
                <button 
                  onClick={() => setSelectedSponsor(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark transition-colors"
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
                    <Info className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">About</div>
                      <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                        {selectedSponsor.description}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
                      <div>
                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Partner Since</div>
                        <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                          {selectedSponsor.joinDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
                      <div>
                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Duration</div>
                        <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                          {selectedSponsor.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                    <Landmark className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Contribution & Pledge</div>
                      <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                        {selectedSponsor.contribution}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
