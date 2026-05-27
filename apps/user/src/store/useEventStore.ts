import { create } from "zustand";

interface EventStoreState {
  registeredEventIds: string[];
  readNotificationIds: string[];
  initialize: () => Promise<void>;
  registerEvent: (id: string) => void;
  unregisterEvent: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (ids: string[]) => void;
}

export const useEventStore = create<EventStoreState>((set, get) => {
  const syncState = async (state: Partial<EventStoreState>) => {
    try {
      const currentState = get();
      await fetch("/api/user-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registeredEventIds: state.registeredEventIds ?? currentState.registeredEventIds,
          readNotificationIds: state.readNotificationIds ?? currentState.readNotificationIds,
        }),
      });
    } catch (err) {
      console.error("Failed to sync user state", err);
    }
  };

  return {
      registeredEventIds: [],
      readNotificationIds: [],
      initialize: async () => {
        try {
          const res = await fetch("/api/user-state");
          if (res.ok) {
            const data = await res.json();
            set({
              registeredEventIds: data.registeredEventIds || [],
              readNotificationIds: data.readNotificationIds || [],
            });
          }
        } catch (err) {
          console.error("Failed to initialize user state", err);
        }
      },
      registerEvent: (id) => {
        const state = get();
        if (!state.registeredEventIds.includes(id)) {
          const newIds = [...state.registeredEventIds, id];
          set({ registeredEventIds: newIds });
          syncState({ registeredEventIds: newIds });
        }
      },
      unregisterEvent: (id) => {
        const state = get();
        const newEventIds = state.registeredEventIds.filter((eventId) => eventId !== id);
        const newNotifIds = state.readNotificationIds.filter((eventId) => eventId !== id);
        set({
          registeredEventIds: newEventIds,
          readNotificationIds: newNotifIds,
        });
        syncState({
          registeredEventIds: newEventIds,
          readNotificationIds: newNotifIds,
        });
      },
      markAsRead: (id) => {
        const state = get();
        if (!state.readNotificationIds.includes(id)) {
          const newIds = [...state.readNotificationIds, id];
          set({ readNotificationIds: newIds });
          syncState({ readNotificationIds: newIds });
        }
      },
      markAllAsRead: (ids) => {
        set({ readNotificationIds: ids });
        syncState({ readNotificationIds: ids });
      },
  };
});
