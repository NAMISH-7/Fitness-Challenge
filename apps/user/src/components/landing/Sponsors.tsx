"use client";

import { motion } from "framer-motion";
import { sponsors } from "@tn/shared/data/mock";
import Button from "@tn/shared/components/ui/Button";
import { Handshake } from "lucide-react";

export default function Sponsors() {
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
          <Button variant="outline" size="md">
            <Handshake className="w-4 h-4" />
            Become a Sponsor
          </Button>
        </div>
      </div>
    </section>
  );
}
