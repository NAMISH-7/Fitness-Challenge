"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@tn/shared/data/mock";
import { Quote, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-20 relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 particle-bg" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Voices of the <span className="gradient-text">Movement</span>
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
            Real people. Real transformations. Real Tamil Nadu pride.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="glass-card !p-8 sm:!p-10 text-center relative"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl text-text-primary-light dark:text-text-primary-dark leading-relaxed mb-8 font-medium italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-bold text-text-primary-light dark:text-text-primary-dark text-lg">
                    {t.name}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {t.district}
                    {t.college && ` • ${t.college}`}
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                    {t.role} • {t.distanceKm} km covered
                  </p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mt-1">
                  {t.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-text-secondary-light dark:text-text-secondary-dark"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-border-light dark:bg-border-dark hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer text-text-secondary-light dark:text-text-secondary-dark"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
