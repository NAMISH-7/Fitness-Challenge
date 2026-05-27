"use client";

import { motion } from "framer-motion";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import { HelpCircle, Search, FileText, MessageCircle, Mail, Phone } from "lucide-react";

export default function HelpSupportPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
            How can we help you?
          </h1>
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary-light dark:text-text-secondary-dark" />
            </div>
            <input
              type="text"
              disabled
              placeholder="Search for articles, guides, and FAQs..."
              className="w-full bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark rounded-xl pl-12 pr-4 py-4 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:border-primary transition-colors opacity-70 cursor-not-allowed"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: FileText, title: "Knowledge Base", desc: "Browse articles and step-by-step guides." },
            { icon: MessageCircle, title: "Community Forum", desc: "Ask questions and share tips with other athletes." },
            { icon: Mail, title: "Email Support", desc: "Send us an email at support@tnfitness.gov.in" },
            { icon: Phone, title: "Helpline", desc: "Call our toll-free number: 1800-425-4545" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="h-full flex items-start gap-4 p-6 group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{item.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card variant="glass" className="text-center py-10">
          <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">Still need assistance?</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Our support team is available Monday to Friday, 9 AM to 6 PM IST.
          </p>
          <Button disabled className="opacity-50 cursor-not-allowed">Open a Support Ticket</Button>
        </Card>
      </div>
    </div>
  );
}
