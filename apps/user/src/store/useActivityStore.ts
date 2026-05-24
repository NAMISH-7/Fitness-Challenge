import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Activity {
  id: string;
  type: string;
  distance: number;
  date: string;
  timestamp: number;
}

interface ActivityStoreState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
}

export const useActivityStore = create<ActivityStoreState>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activityData) =>
        set((state) => ({
          activities: [
            {
              ...activityData,
              id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              timestamp: Date.now(),
            },
            ...state.activities,
          ],
        })),
    }),
    {
      name: "tn-fitness-activities",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
