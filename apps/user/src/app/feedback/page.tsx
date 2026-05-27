"use client";

import { motion } from "framer-motion";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import { MessageSquare, Send, ThumbsUp, Lightbulb } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-6">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
            Send Feedback
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            We&apos;re always looking to improve TNFitness. Let us know what you think, report a bug, or suggest a new feature.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass" className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" disabled className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5 opacity-70 cursor-not-allowed">
                  <ThumbsUp className="w-6 h-6 mb-2 text-text-secondary-light dark:text-text-secondary-dark" />
                  <span className="text-sm font-medium">General Feedback</span>
                </button>
                <button type="button" disabled className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5 opacity-70 cursor-not-allowed">
                  <Lightbulb className="w-6 h-6 mb-2 text-text-secondary-light dark:text-text-secondary-dark" />
                  <span className="text-sm font-medium">Feature Request</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Subject</label>
                <input 
                  type="text" 
                  disabled
                  placeholder="Briefly describe your feedback" 
                  className="w-full bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-lg px-4 py-3 text-text-primary-light dark:text-text-primary-dark opacity-70 cursor-not-allowed" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Details</label>
                <textarea 
                  disabled
                  placeholder="Tell us more about your experience..." 
                  rows={5}
                  className="w-full bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-lg px-4 py-3 text-text-primary-light dark:text-text-primary-dark opacity-70 cursor-not-allowed resize-none" 
                />
              </div>

              <Button disabled className="w-full opacity-50 cursor-not-allowed">
                <Send className="w-4 h-4 mr-2" /> Submit Feedback
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
