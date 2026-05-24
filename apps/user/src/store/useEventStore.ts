import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface EventStoreState {
  registeredEventIds: string[];
  readNotificationIds: string[];
  registerEvent: (id: string) => void;
  unregisterEvent: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (ids: string[]) => void;
}

export const useEventStore = create<EventStoreState>()(
  persist(
    (set) => ({
      registeredEventIds: [],
      readNotificationIds: [],
      registerEvent: (id) =>
        set((state) => ({
          registeredEventIds: state.registeredEventIds.includes(id)
            ? state.registeredEventIds
            : [...state.registeredEventIds, id],
        })),
      unregisterEvent: (id) =>
        set((state) => ({
          registeredEventIds: state.registeredEventIds.filter((eventId) => eventId !== id),
          readNotificationIds: state.readNotificationIds.filter((eventId) => eventId !== id),
        })),
      markAsRead: (id) =>
        set((state) => ({
          readNotificationIds: state.readNotificationIds.includes(id)
            ? state.readNotificationIds
            : [...state.readNotificationIds, id],
        })),
      markAllAsRead: (ids) =>
        set(() => ({
          readNotificationIds: ids,
        })),
    }),
    {
      name: "tn-fitness-events",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
