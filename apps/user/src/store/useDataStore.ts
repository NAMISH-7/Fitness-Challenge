import { create } from "zustand";
import { Event, Sponsor } from "@tn/shared/data/mock";

interface DataStoreState {
  events: Event[];
  sponsors: Sponsor[];
  isLoading: boolean;
  initialize: () => Promise<void>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  events: [],
  sponsors: [],
  isLoading: true,
  initialize: async () => {
    try {
      const timestamp = Date.now();
      const [eventsRes, sponsorsRes] = await Promise.all([
        fetch(`/api/events?t=${timestamp}`, { cache: 'no-store' }),
        fetch(`/api/sponsors?t=${timestamp}`, { cache: 'no-store' }),
      ]);
      const events = await eventsRes.json();
      const sponsors = await sponsorsRes.json();
      set({ events: Array.isArray(events) ? events : [], sponsors: Array.isArray(sponsors) ? sponsors : [], isLoading: false });
    } catch (err) {
      console.error("Failed to fetch events and sponsors", err);
      set({ isLoading: false });
    }
  },
}));
