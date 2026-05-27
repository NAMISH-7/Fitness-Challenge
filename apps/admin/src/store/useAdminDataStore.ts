import { create } from "zustand";
import { Event, Sponsor } from "@tn/shared/data/mock";

interface AdminDataStoreState {
  events: Event[];
  sponsors: Sponsor[];
  isLoading: boolean;
  initialize: () => Promise<void>;
}

export const useAdminDataStore = create<AdminDataStoreState>((set) => ({
  events: [],
  sponsors: [],
  isLoading: true,
  initialize: async () => {
    try {
      const [eventsRes, sponsorsRes] = await Promise.all([
        fetch(`/api/events?t=${Date.now()}`, { cache: 'no-store' }),
        fetch(`/api/sponsors?t=${Date.now()}`, { cache: 'no-store' }),
      ]);
      const events = await eventsRes.json();
      const sponsors = await sponsorsRes.json();
      set({ events: Array.isArray(events) ? events : [], sponsors: Array.isArray(sponsors) ? sponsors : [], isLoading: false });
    } catch (err) {
      console.error("Failed to fetch admin events and sponsors", err);
      set({ isLoading: false });
    }
  },
}));
