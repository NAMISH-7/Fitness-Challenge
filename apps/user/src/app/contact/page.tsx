"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Button from "@tn/shared/components/ui/Button";
import Card from "@tn/shared/components/ui/Card";
import { Send, MapPin, Mail, Phone, Building, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Partner With <span className="text-primary">TN Fitness</span>
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Whether you want to become a sponsor, organize an event, or just say hello, we&apos;d love to hear from you. Let&apos;s build a healthier Tamil Nadu together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <Card variant="glass" padding="lg">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">TN Sports Authority</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Official Headquarters
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      123 Fitness Avenue, Anna Salai,<br />
                      Chennai, Tamil Nadu 600002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      partnerships@tnfitness.gov.in<br />
                      support@tnfitness.gov.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      +91 44 2852 0000<br />
                      Mon-Fri, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass" padding="lg" className="relative overflow-hidden">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
                    Thank you for reaching out. Our partnership team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company/Organization</label>
                      <input
                        type="text"
                        placeholder="Your Company Ltd."
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject *</label>
                    <select
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option value="" disabled>Select an inquiry type</option>
                      <option value="sponsorship">Become a Sponsor</option>
                      <option value="event">Organize an Event</option>
                      <option value="support">General Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us how you&apos;d like to partner with us..."
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-3" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
