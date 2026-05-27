"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Zap, Globe, MessageCircle, Mail, XIcon } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user_auth") === "true") {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 0);
    }
  }, []);

  // Don't show footer on admin page
  if (pathname === "/admin") return null;

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                TN<span className="gradient-text">Fitness</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              Tamil Nadu&apos;s biggest fitness challenge platform. Move more, compete better, live healthier.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Leaderboard", href: "/leaderboard", protected: true },
                { label: "Events", href: "/events" },
                { label: "Profile", href: "/profile", protected: true },
                { label: "About Us", href: "/about" },
              ].filter(link => !link.protected || isAuthenticated).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { icon: XIcon, label: "X" },
                { icon: MessageCircle, label: "Community" },
                { icon: Globe, label: "Website" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-border-light dark:border-border-dark hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer text-text-secondary-light dark:text-text-secondary-dark"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-4">
              hello@tnfitness.in
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            © 2026 TNFitness. All rights reserved. Built with ❤️ in Tamil Nadu.
          </p>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            A student-led initiative for a healthier Tamil Nadu.
          </p>
        </div>
      </div>
    </footer>
  );
}
