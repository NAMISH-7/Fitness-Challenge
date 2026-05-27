import { create } from "zustand";

export interface Activity {
  id: string;
  type: string;
  distance: number;
  date: string;
  timestamp: number;
}

interface ActivityStoreState {
  activities: Activity[];
  fetchActivities: () => Promise<void>;
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => Promise<void>;
}

export const useActivityStore = create<ActivityStoreState>((set) => ({
  activities: [],
  fetchActivities: async () => {
    try {
      const res = await fetch('/api/activities');
      if (res.ok) {
        const data = await res.json();
        set({ activities: data });
      }
    } catch (e) {
      console.error("Failed to fetch activities", e);
    }
  },
  addActivity: async (activityData) => {
    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData)
      });
      if (res.ok) {
        const newActivity = await res.json();
        set((state) => ({
          activities: [newActivity, ...state.activities],
        }));
      }
    } catch (e) {
      console.error("Failed to add activity", e);
    }
  },
}));
