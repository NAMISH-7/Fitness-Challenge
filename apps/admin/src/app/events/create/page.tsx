"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Input from "@tn/shared/components/ui/Input";
import { ArrowLeft, Upload, CheckCircle2, Calendar, Users, Type, Image as ImageIcon } from "lucide-react";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push("/events");
      }, 2000);
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Fake image preview for prototype
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerPreview(url);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/events" className="inline-flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
            </Link>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Create New Event
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Publish a new fitness challenge or marathon to the user platform.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
          >
            <Card padding="lg" className="mb-8 space-y-8">
              {/* Event Basics */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                  <Type className="w-5 h-5 text-primary" /> Event Basics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Event Name" 
                    placeholder="e.g. Chennai Coastal Marathon 2026" 
                    required 
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                      Event Type
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <option value="marathon">Marathon</option>
                      <option value="campus">Campus Challenge</option>
                      <option value="awareness">Awareness Drive</option>
                      <option value="virtual">Virtual Event</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Input 
                      label="Short Description" 
                      placeholder="A brief 1-sentence summary for the event cards." 
                      required 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                      About the Event (Full Description)
                    </label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
                      placeholder="Detailed information about the event, rules, routes, etc..."
                    />
                  </div>
                </div>
              </div>

              <hr className="border-border-light dark:border-border-dark" />

              {/* Date, Time & Location */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" /> Date & Location
                </h2>
                
                <div className="flex items-center justify-between p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-xl border border-border-light dark:border-border-dark mb-6">
                  <div>
                    <h3 className="font-medium text-text-primary-light dark:text-text-primary-dark">Virtual Event</h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Users can participate from anywhere</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isVirtual}
                      onChange={(e) => setIsVirtual(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!isVirtual && (
                    <div className="md:col-span-2">
                      <Input 
                        label="Physical Location" 
                        placeholder="e.g. Marina Beach, Chennai" 
                        required={!isVirtual}
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                      Start Date & Time
                    </label>
                    <input 
                      type="datetime-local" 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                      End Date & Time
                    </label>
                    <input 
                      type="datetime-local" 
                      className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-border-light dark:border-border-dark" />

              {/* Participants & Banner */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-500" /> Participants & Media
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    type="number"
                    label="Maximum Participants (Optional)" 
                    placeholder="Leave empty for unlimited" 
                  />
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                      Event Banner Image
                    </label>
                    <div className="border-2 border-dashed border-border-light dark:border-border-dark rounded-xl p-6 text-center hover:bg-surface-light-alt dark:hover:bg-surface-dark-alt transition-colors relative overflow-hidden group">
                      {bannerPreview ? (
                        <div className="relative h-48 w-full">
                          <img src={bannerPreview} alt="Banner preview" className="w-full h-full object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white font-medium flex items-center gap-2"><Upload className="w-4 h-4" /> Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8">
                          <ImageIcon className="w-10 h-10 text-text-secondary-light/50 dark:text-text-secondary-dark/50 mx-auto mb-3" />
                          <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Click to upload or drag and drop</p>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Area */}
              <div className="pt-4 flex items-center justify-end gap-4">
                <Link href="/events">
                  <Button variant="ghost" type="button">Cancel</Button>
                </Link>
                <Button type="submit" size="lg" className="min-w-[150px]">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Publishing...
                    </span>
                  ) : (
                    "Publish Event"
                  )}
                </Button>
              </div>
            </Card>
          </motion.form>
        </div>
      </div>

      {/* Success Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-sm"
          >
            <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">Event Published!</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              Your event is now live and visible to all users. Redirecting you back to the events dashboard...
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
