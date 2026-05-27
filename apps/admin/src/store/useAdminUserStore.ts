import { create } from "zustand";
import { Participant } from "@tn/shared/data/mock";

interface AdminUserStoreState {
  users: Participant[];
  fetchUsers: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  toggleVerifyUser: (id: string) => Promise<void>;
  setUsers: (users: Participant[]) => void;
}

export const useAdminUserStore = create<AdminUserStoreState>((set, get) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const users = await res.json();
        set({ users });
      }
    } catch (e) {
      console.error("Failed to fetch users", e);
    }
  },
  deleteUser: async (id) => {
    // Optimistic update
    set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
  },
  toggleVerifyUser: async (id) => {
    // Optimistic update
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, isVerified: !u.isVerified } : u)),
    }));
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggleVerify', id })
    });
  },
  setUsers: (users) => set({ users }),
}));
