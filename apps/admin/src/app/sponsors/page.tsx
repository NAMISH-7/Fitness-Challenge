"use client";

import { motion } from "framer-motion";
import { Plus, Handshake, ShieldCheck, AlertCircle } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Card from "@tn/shared/components/ui/Card";
import Button from "@tn/shared/components/ui/Button";
import Badge from "@tn/shared/components/ui/Badge";
import { sponsors } from "@tn/shared/data/mock";

export default function SponsorsPage() {
  const platinum = sponsors.filter((s) => s.tier === "platinum");
  const gold = sponsors.filter((s) => s.tier === "gold");
  const silver = sponsors.filter((s) => s.tier === "silver");

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
          <Button size="sm">
            <Plus className="w-4 h-4" /> Add Sponsor
          </Button>
        </motion.div>

        <Card padding="lg" variant="glass">
          {renderTier("Platinum", platinum, "bg-slate-300")}
          {renderTier("Gold", gold, "bg-amber-400")}
          {renderTier("Silver", silver, "bg-gray-400")}
        </Card>
      </div>
    </div>
  );
}
